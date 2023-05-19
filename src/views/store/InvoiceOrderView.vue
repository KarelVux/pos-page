<template>
  <!-- Steps form -->
  <div class="card">
    <div class="card-body mb-4">

      <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar bg-success" style="width: 25%"></div>
      </div>



      <h2 class="text-center font-weight-bold pt-4 pb-5"><strong>Steps form example</strong></h2>

      <p>
        <strong>
          Detailed documentation and more examples you can find in our
        </strong>
      </p>





    </div>
  </div>
  <!-- Steps form --></template>



<script lang="ts" setup>
import {useIdentityStore} from "@/stores/identityStore";
import {useRoute, RouterLink} from "vue-router";
import {onBeforeMount, ref} from "vue";
import InvoicesService from "@/services/shop/InvoicesService";

const identitySore = useIdentityStore();
const invoicesService = new InvoicesService();
const props = defineProps({
  id: String,
})

const route = useRoute();

onBeforeMount(async () => {
  let identity = identitySore.authenticationJwt;

  console.log("Invoice details id is recieved",props.id )
  if (identity === undefined) {
    console.log("jwt is null")
    return;
  }

  if (route.params.id) {
   // invoiceData.value = (await invoicesService.getInvoice(identity, route.params.id as string))
   // console.log("Invoice details", invoiceData)
  } else {
    console.error("Invoice  id is not initialized")
  }

})

</script>