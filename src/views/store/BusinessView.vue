<template>
    <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Search</h4>
        <div>
            <div class="row g-3">


                <div class="col-md-3">
                    <label for="zip" class="form-label">Business Name</label>
                    <input type="text" class="form-control" id="zip" placeholder="" required>

                </div>

                <div class="col-md-5">
                    <label for="country" class="form-label">Settlement</label>
                    <select class="form-select" id="country" required>
                        <option value="">Choose...</option>
                        <option>United States</option>
                    </select>
                    <div class="invalid-feedback">
                        Please select a valid country.
                    </div>
                </div>

                <div class="col-md-4">
                    <label for="state" class="form-label">State</label>
                    <select class="form-select" id="state">
                        <option value="">Choose...</option>
                        <option>California</option>
                    </select>
                </div>
            </div>
            <br>
            <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
        </div>
    </div>


    <br>

    <div class="col-lg-9">
        <div class="row justify-content-center mb-3">
            <div class="col-md-12">
                <div class="card shadow-0 border rounded-3">
                    <div class="card-body">
                        <div class="row g-0">
                            <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                                <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                    <img src="../../assets/image-not-found.png"
                                         class="w-100" alt="">
                                </div>
                            </div>
                            <div class="col-xl-6 col-md-5 col-sm-7">
                                <h5>Rucksack Backpack Jeans</h5>
                                <div class="d-flex flex-row">
                                    <div class="text-warning mb-1 me-2">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                        <span class="ms-1">
                          4.5
                        </span>
                                    </div>
                                    <span class="text-muted">154 orders</span>
                                </div>

                                <p class="text mb-4 mb-md-0">
                                    Short description about the product goes here, for ex its features. Lorem ipsum
                                    dolor sit amet with hapti you enter into any new area of science, you almost lorem
                                    ipsum is great text
                                    consectetur adipisicing
                                </p>
                            </div>
                            <div class="col-xl-3 col-md-3 col-sm-5">
                                <div class="d-flex flex-row align-items-center mb-1">
                                    <h4 class="mb-1 me-1">$34,50</h4>
                                    <span class="text-danger"><s>$49.99</s></span>
                                </div>
                                <h6 class="text-success">Free shipping</h6>
                                <div class="mt-4">
                                    <button class="btn btn-primary shadow-0" type="button">Buy this</button>
                                    <a href="#!" class="btn btn-light border px-2 pt-2 icon-hover"><i
                                            class="fas fa-heart fa-lg px-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useIdentityStore} from "@/stores/identityStore";
import {SettlementsService} from "@/services/management/SettlementsService";
import type IBusinessSearch from "@/dto/shop/businessView/IBusinessSearch";
import type {ISettlement} from "@/dto/management/ISettlement";
import {BusinessCategoriesService} from "@/services/management/BusinessCategoriesService";
import type {IBusiness} from "@/dto/shop/IBusiness";
import type {IBusinessCategory} from "@/dto/shop/IBusinessCategory";


const identitySore = useIdentityStore();
const settlementService = new SettlementsService();
const businessCategoriesService = new BusinessCategoriesService();

const vall = ref<IBusinessSearch>({
    businessCategoryId: "",
    businessSearchName: "",
    settlementId: ""
})
const settlements = ref<ISettlement[]>()
const businessCategories = ref<IBusinessCategory[]>()


onMounted(async () => {
    console.log("Open business details")
    let identity = identitySore.authenticationJwt;


    if (identity === undefined) {
        console.log("jwt is null")
        return;
    }
    settlements.value = (await settlementService.getAll(identity))
    businessCategories.value = (await businessCategoriesService.getAll(identity))

})
</script>