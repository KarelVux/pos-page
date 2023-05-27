<template>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">WebApp</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/Home/Privacy">Privacy</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav" v-if="identitySore.authenticationJwt == undefined || showLogin">
                        <li class="nav-item">
                            <RegisterForm @update:value="handleLoginDisplay"/>
                        </li>
                        <li class="nav-item">
                            <LoginForm @update:value="handleLoginDisplay"/>
                        </li>
                    </ul>
                    <ul class="navbar-nav" v-else>
                        <li class="nav-link text-dark ">
                            <RouterLink :to="{name:'userBusinesses'}"
                                        class="text-dark custom-mouse-over remove-link-design">User businesses
                            </RouterLink>                        </li>
                        <li class="nav-link text-dark ">
                            <RouterLink :to="{name:'invoiceHistories'}"
                                        class="text-dark custom-mouse-over remove-link-design">Invoice Histories
                            </RouterLink>
                        </li>

                        <li class="nav-link text-dark ">
                            <span class="text-dark custom-mouse-over" @click="doLogout">Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>


<script lang="ts" setup>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

import {useIdentityStore} from "@/stores/identityStore";
import {onMounted, ref} from "vue";
import {RouterLink, useRouter} from "vue-router";
import {IdentityService} from "@/services/identity/IdentityService";

const identitySore = useIdentityStore();
const router = useRouter()

// Must be initialized otherwise login/logout will fail
const showLogin = ref(true)
const handleLoginDisplay = (newValue: boolean) => {
    showLogin.value = newValue;
};

const identityService = new IdentityService();


const doLogout = async () => {
    let auth = identitySore.authenticationJwt
    await identityService.logout(auth!)
    showLogin.value = true;
    await router.push({name: 'home'})

}
</script>

<style scoped>
.custom-mouse-over {
    cursor: pointer;
}

.remove-link-design {
    text-decoration: none;
}
</style>