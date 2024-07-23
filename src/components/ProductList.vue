<script setup>
import { ref, onMounted } from "vue";
import Navigation from "./Navigation.vue";
import { useFoodStore } from "/src/stores/ProductStore.js";

const model = ref();
const FoodStore = useFoodStore();
const items = ref([]);
const foodname = ref("");
const foodcalories = ref("");
const foodcarbs = ref("");
const foodproteins = ref("");
const foodfats = ref("");

onMounted(() => {
  items.value = FoodStore.food;
  FoodStore.loadFromLocalStorage();
});

const addFood = () => {
  if (foodname.value.length > 0) {
    const newFood = {
      name: foodname.value,
      calories: foodcalories.value + " кКал",
      fats: foodfats.value + " г",
      proteins: foodproteins.value + " г",
      carbs: foodcarbs.value + " г",
    };
    FoodStore.addFood(newFood);
    foodname.value = "";
    foodcalories.value = "";
    foodfats.value = "";
    foodproteins.value = "";
    foodcarbs.value = "";
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
          v-model="model"
          :items="items.map((item) => item.name)"
          :title="calories"
          item-text="item.name"
          item-value="item.name"
          label="Какой продукт вы хотите найти?"
          auto-select-first
        ></v-autocomplete>
      </v-container>
      <v-list v-if="model">
        <v-list-item>
          <p>Название</p>
          <p class="product-name">{{ model }}</p>
          <p>Каллории</p>
          <template v-for="item in items">
            <li v-if="item.name === model">
              <p class="product-name">{{ item.calories }}</p>
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
                  block></v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card id="add-card">
                  <h2>Введите название</h2>
                  <v-card-actions class="d-flex flex-column">
                    <v-text-field
                      v-model="foodname"
                      label="Введите название"
                    ></v-text-field>
                    <v-text-field
                      v-model="foodcalories"
                      label="Количество каллорий на 100г"
                      type="Number"
                    ></v-text-field>
                    <v-text-field
                      v-model="foodproteins"
                      label="Количество белка"
                      type="Number"
                    ></v-text-field>
                    <v-text-field
                      v-model="foodfats"
                      label="Количество жиров"
                      type="Number"
                    ></v-text-field>
                    <v-text-field
                      v-model="foodcarbs"
                      label="Количество углеводов"
                      type="Number"
                    ></v-text-field>
                  </v-card-actions>
                  <v-card-actions>
                    <v-btn
                      text="Закрыть"
                      @click="isActive.value = false"></v-btn>
                    <v-btn
                      text="Добавить"
                      @click="addFood"></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-card-action>
    <Navigation />
  </v-card>
</template>

<style scoped lang="scss">
* {
  color: white;
}

#add-card {
  background-color: rgb(248, 248, 248);
  height: 40em;
  display: flex;
  flex-direction: column;
  width: 40em;
  justify-content: center;
  color: black;
  .v-text-field {
    color: black;
    width: 30em;
    font-size: 1em;
  }
  .v-btn {
    width: 10em;
  }
}

h2 {
  color: black;
}

h1 {
  font-weight: 200;
  font-size: 40px;
}

.v-card {
  background-color: rgb(41, 178, 71);
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
  font-size: 32px;
  font-weight: 600;
}

.product-name {
  font-size: 20px;
  font-weight: 200;
}

.v-btn {
  color: black;
}
</style>
