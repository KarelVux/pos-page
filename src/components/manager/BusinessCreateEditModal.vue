<template>
    <!-- Start modal-->
    <section>
        <div class="d-flex">

            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                    data-bs-target="#addNewBusiness">
                <span v-if="props.create">
                Add new business
                </span>
                <span v-else>
                Edit
                </span>

            </button>
            <!-- Modal -->
            <div class="modal fade" id="addNewBusiness" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabindex="-1" aria-labelledby="addNewBusinessLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addNewBusinessLabel">
                                <span v-if="props.create">
                                    Add new business
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
                            <button type="button" class="btn btn-primary" v-on:click="onSubmit">
                                <span v-if="props.create">
                                    Add new business
                                </span>
                                <span v-else>
                                    Save Updates
                                </span>
                            </button>
                            <p id="businessCreatorHider" data-bs-dismiss="modal" style="visibility: hidden"></p>

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
import type {IManagerBusiness} from "@/dto/manager/IManagerBusiness";
import type {ISettlement} from "@/dto/management/ISettlement";
import type {IBusinessCategory} from "@/dto/shop/IBusinessCategory";
import {ManagerBusinessService} from "@/services/manager/ManagerBusinessService";
import {useIdentityStore} from "@/stores/identityStore";
import {useMessageStore} from "@/stores/messageStore";
import {SettlementsService} from "@/services/management/SettlementsService";
import {BusinessCategoriesService} from "@/services/management/BusinessCategoriesService";


const settlements = ref<ISettlement[]>()
const businessCategories = ref<IBusinessCategory[]>()

const managerBusinessService = new ManagerBusinessService();
const identitySore = useIdentityStore();
const messageStore = useMessageStore();
const settlementService = new SettlementsService();
const businessCategoriesService = new BusinessCategoriesService();


interface IProps {
    businessData: IManagerBusiness,
    create: boolean
}

// Define the props and emits
const props = defineProps<IProps>();
const emits = defineEmits(['update']);

// Create a localData ref to hold the updated values
const registerBusinessInputData = ref<IManagerBusiness>(props.businessData)

onBeforeMount(async () => {
    await sendUserBusinessViewRequests();
})

const sendUserBusinessViewRequests = async () => {
    let identity = identitySore.authenticationJwt

    if (identity) {
        settlements.value = (await settlementService.getAll(identity))
        businessCategories.value = (await businessCategoriesService.getAll(identity))
    }
}


const onSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    let identity = identitySore.authenticationJwt;

    if (identity === undefined) {
        console.log("jwt is null")
        return;
    }
    let business: IManagerBusiness | undefined;
    if (props.create) {
        business = await managerBusinessService.create(identity, registerBusinessInputData.value)
        if (identity) {
            console.log("Business creation was successful")
        } else {
            console.error("Unable to create business")
            return
        }
    } else {
        let [, status] = await managerBusinessService.update(identity, registerBusinessInputData.value.id!, registerBusinessInputData.value)
        if (status) {
            console.log("Business Edit was successful")
        } else {
            console.error("Error occurred when editing business")
            return
        }
    }

    if (identity) {
        console.log("Business creation/edit was successful")
    } else {
        console.error("Unable to create/edit business")
        return
    }

    emits('update', business);
    let hider = document.getElementById('businessCreatorHider');
    hider!.click()

}
</script>