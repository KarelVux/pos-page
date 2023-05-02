<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="search" label="Search"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="selectedCategory" :items="categories" label="Category"></v-select>
                </v-col>   <v-col cols="12" md="3">
                    <v-select v-model="selectedCategory" :items="categories" label="Category"></v-select>
                </v-col>

            </v-row>
            <v-row>
                <v-col v-for="(business, index) in businesses" :key="index" cols="12" sm="6" md="4" lg="3">
                    <v-card>
                        <v-img :src="business.image" aspect-ratio="1.5"></v-img>
                        <v-card-title>{{ business.name }}</v-card-title>
                        <v-card-subtitle>{{ business.categories.join(', ') }}</v-card-subtitle>
                        <v-card-text>{{ business.description }}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script setup>
import {ref} from "vue";

const search = ref('');
const selectedCategory = ref('');
const selectedSort = ref('');
const businesses = ref([
    {
        image: 'https://via.placeholder.com/300',
        name: 'Business 1',
        description: 'Description for Business 1',
        categories: ['Category 1', 'Category 2'],
    },
    {
        image: 'https://via.placeholder.com/300',
        name: 'Business 2',
        description: 'Description for Business 2',
        categories: ['Category 2', 'Category 3'],
    },
    {
        image: 'https://via.placeholder.com/300',
        name: 'Business 3',
        description: 'Description for Business 3',
        categories: ['Category 1', 'Category 3'],
    },
]);
const categories = ref(['Category 1', 'Category 2', 'Category 3']);
const sortOptions = ref([
    {text: 'Name (A-Z)', value: 'nameAsc'},
    {text: 'Name (Z-A)', value: 'nameDesc'},
    {text: 'Category (A-Z)', value: 'categoryAsc'},
    {text: 'Category (Z-A)', value: 'categoryDesc'},
]);


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