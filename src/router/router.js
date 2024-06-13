import { createRouter, createWebHistory } from 'vue-router';
import Main from '/src/components/Main.vue';
import Graph from '/src/components/Graph.vue';

export const router = createRouter({
    routes: [
    {path: '/', name:'Main', component: Main},
    {path: '/graph', name: 'Graph', component: Graph},
    ],
    history: createWebHistory()
});
