<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useFoodStore } from '/src/stores/ProductStore.js';
import { useUserStore } from '/src/stores/UserStore.js';
import { useCaloriesStore } from '/src/stores/DailyNutritionStore.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const FoodStore = useFoodStore();
const UserStore = useUserStore();
const dailyNutrition = useCaloriesStore();

const startDate = ref(new Date().toISOString().split('T')[0]);
const endDate = ref(new Date().toISOString().split('T')[0]);
const chartData = ref({
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: []
  }]
});

const dailyCalorieGoal = computed(() => {
  const user = UserStore.getUser;
  return user ? user.ucalories : 2500;
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

function updateChart() {
  const dates = [];
  const calories = [];
  const colors = [];

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  let currentDate = new Date(start);

  while (currentDate <= end) {
    const dateString = currentDate.toISOString().split('T')[0];
    dates.push(dateString);
    const caloriesForDay = calculateCaloriesForDate(dateString);
    calories.push(caloriesForDay);
    colors.push(caloriesForDay >= dailyCalorieGoal.value ? '#ea5545' : '#87bc45');

    currentDate.setDate(currentDate.getDate() + 1);
  }

  chartData.value = {
    labels: dates,
    datasets: [{
      data: calories,
      backgroundColor: colors
    }]
  };
}

function calculateCaloriesForDate(dateString) {
  const meals = JSON.parse(localStorage.getItem('meals')) || {};
  if (!meals[dateString]) return 0;
  return dailyNutrition.getDailyCalories(meals, new Date(dateString), FoodStore.food);
}

onMounted(() => {
  updateChart();
});

watch([startDate, endDate], updateChart);

// User data editing logic
const isEditModalOpen = ref(false);
const editedUser = ref({ ...UserStore.getUser });

function openEditModal() {
  editedUser.value = { ...UserStore.getUser };
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
}

function saveUserData() {
  UserStore.updateUser(editedUser.value);
  isEditModalOpen.value = false;
}
</script>

<template>
  <v-container>
    <h1>Статистика</h1>
    <v-list>
      <p>{{ UserStore.getUser.uname }}</p>
      <p>Возраст {{ UserStore.getUser.age }}</p>
      <p>Рост {{ UserStore.getUser.height }}</p>
      <p>Вес {{ UserStore.getUser.weight }}</p>
      <v-btn @click="openEditModal">Редактировать</v-btn>
    </v-list>
    <v-card
      min-width="300px"
      max-width="1050px"
      class="mx-auto text-center mt-5 pl-2 pr-2"
      elevation="4"
      style="background-color:rgb(228,228,228);"
    >
      <div class="date-picker-container">
        <v-text-field
          v-model="startDate"
          label="Начальная дата"
          type="date"
          @change="updateChart"
        ></v-text-field>
        <v-text-field
          v-model="endDate"
          label="Конечная дата"
          type="date"
          @change="updateChart"
        ></v-text-field>
      </div>
      <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </v-card>

    <v-dialog v-model="isEditModalOpen" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Редактировать данные</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="editedUser.uname"
              label="Имя"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.age"
              label="Возраст"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.height"
              label="Рост"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.weight"
              label="Вес"
              type="number"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditModal">Отмена</v-btn>
          <v-btn color="blue darken-1" text @click="saveUserData">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<style scoped>
.v-card {
  display: flex;
  flex-direction: column;
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
</style>
