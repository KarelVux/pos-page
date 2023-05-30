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
import {useIdentityStore} from "@/stores/identityStore";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import ImageHandlerService from "@/services/ImageHandlerService";

const imageHandlerService = new ImageHandlerService();
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
</script>

