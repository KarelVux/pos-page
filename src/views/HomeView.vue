<template>

    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <p>
                    <button type="button" class="btn btn-secondary" @click="handleClick">Secondary</button>
                    <RouterLink to="/store/business">Go to businesses</RouterLink>
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang='ts'>
import {onBeforeMount, onUpdated, ref} from 'vue';
import {RouterLink } from 'vue-router';
import type {IGetBusinessQueryParams} from "@/services/shop/ShopsService";
import ShopsService from "@/services/shop/ShopsService";
import {useIdentityStore} from "@/stores/identityStore";
import {SettlementsService} from "@/services/management/SettlementsService";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import type {ISettlement} from "@/dto/management/ISettlement";
import {ManagerBusinessService} from "@/services/manager/ManagerBusinessService";

const shopsService = new ShopsService();
const settlementService = new SettlementsService();
const identitySore = useIdentityStore();


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
        var businesses = await shopsService.getBusinesses(identitySore.$state.authenticationJwt.jwt, params);
        console.log("List of buseinesses", businesses);

    } else {
        console.log("Unable to get businesses because identiy is udnefined")
    }


}



</script>
