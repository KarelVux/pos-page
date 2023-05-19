<template>
  Invoice order
</template>



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