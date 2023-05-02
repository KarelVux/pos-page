<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <v-app id="inspire">
<!--        <NavBar />-->
        <RouterView />
    </v-app>
</template>

<style scoped></style>
