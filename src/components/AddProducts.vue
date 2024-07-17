<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Navigation from "/src/components/Navigation.vue";
import { useFoodStore } from '/src/stores/ProductStore.js'
import { useUserStore } from '/src/stores/UserStore.js'
import AddProducts from "/src/components/AddProducts.vue"

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
  align-items: center;
}

.progress_card {
  width: 1000em;
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

.v-expansion-panels {
  width: 50em;
}

.v-date-picker {
  max-height: 300px;
}

</style>
