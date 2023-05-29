<template>
    <div class="container">
        <div class="card">
            <div class="card-body mb-4">
                <!-- Start Business info-->
                <div v-if="managerBusinessData">
                    <BusinessIntroduction :businessDetails="managerBusinessData">
                        <BusinessCreateEditModal :businessData="managerBusinessData" :create="false"
                                                 @update="updateObjectData"/>
                    </BusinessIntroduction>
                </div>
                <div v-else>
                    <LoadingData/>
                </div>
                <!-- End Business info-->

                <!-- Start Product info-->
                <div v-if="managerBusinessData">
                    <div class="row">
                        <div class="col text-end">
                            <ProductCreateEditModal productData="" :businessId="businessId!" :create="true"
                                                    @update="updateObjectData"/>
                        </div>
                    </div>
                    <table v-if=" managerBusinessData && managerBusinessData.products"
                           class="table table-striped table-sm">
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
    </div>
</template>


<script lang="ts" setup>
import {ManagerBusinessService} from "@/services/manager/ManagerBusinessService";
import {useIdentityStore} from "@/stores/identityStore";
import {onBeforeMount, onMounted, ref, watch} from "vue";
import type {IManagerBusiness} from "@/dto/manager/IManagerBusiness";
import {useRoute} from "vue-router";
import {useMessageStore} from "@/stores/messageStore";
import BusinessIntroduction from "@/components/Shops/BusinessIntroduction.vue";
import LoadingData from "@/components/shared/LoadingData.vue";
import type {IManagerProduct} from "@/dto/manager/IManagerProduct";
import BusinessCreateEditModal from "@/components/manager/BusinessCreateEditModal.vue";
import ProductCreateEditModal from "@/components/manager/ProductCreateEditModal.vue";
import {tr} from "vuetify/locale";

const managerBusinessService = new ManagerBusinessService();
const identitySore = useIdentityStore();
const messageStore = useMessageStore();

const route = useRoute();
const managerBusinessData = ref<IManagerBusiness>();

const businessId = ref<string>()

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
    }
}

</script>