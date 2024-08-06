<script setup>
import {
  ref,
  onMounted,
  computed,
  watch
} from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";
import { useFoodStore } from "/src/stores/ProductStore.js";
import { useUserStore } from "/src/stores/UserStore.js";
import { useCaloriesStore } from "/src/stores/DailyNutritionStore.js";
import Navigation from "./Navigation.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const foodStore = useFoodStore();
const userStore = useUserStore();
const dailyNutrition = useCaloriesStore();
const startDate = ref(new Date().toISOString().split("T")[0]);
const endDate = ref(new Date().toISOString().split("T")[0]);
const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
});

const dailyCalorieGoal = computed(() => {
  const user = userStore.getUser;
  return user ? user.ucalories : 2500;
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function updateChart() {
  const dates = [];
  const calories = [];
  const colors = [];
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  let currentDate = new Date(start);

  while (currentDate <= end) {
    const dateString = currentDate.toISOString().split("T")[0];
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    const previousDateString = previousDate.toISOString().split("T")[0];
    dates.push(dateString);
    const caloriesForDay = calculateCaloriesForDate(previousDateString);
    calories.push(caloriesForDay);
    colors.push(caloriesForDay >= dailyCalorieGoal.value ? "#ea5545" : "#87bc45");
    currentDate.setDate(currentDate.getDate() + 1);
  }

  chartData.value = {
    labels: dates,
    datasets: [
      {
        label: "Каллории",
        data: calories,
        backgroundColor: colors,
      },
    ],
  };
}

function calculateCaloriesForDate(dateString) {
  const meals = JSON.parse(localStorage.getItem("meals")) || {};
  if (!meals[dateString]) return 0;
  console.log(meals)
  return dailyNutrition.getDailyCalories(meals, new Date(dateString), foodStore.food);
}

onMounted(() => {
  updateChart();
});

watch([startDate, endDate], updateChart);
</script>

<template>
  <v-container>
    <h1>Статистика</h1>
    <v-list>
      <p>{{ userStore.getUser.uname }}</p>
      <p>Возраст {{ userStore.getUser.age }}</p>
      <p>Рост {{ userStore.getUser.height }}</p>
      <p>Вес {{ userStore.getUser.weight }}</p>
    </v-list>
    <v-card
      class="mx-auto text-center mt-5 pl-2 pr-2"
      min-width="300px"
      max-width="1050px"
      elevation="4"
    >
      <div class="date-picker-container">
        <v-text-field
          v-model="startDate"
          label="Начальная дата"
          type="date"
          @change="updateChart"
        />
        <v-text-field
          v-model="endDate"
          label="Конечная дата"
          type="date"
          @change="updateChart"
        />
      </div>
      <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </v-card>
  </v-container>
  <Navigation />
</template>

<style scoped>
.v-card {
  display: flex;
  flex-direction: column;
  background-color: rgb(228, 228, 228);
}

.date-picker-container {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.v-text-field {
  max-width: 200px;
}

.chart-container {
  height: 400px;
  position: relative;
}

.v-list {
  background: transparent;
}

.v-btn {
  font-size: 12px;
}
</style>
