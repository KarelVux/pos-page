<template>
    <body>
    <div class="container">
        <AutheticationComp/>


        <main role="main" class="pb-3">

            <div class="text-center">
                <h1 class="display-4">Welcome</h1>
                <p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.
                </p>

                <button type="button" class="btn btn-secondary" @click="handleClick">Secondary</button>
            </div>
        </main>
    </div>

    </body>

</template>

<script setup lang='ts'>
import {onUpdated, ref} from 'vue';
import type {IGetBusinessQueryParams} from "@/services/shop/ShopsService";
import ShopsService from "@/services/shop/ShopsService";
import {useIdentityStore} from "@/stores/identityStore";
import {SettlementsService} from "@/services/management/SettlementsService";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import type {ISettlement} from "@/dto/management/ISettlement";

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

onUpdated(() => {

});

</script>
