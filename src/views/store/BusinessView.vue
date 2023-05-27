<template>
    <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Search</h4>
        <div>
            <div class="row g-3">
                <div class="col-md-3">
                    <label for="zip" class="form-label">Business Name</label>
                    <input type="text" class="form-control" id="zip" placeholder=""
                           v-model="inputValues.businessSearchName" required>
                </div>
                <div class="col-md-5">
                    <label for="country" class="form-label">Settlement</label>
                    <select class="form-select" id="country" v-model="inputValues.settlementId" required>
                        <option value="">Choose...</option>
                        <option v-for="settlementItem in settlements" :key="settlementItem.id"
                                :value="settlementItem.id">{{ settlementItem.name }}
                        </option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="state" class="form-label">Business Category</label>
                    <select class="form-select" id="businessCategory" v-model="inputValues.businessCategoryId">
                        <option value="">Choose...</option>
                        <option v-for="businessCategoryItem in businessCategories" :key="businessCategoryItem.id"
                                :value="businessCategoryItem.id">{{ businessCategoryItem.title }}
                        </option>
                    </select>
                </div>
            </div>
            <br>
            <button class="w-100 btn btn-primary btn-lg" @click="performSearch">Search</button>
        </div>
    </div>
    <br>

    <div class="col-lg-9">
        <div class="row justify-content-center mb-3">
            <div class="col-md-12">
                <div class="card shadow-0 border rounded-3">
                    <div class="card-body" v-for="businessData in businesses" :key="businessData.id">
                        <div class="row g-0">
                            <div class="col-xl-4 col-md-4 d-flex justify-content-center">
                                <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                    <img src="../../assets/image-not-found.png"
                                         class="w-100" alt="">
                                </div>
                            </div>
                            <div class="col-xl-8 col-md-8 col-sm-8">
                                <router-link :to="{ name: 'businessDetails', params: { id: businessData.id } }">
                                    <h5>{{ businessData.name }}</h5>
                                </router-link>


                                <div>
                                    <span class="badge bg-danger">{{ businessData.businessCategory.title }}</span>

                                </div>
                                <div>
                                    <p>Address: {{ businessData.address }}</p>


                                </div>
                                <!--
                                                                <div class="d-flex flex-row">
                                                                    <div class="text-warning mb-1 me-2">
                                                                        <i class="fa fa-star"></i>
                                                                        <i class="fa fa-star"></i>
                                                                        <i class="fa fa-star"></i>
                                                                        <i class="fa fa-star"></i>
                                                                        <i class="fas fa-star-half-alt"></i>
                                                                        <span class="ms-1">  4.5 </span>
                                                                    </div>
                                                                    <span class="text-muted">154 orders</span>
                                                                </div>
                                -->

                                <p class="text mb-4 mb-md-0">
                                    {{ businessData.description }}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


  <!--
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
  -->
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onUpdated, ref, watch} from "vue";
import {useIdentityStore} from "@/stores/identityStore";
import {SettlementsService} from "@/services/management/SettlementsService";
import type IBusinessSearch from "@/dto/shop/businessView/IBusinessSearch";
import type {ISettlement} from "@/dto/management/ISettlement";
import {BusinessCategoriesService} from "@/services/management/BusinessCategoriesService";
import type {IBusinessCategory} from "@/dto/shop/IBusinessCategory";
import type {IBusiness} from "@/dto/shop/IBusiness";
import ShopsService from "@/services/shop/ShopsService";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import {ManagerBusinessService} from "@/services/manager/ManagerBusinessService";


const identitySore = useIdentityStore();
const settlementService = new SettlementsService();
const businessCategoriesService = new BusinessCategoriesService();
const shopsService = new ShopsService();

const inputValues = ref<IBusinessSearch>({
    businessCategoryId: "",
    businessSearchName: "",
    settlementId: ""
})

const businesses = ref<IBusiness[]>()
const settlements = ref<ISettlement[]>()
const businessCategories = ref<IBusinessCategory[]>()
/*
const managerBusinessService = new ManagerBusinessService();
onBeforeMount(async () => {
    let identity = identitySore.authenticationJwt;

    if (identity){
        var value = await managerBusinessService.getAll(identity)
        console.log("USer businesses", value)

    }

});
*/

watch(() => identitySore.authenticationJwt, async () => {
    // do something when the data changes
    let identity = identitySore.authenticationJwt;

    settlements.value = (await settlementService.getAll(identity as IJWTResponse))
    businessCategories.value = (await businessCategoriesService.getAll(identity as IJWTResponse))

});

const performSearch = async () => {
    var responseBusinesses = await shopsService.getBusinesses(identitySore.authenticationJwt as IJWTResponse,
        {
            settlementId: inputValues.value.settlementId,
            businessCategoryId: inputValues.value.businessCategoryId
        })


    if (responseBusinesses) {
        if (responseBusinesses!.length > 0 &&
            inputValues.value.businessSearchName != null ||
            inputValues.value.businessSearchName!.trim().length > 0) {

            businesses.value = responseBusinesses.filter(x => x.name.toLowerCase().includes(inputValues.value.businessSearchName.toLowerCase().trim()))
        }else{
            businesses.value = responseBusinesses;

        }

    } else {
        businesses.value = []
    }
}
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