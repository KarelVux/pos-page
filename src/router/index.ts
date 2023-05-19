import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BusinessView from "@/views/store/BusinessView.vue";
import BusinessDetailsView from "@/views/store/BusinessDetailsView.vue";
import InvoiceDetailsView from "@/views/store/InvoiceDetailsView.vue";
import InvoiceOrderView from "@/views/store/InvoiceOrderView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/store/business',
            name: 'business',
            component: BusinessView
        },
        {
            path: '/store/businessDetails/:id',
            name: 'businessDetails',
            component: BusinessDetailsView,
            props: true
        },
        {
            path: '/store/invoiceDetails/:id',
            name: 'invoiceDetails',
            component: InvoiceDetailsView,
            props: true
        }
        ,
        {
            path: '/store/invoiceOrder/:id',
            name: 'invoiceOrder',
            component: InvoiceOrderView,
            props: true
        }
    ]
})

export default router
