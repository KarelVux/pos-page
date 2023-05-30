<template>
    <div class="container mt-6 mb-7" v-if="invoiceData">
        <div class="row justify-content-center">
            <div class="col-lg-12 col-xl-7">
                <InvoiceDetailsCard :invoiceDataVal="invoiceData">
                    <button
                        @click="router.go(-1)"
                        class="btn btn-primary btn-lg card-footer-btn justify-content-center text-uppercase-bold-sm hover-lift-light">
                        Go back
                    </button>
                </InvoiceDetailsCard>
            </div>
        </div>
    </div>
    <div v-else>Loading</div>
</template>

<script lang="ts" setup>
import {useIdentityStore} from "@/stores/identityStore";
import {RouterLink, useRouter, useRoute} from "vue-router";
import {onBeforeMount, ref} from "vue";
import type {IInvoice} from "@/dto/shop/IInvoice";
import InvoicesService from "@/services/shop/InvoicesService";
import InvoiceDetailsCard from "@/components/Shops/InvoiceDetailsCard.vue";

const identitySore = useIdentityStore();
const invoicesService = new InvoicesService();


const route = useRoute();
const router = useRouter()
const invoiceData = ref<IInvoice>()


onBeforeMount(async () => {
    invoiceData.value = {} as IInvoice
    let identity = identitySore.authenticationJwt;

    if (identity === undefined) {
        console.log("jwt is null")
        return;
    }

    if (route.params.id) {
        invoiceData.value = (await invoicesService.getInvoice(identity, route.params.id as string))
        console.log("Invoice details", invoiceData)
    } else {
        console.error("Invoice  id is not initialized")
    }

})

</script>