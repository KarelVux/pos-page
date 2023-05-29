<template>
    <div class="container" v-if="managerBusinessData">
        <div class="card my-1">
            <div class="card-body ">
                <!-- Start Business info-->
                <div>
                    <BusinessIntroduction :businessDetails="managerBusinessData">
                        <BusinessCreateEditModal :businessData="managerBusinessData" :create="false"
                                                 @update="updateObjectData"/>
                    </BusinessIntroduction>
                </div>

                <!-- End Business info-->
            </div>
        </div>
        <div class="card my-1">
            <div class="card-body ">

                <!-- Start Product info-->
                <div v-if="managerBusinessData">
                    <div class="card-title d-flex  justify-content-center py-2">

                        <h2 class="d-flex me-2"> Business products</h2>
                        <ProductCreateEditModal
                            class="d-flex ms-2"
                            productData=""
                            :businessId="businessId!"
                            :create="true"
                            @update="updateObjectData"/>
                    </div>


                    <table v-if=" managerBusinessData && managerBusinessData.products"
                           class="table table-striped table-sm ">
                        <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Unit Count
                            </th>
                            <th>
                                Unit Price
                            </th>
                            <th>
                                Unit Discount
                            </th>
                            <th>
                                Tax percent
                            </th>
                            <th>
                                Currency
                            </th>
                            <th>
                                Frozen
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody class="">
                        <tr v-for="item  in managerBusinessData.products" :key="item.id" class="">
                            <td>
                                {{ item.name }}
                            </td>
                            <td>
                                {{ item.description }}
                            </td>
                            <td>
                                {{ item.productCategory.title }}
                            </td>
                            <td>
                                {{ item.unitCount }}
                            </td>
                            <td>
                                {{ item.unitPrice }}
                            </td>
                            <td>
                                {{ item.unitDiscount }}
                            </td>
                            <td>
                                {{ item.taxPercent }}
                            </td>
                            <td>
                                {{ item.currency }}
                            </td>
                            <td>
                                {{ item.frozen }}
                            </td>
                            <td>
                                <ProductCreateEditModal :productData="item" :businessId="businessId!" :create="false"
                                                        @update="updateObjectData"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- End Product info-->
            </div>

        </div>

        <!-- Start invoices -->
        <div class="card my-2" v-if="openInvoices.length > 0">
            <div class="card-body mb-4">
                <h2 class="card-title text-center py-2">
                    Active invoice orders
                </h2>
                <table class="table border-bottom border-gray-200 mt-3">
                    <thead>
                    <tr>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Invoice ID</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Creation Time</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Username</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Payment Completed</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Products</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Subtotal</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Tax</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Total</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Acceptance status</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Order Status</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-1">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="openInvoice in openInvoices " :key="openInvoice.id">
                        <td class="px-1">
                            {{ openInvoice.id }}
                        </td>
                        <td class=" px-1">
                            {{ getFormattedDate(openInvoice.creationTime) }}
                        </td>
                        <td class=" px-1">{{ openInvoice.userName }}</td>

                        <td class=" px-1">{{ openInvoice.paymentCompleted }}</td>

                        <td class=" px-1">
                            <p v-for="(invoiceRow, index) in openInvoice.invoiceRows" :key="index">
                                {{ invoiceRow.productUnitCount }} X {{ invoiceRow.productName }} =
                                {{ invoiceRow.finalProductPrice }}
                            </p>
                        </td>
                        <td class=" px-1">{{ openInvoice.totalPriceWithoutTax }}</td>
                        <td class=" px-1">{{ openInvoice.taxAmount }}</td>
                        <td class=" px-1">{{ openInvoice.finalTotalPrice }}</td>
                        <td class=" px-1">{{ openInvoice.invoiceAcceptanceStatus }}</td>
                        <td class=" px-1">
                            <p v-if="openInvoice.order.orderAcceptanceStatus == OrderAcceptanceStatusEnum.GivenToClient">
                                Given to client
                            </p>
                            <p v-if="openInvoice.order.orderAcceptanceStatus == OrderAcceptanceStatusEnum.Ready">
                                Ready
                            </p>
                            <p v-if="openInvoice.order.orderAcceptanceStatus == OrderAcceptanceStatusEnum.BusinessIsPreparing">
                                Preparing
                            </p>
                            <p v-if="openInvoice.order.orderAcceptanceStatus == OrderAcceptanceStatusEnum.Unknown">
                                Needs business acceptance
                            </p>

                        </td>
                        <td class=" px-1">

                            <button type="button" class="btn btn-outline-primary w-100"
                                    @click="acceptInvoice(openInvoice)">
                                Accept
                            </button>
                            <button type="button" class="btn btn-outline-danger   w-100">
                                Decline
                            </button>
                            <button type="button" class="btn btn-outline-info  w-100">
                                Payment completed
                            </button>


                        </td>

                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="card my-2">
            <div class="card-body mb-4">
                <h2 class="card-title text-center py-2">
                    Invoice history
                </h2>
                <table class="table border-bottom border-gray-200 mt-3" v-if="closedInvoices.length > 0">
                    <thead>
                    <tr>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm px-0">Invoice ID</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm  px-0">Business name</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Order date</th>
                        <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Final price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="closedInvoice in closedInvoices " :key="closedInvoice.id">
                        <td class="px-0">{{ closedInvoice.id }}</td>
                        <td class=" px-0">{{ closedInvoice.businessId }}</td>

                        <td class="text-end px-0">{{
                                getFormattedDate(closedInvoice.creationTime)
                            }}
                        </td>
                        <td class="text-end px-0">{{ closedInvoice.finalTotalPrice }}</td>
                    </tr>
                    </tbody>
                </table>
                <div v-else>
                    Sorry there are not any open invoices
                </div>
            </div>
        </div>

        <!-- End invoices -->
    </div>
    <div v-else>
        <LoadingData/>
    </div>
