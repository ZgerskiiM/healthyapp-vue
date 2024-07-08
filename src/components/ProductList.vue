<script setup>
import { ref, onMounted } from 'vue';

import Navigation from './Navigation.vue';

import {useFoodStore} from '/src/stores/ProductStore.js'

const FoodStore = useFoodStore();
const items = ref([]);

onMounted(() => {
    items.value = FoodStore.food;
});

const model=ref()

const foodname = ref('');
const foodcalories = ref('');
const foodcarbs = ref('');
const foodproteins = ref('');
const foodfats = ref('');


const addFood = () => {
    if (foodname.value.length > 0) {
        const newFood = {
            name: (foodname.value) ,
            calories: (foodcalories.value + " кКал"),
            fats: (foodfats.value  + " г"),
            proteins: (foodproteins.value  + " г"),
            carbs: (foodcarbs.value + " г"),
        };
        FoodStore.addFood(newFood);
        foodname.value = '';
        foodcalories.value = '';
        foodfats.value = '';
        foodproteins.value = '';
        foodcarbs.value = '';
        console.log(FoodStore.food)
    }
};

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
            <v-container>
            </v-container>
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
    <v-card-action>
        <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="6">
        <v-dialog transition="dialog-bottom-transition" width="auto">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              text="Добавить свой продукт"
              block
            ></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card id="add-card">
                <h2>Введите название</h2>
                <v-card-actions>
                    <v-text-field v-model="foodname" label="Введите название"></v-text-field>
                    <v-text-field v-model="foodcalories" label="Количество каллорий на 100г" type="Number"></v-text-field>
                    <v-text-field v-model="foodproteins" label="Количество белка" type="Number"></v-text-field>
                    <v-text-field v-model="foodfats" label="Количество жиров" type="Number"></v-text-field>
                    <v-text-field v-model="foodcarbs" label="Количество углеводов" type="Number"></v-text-field>
                </v-card-actions>
                <v-btn class="mt-3" @click="addFood">Добавить</v-btn>
              <v-card-actions>
                <v-btn text="Close" @click="isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      </v-row>
        </v-container>
    </v-card-action>
<Navigation/>
</v-card>

</template>

<style scoped
lang="scss">

* {
    color: rgb(236, 236, 236);

}

#add-card {
    background-color: rgb(227, 139, 77);
    height: 30em;
    display: flex;
    flex-direction: column;
    width: 50em;
    justify-content: center;
}


.v-card {
    background-color:rgb(137, 209, 124);
    height: 50em;
    border-radius: 0;
    padding-left: 50px;

}

.v-list {
    background-color: transparent;
    list-style: none;
    padding-left: 75px;
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
