<script setup>
import { ref, reactive } from 'vue'
import Navigation from '/src/components/Navigation.vue'

const showCalendar = ref(false);
const selectedDate = ref(new Date());
const showAddProductDialog = ref(false);
const currentMeal = ref('');

const meals = reactive({
  Breakfast: [],
  Lunch: [],
  Dinner: []
});

const initializeMealsForDate = (date) => {
  const dateString = date.toISOString().split('T')[0];
  if (!meals[dateString]) {
    meals[dateString] = {
      Breakfast: [],
      Lunch: [],
      Dinner: []
    };
  }
};

const newProduct = reactive({
  name: '',
  weight: 0
});

const addProduct = (meal) => {
  currentMeal.value = meal;
  showAddProductDialog.value = true;
  initializeMealsForDate(selectedDate.value);
};

const confirmAddProduct = () => {
  if (newProduct.name && newProduct.weight > 0) {
    const dateString = selectedDate.value.toISOString().split('T')[0];
    meals[dateString][currentMeal.value].push({ ...newProduct });
    showAddProductDialog.value = false;
    newProduct.name = '';
    newProduct.weight = 0;
  }
};

const removeProduct = (meal, index) => {
  const dateString = selectedDate.value.toISOString().split('T')[0];
  meals[dateString][meal].splice(index, 1);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

</script>

<template>
  <v-card>
    <v-card class="progress_card">
      <v-card-title><h1>Счет калорий</h1></v-card-title>
      <v-card-subtitle><h2>Считай с нами</h2></v-card-subtitle>
      <v-card-item>
        <v-progress-circular v-slot:default :size="250">Осталось</v-progress-circular>
      </v-card-item>
    </v-card>
    <v-card class="daily_eats">
      <v-card-title>
        <v-btn @click="showCalendar = !showCalendar">{{ formatDate(selectedDate) }}</v-btn>
      </v-card-title>
      <v-row v-if="showCalendar" justify="space-around">
        <v-date-picker v-model="selectedDate" show-adjacent-months></v-date-picker>
      </v-row>
      <v-card-item>
        <v-expansion-panels>
  <v-expansion-panel v-for="meal in ['Breakfast', 'Lunch', 'Dinner']" :key="meal">
    <v-expansion-panel-title>
      <v-icon>mdi-food</v-icon>
      {{ meal }}
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-list v-if="!meals[selectedDate.toISOString().split('T')[0]] || meals[selectedDate.toISOString().split('T')[0]][meal].length === 0">
        <v-list-item>Пока ничего нет</v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item v-for="(product, index) in meals[selectedDate.toISOString().split('T')[0]][meal]" :key="index">
          {{ product.name }} - {{ product.weight }}г
          <v-btn icon @click="removeProduct(meal, index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-btn @click="addProduct(meal)">Добавить</v-btn>
    </v-expansion-panel-text>
  </v-expansion-panel>
</v-expansion-panels>
      </v-card-item>
    </v-card>
    <Navigation/>
  </v-card>

  <v-dialog v-model="showAddProductDialog" max-width="500px">
    <v-card>
      <v-card-title>
        Добавить продукт в {{ currentMeal }} {{ formatDate(selectedDate) }}
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="newProduct.name" label="Название продукта"></v-text-field>
        <v-text-field v-model="newProduct.weight" label="Вес (г)" type="number"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="showAddProductDialog = false">Отмена</v-btn>
        <v-btn color="blue darken-1" text @click="confirmAddProduct">Добавить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.v-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.progress_card {
  background-color: rgb(137, 209, 124);
  width: 100%;
}

.v-list-item {
  margin: 10px;
  width: 1000px;
  display: flex;
  justify-content: flex-start;
}

.v-list-group {
  border: 1px solid rgb(118, 118, 118);
  margin: 10px;
  width: 1000px;
  display: flex;
  flex-direction: row;
  border-radius: 10em;

  .v-list-item {
    border: none;
    justify-content: flex-start;
  }
}

.daily_eats {
  width: 100%;
}

.v-expansion-panel {
    width: 100%
}

.v-expansion-panels {
    width: 100%;
}

</style>
