<template>
  <div class="container mt-6 mb-7">
    <div class="row justify-content-center">
      <div class="col-lg-12 col-xl-7">
        <div class="card">
          <div class="card-body p-5">
            <h2>
              Hey ,
            </h2>
            <p class="fs-sm">
              This is the receipt for a payment of <strong>{{ invoiceData.finalTotalPrice }}</strong>
            </p>

            <table class="table border-bottom border-gray-200 mt-3">
              <thead>
              <tr>
                <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm px-0">Description</th>
                <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Tax Percent</th>
                <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Tax Amount</th>
                <th scope="col" class="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Amount</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="invoiceRow in invoiceData.invoiceRows" :key="invoiceRow.id">
                <td class="px-0">{{ invoiceRow.productName }}</td>
                <td class="text-end px-0">{{ invoiceRow.taxPercent }}</td>
                <td class="text-end px-0">{{ invoiceRow.taxAmountFromPercent }}</td>
                <td class="text-end px-0">{{ invoiceRow.finalProductPrice }}</td>
              </tr>
              </tbody>
            </table>

            <div class="mt-5">
              <div class="d-flex justify-content-end">
                <p class="text-muted me-3">Subtotal:</p>
                <span>{{ invoiceData.totalPriceWithoutTax }}</span>
              </div>

              <div class="d-flex justify-content-end">
                <p class="text-muted me-3">Tax:</p>
                <span>{{ invoiceData.taxAmount }}</span>
              </div>

              <div class="d-flex justify-content-end mt-3">
                <h5 class="m<

                !---->e-3">Total:</h5>
                <h5 class="text-success">{{ invoiceData.finalTotalPrice }}</h5>
              </div>
            </div>
          </div>
          <a href="#!"
             class="btn btn-dark btn-lg card-footer-btn justify-content-center text-uppercase-bold-sm hover-lift-light">
            Pay Now
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useIdentityStore} from "@/stores/identityStore";
import {useRoute} from "vue-router";
import {onBeforeMount, ref} from "vue";
import type {IInvoice} from "@/dto/shop/IInvoice";
import InvoicesService from "@/services/shop/InvoicesService";

const identitySore = useIdentityStore();
const invoicesService = new InvoicesService();

const route = useRoute();
const invoiceData = ref<IInvoice>()

onBeforeMount(async () => {
  console.log("Open business details")
  let identity = identitySore.authenticationJwt;


  if (identity === undefined) {
    console.log("jwt is null")
    return;
  }

  if (route.params.id) {
    invoiceData.value = (await invoicesService.getInvoice(identity, route.params.id as string))
    console.log("Invoice details", invoiceData)
  } else {
    console.error("Invoice  id is not initialized")
  }

})

</script>