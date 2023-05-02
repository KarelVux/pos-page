<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import FooterBar from "@/components/FooterBar.vue";
</script>

<template>
    <v-app id="inspire">
        <NavBar/>
        <RouterView/>
        <FooterBar/>
    </v-app>
</template>

<style scoped></style>
