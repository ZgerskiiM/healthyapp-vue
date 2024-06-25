<script setup>
import { ref, onMounted } from 'vue';

import Navigation from './Navigation.vue';
import jsonData from '/food_base.json';

const selectedItem = ref(null);
const items = ref([]);

onMounted(() => {
    items.value = jsonData;
});

const model=ref()

</script>

<template>
<v-card>
    <v-card-title>
        <h1>Справочник</h1>
    </v-card-title>
    <v-card-item>
        <v-container>
            <v-autocomplete
            v-model = "model"
            :items="items.map(item => item.name)"
            :title ="calories"
            item-text="item.name"
            item-value="item.name"
            label="Какой продукт вы хотите найти?"

            auto-select-first
            ></v-autocomplete>
        </v-container>
        <v-list v-if="model">
            <v-list-item >
                <p>Название</p>
                <p class="product-name">{{ model }}</p>
                <p>Каллории</p>
                <template v-for="item in items">
                    <li v-if="item.name === model">
                        <p class="product-name">{{ item.calories}}</p>
                    </li>
                </template>
                <p>Белки</p>
                <template v-for="item in items">
                    <li v-if="item.name === model">
                        <p class="product-name">{{ item.proteins }}</p>
                    </li>
                </template>
                <p>Жиры</p>
                <template v-for="item in items">
                    <li v-if="item.name === model">
                        <p class="product-name">{{ item.fats }}</p>
                    </li>
                </template>
                <p>Углеводы</p>
                <template v-for="item in items">
                    <li v-if="item.name === model">
                        <p class="product-name">{{ item.carbs }}</p>
                    </li>
                </template>
            </v-list-item>
        </v-list>
    </v-card-item>
<Navigation/>
</v-card>

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
</style>
