import { createRouter, createWebHistory } from 'vue-router';
import Main from '/src/components/Main.vue';
import Graph from '/src/components/Graph.vue';
import ProductList from '/src/components/ProductList.vue'

export const router = createRouter({
    routes: [
    {path: '/', name:'Main', component: Main},
    {path: '/graph', name: 'Graph', component: Graph},
    {path: '/list', name: 'List', component: ProductList}
    ],
    history: createWebHistory()
});
