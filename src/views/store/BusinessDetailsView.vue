<template>
    <main class="mt-5 pt-4">
        <div v-if="businessDetails" class="container mt-5">
            <BusinessIntroduction :businessDetails="businessDetails"/>
            <section>
                <div class="container">
                    <div class="col-lg-12 ">
                        <header
                            class="d-sm-flex align-items-center border-bottom mb-4 pb-3 d-flex flex-row justify-content-between">
                            <strong class="d-block py-2">{{ businessDetails.products.length }} Items found </strong>
                            <!--                            <div class="ms-auto">
                                                            <select class="form-select d-inline-block w-auto border pt-1">
                                                                <option value="0">Best match</option>
                                                                <option value="1">Recommended</option>
                                                                <option value="2">High rated</option>
                                                                <option value="3">Randomly</option>
                                                            </select>

                                                        </div>-->
                            <button type="button" class="btn btn-primary" @click="createInvoice">Create invoice</button>
                        </header>

                        <div class="row justify-content-center mb-3" v-for="product in businessDetails.products"
                             :key="product.id">
                            <div class="col-md-12">
                                <div class="card shadow-0 border rounded-3">
                                    <div class="card-body">
                                        <div class="row g-0">
                                            <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                                                <div
                                                    class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                                    <img src="../../assets/image-not-found.png"
                                                         class="w-100">
                                                    <a href="#!">
                                                        <div class="hover-overlay">
                                                            <div class="mask"
                                                                 style="background-color: rgba(253, 253, 253, 0.15);"></div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="col-xl-7 col-md-6 col-sm-8">
                                                <h5>{{ product.name }}</h5>
                                                <div class="d-flex flex-row">

                                                    <div class="mb-3">
                                                        <span class="badge bg-info me-1">{{
                                                                product.productCategory.title
                                                            }}</span>
                                                    </div>


                                                </div>

                                                <p class="text mb-4 mb-md-0">
                                                    {{ product.description }}
                                                </p>
                                            </div>
                                            <div class="col-xl-2 col-md-2 col-sm-4">

                                                <div v-if="product.unitDiscount"
                                                     class="d-flex flex-row align-items-center mb-1">
                                                    <div v-if="product.userSelectedProductCount">
                                                            {{ product.userSelectedProductCount }}
                                                            X
                                                            {{ product.unitPrice + product.unitDiscount }}
                                                            {{ product.currency }}
                                                        <span class="text-danger">
                                                            <s>
                                                                {{ product.unitPrice }} {{ product.currency }}
                                                            </s>
                                                        </span>

                                                            =
                                                            {{
                                                                product.userSelectedProductCount * (product.unitPrice + product.unitDiscount)
                                                            }}
                                                            {{ product.currency }}

                                                        <span class="text-danger">
                                                            <s>
                                                                {{
                                                                    product.userSelectedProductCount * product.unitPrice
                                                                }}
                                                                {{ product.currency }}
                                                            </s>
                                                        </span>

                                                    </div>
                                                    <div v-else>
                                                            {{ product.unitPrice + product.unitDiscount }}
                                                            {{ product.currency }}
                                                        <span class="text-danger"><s>{{
                                                                product.unitPrice
                                                            }} {{ product.currency }}</s></span>

                                                    </div>
                                                </div>
                                                <div v-else class="d-flex flex-row align-items-center mb-1">
                                                    <div v-if="product.userSelectedProductCount">
                                                            {{ product.userSelectedProductCount }} X
                                                            {{ product.unitPrice }}{{ product.currency }} =
                                                            {{
                                                                product.userSelectedProductCount * product.unitPrice
                                                            }}{{ product.currency }}
                                                    </div>

                                                    <div v-else>
                                                            {{ product.unitPrice }}{{ product.currency }}
                                                    </div>

                                                </div>

                                                <div class="mt-4">
                                                    <div class="form-floating mb-3">
                                                        <input type="number" class="form-control" min="0"
                                                               v-model="product.userSelectedProductCount"
                                                               :max="product.unitCount" id="floatingInput"
                                                               @input="handleInputField($event, product)">
                                                        <label for="floatingInput">Unit count</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div v-else>
            <NotFound/>
        </div>
    </main>
</template>

<script setup lang="ts">

import {onBeforeMount, onMounted, ref, watch} from 'vue'
import {useIdentityStore} from "@/stores/identityStore";
import ShopsService from "@/services/shop/ShopsService";
import {useRoute} from "vue-router";
import type {IBusiness} from "@/dto/shop/IBusiness";
import NotFound from "@/components/NotFound.vue";
import SimpleRowValuePair from "@/components/Shops/Elements/SimpleRowValuePair.vue";
import type {IProduct} from "@/dto/shop/IProduct";
import type {ICreateEditInvoice} from "@/dto/shop/ICreateEditInvoice";
import router from "@/router";
import InvoicesService from "../../services/shop/InvoicesService";
import BusinessIntroduction from "@/components/Shops/BusinessIntroduction.vue";
import type IInvoiceCreateEditProduct from "@/dto/shop/IInvoiceCreateEditProduct";

const identitySore = useIdentityStore();
const shopsService = new ShopsService();
const invoicesService = new InvoicesService();

const route = useRoute();
const businessDetails = ref<IBusiness>()

const handleInputField = (event: Event, product: IProduct) => {

    if (product.userSelectedProductCount > product.unitCount) {
        product.userSelectedProductCount = product.unitCount;
    }
}
const createInvoice = async () => {
    let sendableData: ICreateEditInvoice;
    sendableData = {
        InvoiceCreateEditProducts: [],
        businessId: businessDetails.value!.id,
    };

    if (businessDetails.value) {

        businessDetails.value?.products.forEach((itemProduct) => {
            if (itemProduct.id &&
                itemProduct.userSelectedProductCount > 0 &&
                itemProduct.userSelectedProductCount <= itemProduct.unitCount) {
                const invoiceCreateEditProduct : IInvoiceCreateEditProduct= {
                    productId: itemProduct.id,
                    productUnitCount: itemProduct.userSelectedProductCount,
                }
                sendableData.InvoiceCreateEditProducts.push(invoiceCreateEditProduct)
            }
        });


        let identity = identitySore.authenticationJwt;

        if (identity == undefined) {
            console.error("Please log in")
        }
        if (identity && sendableData && sendableData.InvoiceCreateEditProducts.length > 0) {

            console.log(identity.jwt)
            let result = (await invoicesService.createInvoice(identity, sendableData)) as ICreateEditInvoice
            console.log("result", result)
            if (result && result.id) {

                await router.push({name: 'invoiceDetails', params: {id: result.id}});
            }
        }
    }


}

onBeforeMount(async () => {

    await loadData();
})

const loadData = async () => {
    console.log("Open business details")
    let identity = identitySore.authenticationJwt;


    if (identity === undefined) {
        console.log("jwt is null")
        return;
    }

    if (route.params.id) {
        businessDetails.value = (await shopsService.getBusiness(identity, route.params.id as string))
        console.log("Business details", businessDetails)
    } else {
        console.error("Business id is not initialized")
    }
}

</script>

<style scoped>


</style>
