<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Navigation from "/src/components/Navigation.vue";
import { useFoodStore } from '/src/stores/ProductStore.js'
import { useUserStore } from '/src/stores/UserStore.js'

const showCalendar = ref(false);
const selectedDate = ref(new Date());
const showAddProductDialog = ref(false);
const currentMeal = ref("");
const FoodStore = useFoodStore();
const items = ref([]);
const UserStore = useUserStore();

const updateDailyCalories = (newCalories) => {
  UserStore.updateCalories(newCalories);
};

console.log (UserStore.currentUser)

onMounted(() => {
  items.value = FoodStore.food;
  loadMealsFromLocalStorage();
});

const meals = reactive({
  Breakfast: [],
  Lunch: [],
  Dinner: [],
});

const initializeMealsForDate = (date) => {
  const dateString = date.toISOString().split("T")[0];
  if (!meals[dateString]) {
    meals[dateString] = {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
    };
    saveMealsToLocalStorage();
  }
};


const dailyCalorieGoal = computed(() => {
  const user = UserStore.getUser;
  return user ? user.ucalories : 2500;
});

const caloriePercentage = computed(() => {
  const percentage = (totalCalories.value / dailyCalorieGoal.value) * 100;
  return Math.min(100, Math.max(0, Math.round(percentage)));
});


const newProduct = reactive({
  name: "",
  weight: 0,
  calories: 0,
});

const addProduct = (meal) => {
  currentMeal.value = meal;
  showAddProductDialog.value = true;
  initializeMealsForDate(selectedDate.value);
};

const confirmAddProduct = () => {
  if (newProduct.name && newProduct.weight > 0) {
    const dateString = selectedDate.value.toISOString().split("T")[0];
    meals[dateString][currentMeal.value].push({ ...newProduct });
    showAddProductDialog.value = false;
    newProduct.name = "";
    newProduct.weight = 0;
    newProduct.calories = 0;
    saveMealsToLocalStorage();
  }
};

const totalCalories = computed(() => {
  const dateString = selectedDate.value.toISOString().split("T")[0];
  if (!meals[dateString]) return 0;

  return ['Breakfast', 'Lunch', 'Dinner'].reduce((total, meal) => {
    return total + meals[dateString][meal].reduce((mealTotal, product) => {
      const item = items.value.find(i => i.name === product.name);
      if (item) {
        return mealTotal + parseInt((parseInt(item.calories) / 100) * parseInt(product.weight));
      }
      return mealTotal;
    }, 0);
  }, 0);
});

const removeProduct = (meal, index) => {
  const dateString = selectedDate.value.toISOString().split("T")[0];
  meals[dateString][meal].splice(index, 1);
  saveMealsToLocalStorage();
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ru-RU", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

const saveMealsToLocalStorage = () => {
  localStorage.setItem('meals', JSON.stringify(meals));
};

const loadMealsFromLocalStorage = () => {
  const savedMeals = localStorage.getItem('meals');
  if (savedMeals) {
    Object.assign(meals, JSON.parse(savedMeals));
  }
};


</script>

<template>
  <v-container class="progress_card">
    <v-card-title>
      <h1>Счет калорий</h1>
    </v-card-title>
    <v-card-subtitle>
    </v-card-subtitle>
    <v-card-item>
      <v-progress-circular
  :size="200"
  :width="15"
  :model-value="(totalCalories / dailyCalorieGoal) * 100"
  color="white"
>
  Осталось {{ Math.max(0, dailyCalorieGoal - totalCalories) }} кКал
</v-progress-circular>
    </v-card-item>
    {{ totalCalories }} кКал
  </v-container>
  <v-container>
    <v-btn @click="showCalendar = !showCalendar">{{ formatDate(selectedDate) }}</v-btn>
  </v-container>
  <v-row v-if="showCalendar" justify="space-around">
    <v-date-picker v-model="selectedDate" show-adjacent-months></v-date-picker>
  </v-row>
  <v-card-item>
    <v-expansion-panels>
      <v-expansion-panel v-for="meal in ['Breakfast', 'Lunch', 'Dinner']" :key="meal" class="mt-2" rounded="shaped">
        <v-expansion-panel-title>
          <v-icon>mdi-food-variant</v-icon>
          {{ meal }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list
            v-if="!meals[selectedDate.toISOString().split('T')[0]] || meals[selectedDate.toISOString().split('T')[0]][meal].length === 0">
            <v-list-item>Пока ничего нет</v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item v-for="(product, index) in meals[selectedDate.toISOString().split('T')[0]][meal]" :key="index">
              {{ product.name }} - {{ product.weight }} г
              <div v-for="item in items">
                <li v-if="item.name === product.name">
                  <p class="product-name">{{ parseInt((parseInt(item.calories) / 100) * parseInt(product.weight)) }}
                    кКал
                  </p>
                  <p class="product-name">Белков {{ parseInt((parseInt(item.proteins) / 100) * parseInt(product.weight))
                    }} г
                  </p>
                  <p class="product-name">Жиров {{ parseInt((parseInt(item.fats) / 100) * parseInt(product.weight)) }} г
                  </p>
                  <p class="product-name">Углеводов {{ parseInt((parseInt(item.carbs) / 100) * parseInt(product.weight))
                    }} г
                  </p>
                </li>
              </div>
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
  <Navigation />

  <v-dialog v-model="showAddProductDialog" max-width="520px">
    <v-card>
      <v-card-title> {{ currentMeal }} </v-card-title>
      <v-card-text>
        <v-container id="id">
          <v-autocomplete v-model="newProduct.name" :items="items.map(item => item.name)" :title="calories"
            item-text="item.name" item-value="item.name" label="Какой продукт вы хотите найти?" auto-select-first
            width="110%">
          </v-autocomplete>
        </v-container>
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
.v-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(41, 178, 147);
}

.progress_card {
  background: linear-gradient(0deg, rgb(41, 178, 147) 6%, rgb(0, 201, 112) 57%);
  width: 100%;
  font-weight: 100;
  color: rgb(224, 224, 224);
}

.v-list-item {
  margin: 10px;
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

h1 {
  font-weight: 200;
  font-size: 40px;
}

#id {
  background: none;
}
</style>
