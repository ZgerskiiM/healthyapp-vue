<script setup>
import { ref } from "vue";
import Navigation from "/src/components/Navigation.vue";
import { useUserStore } from "/src/stores/UserStore.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserStore = useUserStore();

const name1 = ref(UserStore.getUser.uname);

const data = {
  labels: [],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

</script>

<template>
  <h1>Статистика</h1>
  <v-container >
    <v-list>
      <p>{{ UserStore.getUser.uname }}</p>
      <p>Возраст  {{ UserStore.getUser.age }}</p>
      <p>Рост  {{ UserStore.getUser.height }}</p>
      <p>Вес  {{ UserStore.getUser.weight }}</p>
      <v-btn @click="UserStore.getUser.uname='tytyty'">Редактировать</v-btn>
      <v-btn @click="UserStore.getUser.weight='50'">Редактировать</v-btn>

    </v-list>
  </v-container>
  <Navigation/>
</template>

<style scoped lang="scss">
.v-container {
  display: flex;
  flex-direction: column;
}

.v-card {
  background-color: rgb(137, 209, 124);
  height: 50em;
  border-radius: 0;
}

.v-list {
  background-color: transparent;
  list-style: none;
  font-size:20px;
  display: flex;
  flex-direction: column;
}

p {
  font-size: 32px;
  font-weight: 600;
}

.product-name {
  font-size: 20px;
  font-weight: 200;
}

.v-icon {
  color: rgb(93, 93, 93);
}

.v-btn {
  width: 20em;
}

* {
  color: white;
}
</style>
