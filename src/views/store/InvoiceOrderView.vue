<template>
    <!-- Steps form -->

    <div class="container">

        <div class="card">
            <div class="card-body mb-4">
                <h2 class="card-title text-center py-2">
                    Here is you order status from {{ businessLimitedData.name }}
                </h2>
                <div>

                </div>
                <OrderProgressStatus v-if="invoiceData.order.orderAcceptanceStatus == OrderAcceptanceStatusEnum.GivenToClient"
                                     header="Order has been picked up. Have a nice meal"
                                     strongText=""
                                     :progressbarWidth="100"
                />
                <OrderProgressStatus v-else-if="invoiceData.order.orderAcceptanceStatus == OrderAcceptanceStatusEnum.Ready"
                                     header="Your order is ready for pickup"
                                     strongText=""
                                     :progressbarWidth="75"
                />
                <OrderProgressStatus v-else-if="invoiceData.order.orderAcceptanceStatus == OrderAcceptanceStatusEnum.BusinessIsPreparing"
                                     header="Business owner has accepted the order and preparing it"
                                     strongText=""
                                     :progressbarWidth="50"
                />
                <OrderProgressStatus v-else-if="invoiceData.order.orderAcceptanceStatus == OrderAcceptanceStatusEnum.Unknown"
                                     header="Business owner is checking the order"
                                     strongText="Please wait"
                                     progressbarWidth="25"
                />

                <div  v-if="businessLimitedData">
                    <BusinessIntroduction :businessDetails="businessLimitedData"/>
                </div>

                <div  v-if="invoiceData">
                    <InvoiceDetailsCard :invoiceDataVal="invoiceData"/>
                </div>
            </div>
        </div>
    </div>

</template>


<script lang="ts" setup>
import {useIdentityStore} from "@/stores/identityStore";
import {useRoute, RouterLink} from "vue-router";
import {onBeforeMount, onMounted, onUnmounted, ref} from "vue";
import InvoicesService from "@/services/shop/InvoicesService";
import type {IInvoiceOrder} from "@/dto/shop/IInvoiceOrder";
import type {IInvoice} from "@/dto/shop/IInvoice";
import ShopsService from "@/services/shop/ShopsService";
import type {IBusiness} from "@/dto/shop/IBusiness";
import OrderProgressStatus from "@/components/Shops/Elements/OrderProgressStatus.vue";
import BusinessIntroduction from "@/components/Shops/BusinessIntroduction.vue";
import InvoiceDetailsCard from "@/components/Shops/InvoiceDetailsCard.vue";
import {OrderAcceptanceStatusEnum} from "@/dto/enums/OrderAcceptanceStatusEnum";

const identitySore = useIdentityStore();

const invoicesService = new InvoicesService();
const shopsService = new ShopsService();

const businessLimitedData = ref<IBusiness>()
const invoiceData = ref<IInvoice>()

const props = defineProps({
    id: String,
})

const route = useRoute();
let timerId: number;

onBeforeMount(async () => {
    let identity = identitySore.authenticationJwt;
    let id = route.params.id
    console.log("Invoice details id is recieved", id)
    if (identity === undefined) {
        console.log("jwt is null")
        return;
    }

    if (id) {
        invoiceData.value = (await invoicesService.getInvoice(identity, route.params.id.toString()))
        businessLimitedData.value = await shopsService.getBusinessInfo(identity, invoiceData.value!.businessId)
    } else {
        console.error("Invoice id is not initialized")
    }

})

onMounted(() => {
    let identity = identitySore.authenticationJwt;

    timerId = setInterval(async () => {

        if (identity && props.id)
            invoiceData.value = await invoicesService.getInvoice(identity, props.id)
    }, 5000);
});

// call out to remove memory leaks?
onUnmounted(() => {
    clearInterval(timerId);
});
</script>