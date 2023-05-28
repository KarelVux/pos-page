<template>
    <div class="row justify-content-center mb-3">
        <div class="col-md-12">
            <!-- Start modal-->
            <section>
                <div class="d-flex">
                    <h1 class="pe-3">Owned businesses</h1>

                    <BusinessCreateEditModal :create="true"
                                             @update="updateObjectData" businessData=""/>
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
import BusinessCreateEditModal from "@/components/manager/BusinessCreateEditModal.vue";

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

const updateObjectData = async () => {
    await sendUserBusinessViewRequests();
}
</script>