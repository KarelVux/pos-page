<script setup lang="ts">
import {RouterView} from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import FooterBar from "@/components/FooterBar.vue";
import {useMessageStore} from "@/stores/messageStore";
import {onMounted} from "vue";
import MessagePopup from "@/components/shared/MessagePopup.vue";

const messageStore = useMessageStore();

import { ref, computed } from 'vue';

// Compute a reactive variable to determine if the popup should be shown
const showPopup = computed(() => {
    return messageStore.messageExsists();
});


onMounted(() => {

})
</script>

<template>
    <NavBar/>
    <body>
    <MessagePopup v-if="showPopup"/>
    <div class="container">
        <main role="main" class="pb-3">
            <router-view></router-view>
        </main>
    </div>
    </body>
    <FooterBar/>
</template>
<style scoped></style>
