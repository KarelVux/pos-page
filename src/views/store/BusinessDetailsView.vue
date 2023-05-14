<template>
    <main class="mt-5 pt-4">
        <div v-if="businessDetails" class="container mt-5">
            <!--Grid row-->
            <div class="row">
                <!--Grid column-->
                <div class="col-md-6 mb-4">
                    <img src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
                         class="img-fluid" alt=""/>
                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-md-6 mb-4">
                    <!--Content-->
                    <div class="p-4">
                        <strong><p style="font-size: 20px;">{{ businessDetails.name }}</p></strong>

                        <div class="mb-3">
                            <span class="badge bg-info me-1">{{ businessDetails.businessCategory.title }}</span>
                        </div>


                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos atque
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

            <hr/>

            <!--Grid row-->
            <div class="row d-flex justify-content-center">
                <!--Grid column-->
                <div class="col-md-6 text-center">

                    <h4 class="my-4 h4">Additional information</h4>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus suscipit modi sapiente illo soluta
                        odit voluptates, quibusdam officia. Neque quibusdam quas a quis porro? Molestias illo neque eum
                        in laborum.</p>
                </div>
                <!--Grid column-->
            </div>
            <!--Grid row-->

            <!--Grid row-->
            <div class="row">
                <!--Grid column-->
                <div class="col-lg-4 col-md-12 mb-4">
                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/11.jpg"
                         class="img-fluid" alt=""/>
                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-lg-4 col-md-6 mb-4">
                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg"
                         class="img-fluid" alt=""/>
                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-lg-4 col-md-6 mb-4">
                    <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg"
                         class="img-fluid" alt=""/>
                </div>
                <!--Grid column-->
            </div>
            <!--Grid row-->
        </div>
        <div v-else>
            <NotFound/>
        </div>
    </main>


  <!--    <body>
      <div class="container">
          <div class="row">
              <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div class="card border-0 shadow rounded-3 my-5">
                      <div class="card-body p-4 p-sm-5">
                          <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                          <form>
                              <div class="form-floating mb-3">
                                  <input type="email" class="form-control" id="floatingInput"
                                         placeholder="name@example.com">
                                  <label for="floatingInput">Email address</label>
                              </div>
                              <div class="form-floating mb-3">
                                  <input type="password" class="form-control" id="floatingPassword"
                                         placeholder="Password">
                                  <label for="floatingPassword">Password</label>
                              </div>

                              <div class="form-check mb-3">
                                  <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">
                                  <label class="form-check-label" for="rememberPasswordCheck">
                                      Remember password
                                  </label>
                              </div>
                              <div class="d-grid">
                                  <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                      in
                                  </button>
                              </div>
                              <hr class="my-4">
                              <div class="d-grid mb-2">
                                  <button class="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                                      <i class="fab fa-google me-2"></i> Sign in with Google
                                  </button>
                              </div>
                              <div class="d-grid">
                                  <button class="btn btn-facebook btn-login text-uppercase fw-bold" type="submit">
                                      <i class="fab fa-facebook-f me-2"></i> Sign in with Facebook
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </body>
      -->
    <body>
    Business page
    </body>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from 'vue'
import {useIdentityStore} from "@/stores/identityStore";
import ShopsService from "@/services/shop/ShopsService";
import {useRoute} from "vue-router";
import type {IBusiness} from "@/dto/shop/IBusiness";
import NotFound from "@/components/NotFound.vue";
import SimpleRowValuePair from "@/components/Shops/Elements/SimpleRowValuePair.vue";

const identitySore = useIdentityStore();
const shopsService = new ShopsService();

const route = useRoute();
const businessDetails = ref<IBusiness>()

onBeforeMount(async () => {
    console.log("Open business details")
    let identity = identitySore.authenticationJwt;


    if (identity === undefined) {
        console.log("jwt is null")
        return;
    }

    if (route.params.id) {
        businessDetails.value = (await shopsService.getBusiness(identity, route.params.id as string))
        console.log("Business details", businessDetails)
    } else {
        console.error("Business id is not initialized")
    }

})
</script>

<style scoped>


</style>
