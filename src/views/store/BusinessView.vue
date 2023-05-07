<template>
    <div class="col-lg-9">
        <div class="row justify-content-center mb-3">
            <div class="col-md-12">
                <div class="card shadow-0 border rounded-3">
                    <div class="card-body">
                        <div class="row g-0">
                            <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                                <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                    <img src="../../assets/image-not-found.png"
                                         class="w-100" alt="">
                                </div>
                            </div>
                            <div class="col-xl-6 col-md-5 col-sm-7">
                                <h5>Rucksack Backpack Jeans</h5>
                                <div class="d-flex flex-row">
                                    <div class="text-warning mb-1 me-2">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                        <span class="ms-1">
                          4.5
                        </span>
                                    </div>
                                    <span class="text-muted">154 orders</span>
                                </div>

                                <p class="text mb-4 mb-md-0">
                                    Short description about the product goes here, for ex its features. Lorem ipsum
                                    dolor sit amet with hapti you enter into any new area of science, you almost lorem
                                    ipsum is great text
                                    consectetur adipisicing
                                </p>
                            </div>
                            <div class="col-xl-3 col-md-3 col-sm-5">
                                <div class="d-flex flex-row align-items-center mb-1">
                                    <h4 class="mb-1 me-1">$34,50</h4>
                                    <span class="text-danger"><s>$49.99</s></span>
                                </div>
                                <h6 class="text-success">Free shipping</h6>
                                <div class="mt-4">
                                    <button class="btn btn-primary shadow-0" type="button">Buy this</button>
                                    <a href="#!" class="btn btn-light border px-2 pt-2 icon-hover"><i
                                            class="fas fa-heart fa-lg px-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useIdentityStore} from "@/stores/identityStore";

//const identitySore = useIdentityStore();
//const settlementService = new SettlementsService();

onMounted(async () => {
    console.log("Open business details")
    //  let identity = identitySore.$state.authenticationJwt;
    //  let settlements = (await settlementService.getAll())
})

/*
const filteredBusinesses = computed(() => {
    let businessesFiltered = businesses.value.filter((business) => {
        return (
            business.name.toLowerCase().includes(search.value.toLowerCase()) &&
            (selectedCategory.value === '' ||
                business.categories.includes(selectedCategory.value))
        );
    });

    if (selectedSort.value === 'nameAsc') {
        businessesFiltered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort.value === 'nameDesc') {
        businessesFiltered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedSort.value === 'categoryAsc') {
        businessesFiltered.sort((a, b) =>
            a.categories.join(', ').localeCompare(b.categories.join(', '))
        );
    } else if (selectedSort.value === 'categoryDesc') {
        businessesFiltered.sort((a, b) =>
            b.categories.join(', ').localeCompare(a.categories.join(', '))
        );
    }
    return businessesFiltered;
});

*/
</script>