</template>


<script lang="ts" setup>
import {ManagerBusinessService} from "@/services/manager/ManagerBusinessService";
import {useIdentityStore} from "@/stores/identityStore";
import {onBeforeMount, ref, watch} from "vue";
import type {IManagerBusiness} from "@/dto/manager/IManagerBusiness";
import {useRoute} from "vue-router";
import {useMessageStore} from "@/stores/messageStore";
import BusinessIntroduction from "@/components/Shops/BusinessIntroduction.vue";
import LoadingData from "@/components/shared/LoadingData.vue";
import BusinessCreateEditModal from "@/components/manager/BusinessCreateEditModal.vue";
import ProductCreateEditModal from "@/components/manager/ProductCreateEditModal.vue";
import {tr} from "vuetify/locale";
import {InvoiceService} from "@/services/manager/InvoiceService";
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import {getFormattedDate} from "@/helpers/UnifiedFormatter";
import {OrderAcceptanceStatusEnum} from "@/dto/enums/OrderAcceptanceStatusEnum";
import {InvoiceAcceptanceStatusEnum} from "@/dto/enums/InvoiceAcceptanceStatusEnum";

const managerBusinessService = new ManagerBusinessService();
const invoiceService = new InvoiceService();
const identitySore = useIdentityStore();
const messageStore = useMessageStore();

const route = useRoute();

const managerBusinessData = ref<IManagerBusiness>();
const businessId = ref<string>()
const openInvoices = ref<IManagerInvoice[]>([]);
const closedInvoices = ref<IManagerInvoice[]>([]);

watch(() => managerBusinessData.value, async () => {
});


// Method to update objectData
const updateObjectData = async () => {
    // managerBusinessData.value = businessData;
    await loadPageData();
};

onBeforeMount(async () => {
    businessId.value = route.params.id as string
    await loadPageData();

})

const acceptInvoice = async (invoice: IManagerInvoice) => {
    let identity = identitySore.authenticationJwt

    let invoiceChangeableData: IManagerInvoice = {
        id: invoice.id,
        appUserId: invoice.appUserId,
        businessId: invoice.businessId,
        creationTime: invoice.creationTime,
        finalTotalPrice: invoice.finalTotalPrice,
        invoiceAcceptanceStatus: InvoiceAcceptanceStatusEnum.BusinessAccepted,
        order: invoice.order,
        orderId: invoice.orderId,
        paymentCompleted: invoice.paymentCompleted,
        taxAmount: invoice.taxAmount,
        totalPriceWithoutTax: invoice.totalPriceWithoutTax,
    }

    if (identity) {
        let returnableInvoice = await invoiceService.update(identity, invoiceChangeableData.id!, invoiceChangeableData)
        if (returnableInvoice) {
            console.log("Successfully changed")
        } else {
            messageStore.addMessage({
                message: "Unable to edit invoice ", status: ""
            })
        }
    }

    //   await updateObjectData();
}

const loadPageData = async () => {
    let identity = identitySore.authenticationJwt

    if (identity) {
        let business = await managerBusinessService.getById(identity, businessId.value!)
        if (business) {
            managerBusinessData.value = business;
        } else {
            messageStore.addMessage({
                message: "Unable to find business " + route.params.id, status: ""
            })
        }

        let invoices = await invoiceService.getBusinessInvoices(identity, businessId.value!)


        if (invoices) {
            console.log("Got invoices", invoices)
            closedInvoices.value = []
            openInvoices.value = []
            invoices.forEach(function (item) {
                if (item.order.orderAcceptanceStatus === OrderAcceptanceStatusEnum.GivenToClient && item.paymentCompleted) {
                    closedInvoices.value.push(item)
                } else {
                    openInvoices.value.push(item)
                }
            });


            console.log("closed invoice", closedInvoices)
            console.log("open invoice", openInvoices)
        } else {
            console.warn("Error occurred when checking invoices ")
        }


    }
}

</script>


<style scoped>
.table-responsive {
    overflow-y: scroll;
    height: 200px;
}
</style>