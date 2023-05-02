<template>
    <body>
    <div class="container">
        <main role="main" class="pb-3">

            <div class="text-center">
                <h1 class="display-4">Welcome</h1>
                <p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.
                </p>
            </div>
        </main>
    </div>

    </body>

</template>

<script setup lang='ts'>
import {onMounted, ref} from 'vue';
import type {IGetBusinessQueryParams} from "@/services/shop/ShopsService";
import ShopsService from "@/services/shop/ShopsService";
import AutheticationComp from "@/components/AutheticationComp.vue";
import NavBar from "@/App.vue";

const shopsService = new ShopsService();

onMounted(() => {
    const params: IGetBusinessQueryParams = {
        settlementId: ""

    }

    var businesses = shopsService.getBusinesses("adasdas", params);

    console.log(businesses);
});

</script>
