<template>
    <!-- Start modal-->
    <section>
        <div class="d-flex">

            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                    data-bs-target="#addNewProduct">
                <span v-if="props.create">
                Add new product
                </span>
                <span v-else>
                Edit
                </span>

            </button>
            <!-- Modal -->
            <div class="modal fade" id="addNewProduct" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabindex="-1" aria-labelledby="addNewProductLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addNewProductLabel">
                                <span v-if="props.create">
                                    Add new product
                                </span>
                                <span v-else>
                                    Edit
                                </span>

                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-control"
                                           v-model="displayData.name">
                                </div>
                            </div>
                            <div class="row">
                                <div class="mb-3">
                                    <label class="form-label">Description</label>
                                    <input type="text" class="form-control"
                                           v-model="displayData.description">
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-md-6 mb-3">
                                    <label>Unit Price</label>
                                    <input type="text" class="form-control"
                                           v-model="displayData.unitPrice">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>Unit Count</label>
                                    <input type="text" class="form-control"
                                           v-model="displayData.unitCount">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>Tax Percent</label>
                                    <input type="text" class="form-control"
                                           v-model="displayData.taxPercent">
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label>Discount</label>
                                    <input type="text" class="form-control"
                                           v-model="displayData.unitDiscount">
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label>Currency</label>
                                    <input type="text" class="form-control"
                                           v-model="displayData.currency">
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Product Category</label>
                                    <select class="form-select"
                                            v-model="displayData.productCategoryId">
                                        <option value="-1" selected disabled>Please select value</option>
                                        <option v-for="productCategoryItem in productCategories"
                                                :key="productCategoryItem.id"
                                                :value="productCategoryItem.id">
                                            {{ productCategoryItem.title }}
                                        </option>
                                    </select>
                                </div>


                                <div
                                    class="col-md-6 mb-3  form-check   d-flex  justify-content-start  align-items-center"
                                >
                                    <input class="form-check-input   ms-0 me-2 mt-3" type="checkbox"
                                           v-model="displayData.frozen">
                                    <label class="form-check-label mt-3 " for="flexCheckDefault">
                                        Frozen
                                    </label>

                                </div>

                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close
                            </button>
                            <button type="button" class="btn btn-primary" v-on:click="onSubmit">
                                <span v-if="props.create">
                                    Add new Product
                                </span>
                                <span v-else>
                                    Save Updates
                                </span>
                            </button>
                            <p id="productCreatorHider" data-bs-dismiss="modal" style="visibility: hidden"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End modal-->
</template>

<script lang="ts" setup>


import {onBeforeMount, ref} from "vue";
import {useIdentityStore} from "@/stores/identityStore";
import type {IManagerProduct} from "@/dto/manager/IManagerProduct";
import type {IProductCategory} from "@/dto/shop/IProductCategory";
import {ProductCategoriesService} from "@/services/management/ProductCategoriesService";
import {ProductService} from "@/services/manager/ProductService";


const productCategories = ref<IProductCategory[]>()

const productCategoriesService = new ProductCategoriesService();
const productService = new ProductService();

const identitySore = useIdentityStore();


interface IProps {
    productData: IManagerProduct,
    businessId: string,
    create: boolean
}

// Define the props and emits
const props = defineProps<IProps>();
const emits = defineEmits(['update']);

// Create a localData ref to hold the updated values
const originalData = ref<IManagerProduct>(props.productData)
const displayData = ref<IManagerProduct>({
    businessId: "",
    currency: "",
    description: "",
    frozen: false,
    name: "",
    productCategoryId: "",
    taxPercent: 0,
    unitCount: 0,
    unitDiscount: 0,
    unitPrice: 0
} as IManagerProduct)

onBeforeMount(async () => {
    await sendInitialRequests();

    if (!props.create) {
        originalToDisplay();

    }
})

const originalToDisplay = () => {
    displayData.value.businessId = originalData.value.businessId
    displayData.value.currency = originalData.value.currency
    displayData.value.description = originalData.value.description
    displayData.value.frozen = originalData.value.frozen
    displayData.value.name = originalData.value.name
    displayData.value.productCategoryId = originalData.value.productCategoryId
    displayData.value.taxPercent = originalData.value.taxPercent
    displayData.value.unitCount = originalData.value.unitCount
    displayData.value.unitDiscount = originalData.value.unitDiscount
    displayData.value.unitPrice = originalData.value.unitPrice
}

const mapDisplayToOriginal = () => {
    originalData.value.businessId = displayData.value.businessId
    originalData.value.currency = displayData.value.currency
    originalData.value.description = displayData.value.description
    originalData.value.frozen = displayData.value.frozen
    originalData.value.name = displayData.value.name
    originalData.value.productCategoryId = displayData.value.productCategoryId
    originalData.value.taxPercent = displayData.value.taxPercent
    originalData.value.unitCount = displayData.value.unitCount
    originalData.value.unitDiscount = displayData.value.unitDiscount
    originalData.value.unitPrice = displayData.value.unitPrice
}

const sendInitialRequests = async () => {
    let identity = identitySore.authenticationJwt

    if (identity) {
        productCategories.value = (await productCategoriesService.getAll(identity))
    }
}


const onSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    let identity = identitySore.authenticationJwt;

    if (identity === undefined) {
        console.log("jwt is null")
        return;
    }
    let product: IManagerProduct | undefined;
    if (props.create) {

        console.log("Display data", displayData.value)
        displayData.value.businessId =  props.businessId
        product = await productService.create(identity, displayData.value)
        if (product) {
            console.log("Product creation was successful")
        } else {
            console.error("Unable to create product")
            return
        }
    } else {

        mapDisplayToOriginal();


        let [, status] = await productService.update(identity, originalData.value.id!, originalData.value)
        if (status) {
            console.log("Product Edit was successful")
        } else {
            console.error("Error occurred when editing product")
            return
        }
    }

    emits('update');
    let hider = document.getElementById('productCreatorHider');
    hider!.click()

}
</script>