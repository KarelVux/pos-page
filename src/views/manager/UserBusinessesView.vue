<template>
    <div class="row justify-content-center mb-3">
        <div class="col-md-12">
            <!-- Start modal-->
            <section>
                <div class="d-flex">
                    <h1 class="pe-3">Owned businesses</h1>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#addNewBusiness">Add new business
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="addNewBusiness" data-bs-backdrop="static" data-bs-keyboard="false"
                         tabindex="-1" aria-labelledby="addNewBusinessLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="addNewBusinessLabel">Add new business</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">

                                        <div class="col-md-6 mb-3">
                                            <label>Business Name</label>
                                            <input type="text" class="form-control"
                                                   v-model="registerBusinessInputData.name">

                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <label>Address</label>
                                            <input type="text" class="form-control"
                                                   v-model="registerBusinessInputData.address">

                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <label>Phone number</label>
                                            <input type="text" class="form-control"
                                                   v-model="registerBusinessInputData.phoneNumber">
                                        </div>


                                        <div class="col-md-6 mb-3">
                                            <label>Email</label>
                                            <input type="email" class="form-control"
                                                   v-model="registerBusinessInputData.email">
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <label class="form-label">Business Category</label>
                                            <select class="form-select"
                                                    v-model="registerBusinessInputData.businessCategoryId">
                                                <option value="-1" selected disabled>Please select value</option>
                                                <option v-for="businessCategoryItem in businessCategories"
                                                        :key="businessCategoryItem.id"
                                                        :value="businessCategoryItem.id">
                                                    {{ businessCategoryItem.title }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label">Settlement</label>
                                            <select class="form-select"
                                                    v-model="registerBusinessInputData.settlementId">
                                                <option value="-1" selected disabled>Please select value</option>
                                                <option
                                                    v-for="settlementItem in settlements"
                                                    :key="settlementItem.id"
                                                    :value="settlementItem.id">
                                                    {{ settlementItem.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Description</label>
                                        <input type="email" class="form-control"
                                               v-model="registerBusinessInputData.description">
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    <button type="button" class="btn btn-primary" v-on:click="onSubmit">Create new
                                        Business
                                    </button>
                                    <p id="businessCreatorHider" data-bs-dismiss="modal" style="visibility: hidden"
                                       @click="$emit('update:value', false)"></p>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
            <!-- End modal-->

            <!-- Start business loading-->
            <div class="table-responsive" v-if="managerBusinessesData">
                <table class="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>
                            Business ID
                        </th>
                        <th>
                            Business name
                        </th>
                        <th>
                            Address
                        </th>
                        <th>
                            Business description
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item  in managerBusinessesData" :key="item.id" class="a">
                        <td class="">
                            <RouterLink :to="{ name: 'userBusinessesManagement', params: { id: item.id } }">
                                {{
                                    item.id
                                }}
                            </RouterLink>
                        </td>
                        <td>
                            <RouterLink :to="{ name: 'userBusinessesManagement', params: { id: item.id } }">
                                {{
                                    item.name
                                }}
                            </RouterLink>
                        </td>
                        <td>
                            {{ item.address }}
                        </td>
                        <td>
                            {{ item.description }}
                        </td>

                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <LoadingData/>
            </div>
            <!-- End business loading-->
        </div>
    </div>


</template>


<script lang="ts" setup>

import {useIdentityStore} from "@/stores/identityStore";
import {ManagerBusinessService} from "@/services/manager/ManagerBusinessService";
import {onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref, watch} from "vue";
import type {IManagerBusiness} from "@/dto/manager/IManagerBusiness";
import {useMessageStore} from "@/stores/messageStore";
import {SettlementsService} from "@/services/management/SettlementsService";
import {BusinessCategoriesService} from "@/services/management/BusinessCategoriesService";
import type {ISettlement} from "@/dto/management/ISettlement";
import type {IBusinessCategory} from "@/dto/shop/IBusinessCategory";
import LoadingData from "@/components/shared/LoadingData.vue";

const managerBusinessService = new ManagerBusinessService();
const identitySore = useIdentityStore();
const messageStore = useMessageStore();
const settlementService = new SettlementsService();
const businessCategoriesService = new BusinessCategoriesService();

const settlements = ref<ISettlement[]>()
const businessCategories = ref<IBusinessCategory[]>()


const managerBusinessesData = ref<IManagerBusiness[]>();

const registerBusinessInputData = ref<IManagerBusiness>({
    address: "",
    businessCategoryId: "",
    description: "",
    email: "",
    latitude: 0,
    longitude: 0,
    name: "",
    phoneNumber: "",
    picturePath: "",
    rating: 0,
    settlementId: ""
} as IManagerBusiness)


onBeforeMount(async () => {
    await sendUserBusinessViewRequests();
})

const sendUserBusinessViewRequests = async () => {
    let identity = identitySore.authenticationJwt

    if (identity) {
        let businesses = await managerBusinessService.getAll(identity)
        if (businesses) {
            managerBusinessesData.value = businesses;

            console.log(managerBusinessesData.value)
        } else {
            messageStore.addMessage({
                message: "Unable to initialize user businesses", status: ""
            })
        }

        settlements.value = (await settlementService.getAll(identity))
        businessCategories.value = (await businessCategoriesService.getAll(identity))

    }
}

onMounted(async () => {
    console.log("Open business details")
    let identity = identitySore.authenticationJwt;


    if (identity === undefined) {
        console.log("jwt is null")
        return;
    }
})

watch(() => managerBusinessesData.value, async () => {
    // do something when the data changes
});

const onSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    let identity = identitySore.authenticationJwt;

    if (identity === undefined) {
        console.log("jwt is null")
        return;
    }

    let businesses = await managerBusinessService.create(identity, registerBusinessInputData.value)

    if (businesses) {
        console.log("Business creation was successful", businesses)
    } else {
        console.error("Unable to create business")
        return
    }


    await sendUserBusinessViewRequests();
    let hider = document.getElementById('businessCreatorHider');
    hider!.click()

}
</script>