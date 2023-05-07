<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import FooterBar from "@/components/FooterBar.vue";
</script>

<template>
        <NavBar/>
        <body>
        <div class="container">
            <main role="main" class="pb-3">
                <router-view></router-view>
            </main>
        </div>

        </body>
        <FooterBar/>
</template>

<style scoped></style>
