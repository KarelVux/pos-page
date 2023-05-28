<template>
    <div class="container">
        <div class="card">
            <div class="card-body mb-4">
                <!-- Start Business info-->
                <div v-if="managerBusinessData">
                    <BusinessIntroduction :businessDetails="managerBusinessData">
                        <button type="button" class="btn btn-outline-primary" @click="modifyBusinessData">
                            Modify businessData
                        </button>
                    </BusinessIntroduction>
                </div>
                <div v-else>
                    <LoadingData/>
                </div>
                <!-- End Business info-->

                <!-- Start Product info-->
                <table v-if=" managerBusinessData && managerBusinessData.products" class="table table-striped table-sm">
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
                    <tbody>
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
                            Action
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!-- End Product info-->

            </div>

        </div>
    </div>
</template>


<script lang="ts" setup>
import {ManagerBusinessService} from "@/services/manager/ManagerBusinessService";
import {useIdentityStore} from "@/stores/identityStore";
import {onBeforeMount, onMounted, ref} from "vue";
import type {IManagerBusiness} from "@/dto/manager/IManagerBusiness";
import {useRoute} from "vue-router";
import router from "@/router";
import {useMessageStore} from "@/stores/messageStore";
import BusinessIntroduction from "@/components/Shops/BusinessIntroduction.vue";
import LoadingData from "@/components/shared/LoadingData.vue";
import type {IManagerProduct} from "@/dto/manager/IManagerProduct";

const managerBusinessService = new ManagerBusinessService();
const identitySore = useIdentityStore();
const messageStore = useMessageStore();

const route = useRoute();
const managerBusinessData = ref<IManagerBusiness>();

const modifyBusinessData = async () => {
    console.log("modify data")

    let identity = identitySore.authenticationJwt

    managerBusinessData.value.name = "asdasdasdas name";

    if (identity) {
        let business = await managerBusinessService.update(identity, route.params.id, managerBusinessData.value)
        if (business) {
            managerBusinessData.value = business;
        }
    }

}

onBeforeMount(async () => {
    let identity = identitySore.authenticationJwt

    if (identity) {
        let business = await managerBusinessService.getById(identity, route.params.id as string)
        if (business) {
            managerBusinessData.value = business;
        } else {
            messageStore.addMessage({
                message: "Unable to find business " + route.params.id, status: ""
            })
        }
    }
})

</script>