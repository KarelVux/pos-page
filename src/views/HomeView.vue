<template>

    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <p>
                    <RouterLink to="/store/business">Start your journey</RouterLink>


                </p>
            </div>
        </div>

        <div>
            <p>Input</p>
            <input type="file" accept="image/*" @change="handleFileInputChange">
            <button @click="uploadImage" :disabled="!selectedImage">Upload</button>
            <div v-if="uploadStatus">{{ uploadStatus }}</div>
        </div>
    </section>
</template>

<script setup lang='ts'>
import {onBeforeMount, onUpdated, ref} from 'vue';
import {RouterLink} from 'vue-router';
import type {IGetBusinessQueryParams} from "@/services/shop/ShopsService";
import ShopsService from "@/services/shop/ShopsService";
import {useIdentityStore} from "@/stores/identityStore";
import {SettlementsService} from "@/services/management/SettlementsService";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import type {ISettlement} from "@/dto/management/ISettlement";
import {ManagerBusinessService} from "@/services/manager/ManagerBusinessService";
import ImageHandlerService from "@/services/ImageHandlerService";
import {id} from "vuetify/locale";
import axios from "axios";

const shopsService = new ShopsService();
const imageHandlerService = new ImageHandlerService();
const settlementService = new SettlementsService();
const identitySore = useIdentityStore();
const selectedImage = ref<File | undefined>();
const uploadStatus = ref<string | undefined>();

const handleFileInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedImage.value = target.files[0];
    }
};

const uploadImage = async () => {
        {
            if (!selectedImage.value) return;
            let identity = identitySore.$state.authenticationJwt as IJWTResponse;
            if (identitySore.$state.authenticationJwt) {
                await imageHandlerService.uploadFile(identity, selectedImage.value);
            } else {
                console.log("Unable to get businesses because identiy is udnefined")
            }
        }
    }
;

const handleClick = async () => {
    console.log("handle click")


    let identity = identitySore.$state.authenticationJwt as IJWTResponse;

    let settlements = (await settlementService.getAll(identity)) as ISettlement[]
    console.log(settlements)
    let id = settlements[0]
    const params: IGetBusinessQueryParams = {
        settlementId: id.id as string

    }
    if (identitySore.$state.authenticationJwt) {
        var businesses = await shopsService.getBusinesses(identity, params);
        console.log("List of buseinesses", businesses);

    } else {
        console.log("Unable to get businesses because identiy is udnefined")
    }

}


</script>

