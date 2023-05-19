<template>
    <section>
        <!--Grid row-->
        <div class="row">
            <!--Grid column-->
            <div class="col-md-6 mb-4">

                <img v-if="!businessDetails.picturePath"
                     src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
                     class="img-fluid" alt=""/>
                <img v-else
                     :src="businessDetails.picturePath"
                     class="img-fluid" alt=""/>
            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-md-6 mb-4">
                <!--Content-->
                <div class="p-4">
                    <strong><p style="font-size: 20px;">{{ businessDetails.name }}</p></strong>

                    <div class="mb-3" v-if="businessDetails.businessCategory">
                        <span class="badge bg-info me-1">{{ businessDetails.businessCategory.title }}</span>
                    </div>


                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos
                        atque
                        quia ipsa sint voluptatibus! Beatae sit assumenda asperiores iure at maxime atque
                        repellendus maiores quia sapiente.</p>

                    <SimpleRowValuePair
                        strongText="Address: "
                        :normalText="businessDetails.address"
                    />
                    <SimpleRowValuePair
                        strongText="Email: "
                        :normalText="businessDetails.email"
                    />
                    <SimpleRowValuePair
                        strongText="Phone number: "
                        :normalText="businessDetails.phoneNumber"
                    />
                </div>
                <!--Content-->
            </div>
            <!--Grid column-->
        </div>
        <!--Grid row-->
    </section>
</template>
<script setup lang="ts">
import {onMounted, onUpdated, watch} from "vue";
import type {IBusiness} from "@/dto/shop/IBusiness";
import SimpleRowValuePair from "@/components/Shops/Elements/SimpleRowValuePair.vue";

interface IProps {
    businessDetails: IBusiness,
}

const props = defineProps<IProps>();

// watch(() => [props.progressbarWidth, props.strongText, props.header], () => {});


</script>