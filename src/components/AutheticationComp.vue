<template>
  <!-- Button trigger modal -->
    <li  class="nav-link text-dark " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <span class="text-dark custom-mouse-over">Login</span>
    </li>

  <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Login</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" >
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" >
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Log in</button>
                </div>
            </div>
        </div>
    </div>


<!--
    <div id="content" class="flex">
        <div class="">
            <div class="page-content page-container" id="page-content">
                <div class="padding">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    <strong>Login to your account</strong>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group">
                                            <label class="text-muted" for="exampleInputEmail1">Email address</label>
                                            <input type="email" class="form-control"
                                                   id="exampleInputEmail1" aria-describedby="emailHelp"
                                                   placeholder="Enter email">
                                            <small id="emailHelp" class="form-text text-muted">
                                                We don't share email with anyone
                                            </small>
                                        </div>
                                        <div class="form-group">
                                            <label class="text-muted" for="exampleInputPassword1">
                                                Password
                                            </label>
                                            <input type="password" class="form-control" id="exampleInputPassword1"
                                                   placeholder="Password">
                                            <small id="passwordHelp" class="form-text text-muted">
                                                your password is saved in encrypted form
                                            </small>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input">
                                                <label class="form-check-label">
                                                    Check me out
                                                </label>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
-->
</template>


<script setup lang="ts">

import {IdentityService} from "@/services/identity/IdentityService";

const identityService = new IdentityService();

</script>
<style scoped>body {
    background-color: #f9f9fa;
}


.flex {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto
}

@media (max-width: 991.98px) {
    .padding {
        padding: 1.5rem
    }
}

@media (max-width: 767.98px) {
    .padding {
        padding: 1rem
    }
}

.padding {
    padding: 5rem
}


.card {
    background: #fff;
    border-width: 0;
    border-radius: .25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
    margin-bottom: 1.5rem
}


.card-header {
    background-color: transparent;
    border-color: rgba(160, 175, 185, .15);
    background-clip: padding-box
}

.card-body p:last-child {
    margin-bottom: 0
}

.card-hide-body .card-body {
    display: none
}

.form-check-input.is-invalid ~ .form-check-label,
.was-validated .form-check-input:invalid ~ .form-check-label {
    color: #f54394
}


.custom-mouse-over{
    cursor: pointer;
}
</style>