<script setup>
import { ref } from 'vue';

import Navigation from '/src/components/Navigation.vue'

import {useUserStore} from '/src/stores/UserStore.js'

const UserStore = useUserStore();

const number = ref (0)

</script>

<template>
    <v-card>
        <v-card-title><h1>Статистика</h1></v-card-title>
        <v-card-item>
            <h2>Добавьте свои параметры</h2>
        </v-card-item>
        <p>Вес</p>
        <v-card-action>
            <v-btn ><v-icon>mdi-minus</v-icon></v-btn>
                <v-card-item>{{ number }}</v-card-item>
            <v-btn >
            <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-card-action>


    </v-card>
    <Navigation/>
</template>

<style scoped
lang="scss">

* {
    color: rgb(236, 236, 236);
}

.v-card {
    background-color:rgb(137, 209, 124);
    height: 50em;
    border-radius: 0;
}

.v-list {
    background-color: transparent;
    list-style: none;
}

p {
    font-size:32px;
    font-weight: 600;
}

.product-name {
    font-size:20px;
    font-weight:200;
}

.v-icon {
    color: rgb(93, 93, 93);
}

.v-btn {
    width: 100px;
}
</style>
