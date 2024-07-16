<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import Navigation from "/src/components/Navigation.vue";
import { useUserStore } from "/src/stores/UserStore.js";
import { useRouter } from 'vue-router'

const router = useRouter();
const UserStore = useUserStore();
const userweight = ref(0);
const username = ref("");
const usergender = ref("");
const userage = ref(0);
const userheight = ref(0);
const useractivity = ref("");
const showname = ref(false);
const showgender = ref(false);
const showage = ref(false);
const showweight = ref(false);
const showheight = ref(false);
const showactivity = ref(false);
const start = ref(true);
const visited = ref(false);

const increment = (ref) => ref.value++;
const decrement = (ref) => ref.value--;

const addUser = () => {
  const activityMultiplier = {
    MinAct: 1.2,
    WeakAct: 1.375,
    NormAct: 1.55,
    HardAct: 1.725,
    ExtrAct: 1.9,
  };

  const newUser = {
    id: uuidv4(),
    uname: username.value,
    gender: usergender.value,
    weight: parseFloat(userweight.value),
    height: parseInt(userheight.value),
    age: parseInt(userage.value),
    activity: useractivity.value,
    visited: !visited
  };

  UserStore.addUser(newUser);
  resetForm();
  console.log(UserStore.user)
};

const resetForm = () => {
  userweight.value = 0;
  username.value = "";
  userage.value = 0;
  userheight.value = 0;
  useractivity.value = "";
  usergender.value = "";
};

const calculateCalories = (user) => {
  const activityMultiplier = {
    MinAct: 1.2,
    WeakAct: 1.375,
    NormAct: 1.55,
    HardAct: 1.725,
    ExtrAct: 1.9,
  };

  let bmr;
  if (user.gender === "Male") {
    bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
  } else {
    bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
  }

  return Math.round(bmr * activityMultiplier[user.activity]);
};
</script>

<template>
<v-card-item v-if="start">
    <h2>Добавьте свои параметры</h2>
    <v-card-action>
      <v-btn
        @click="
          showname = true;
          start = false;
        "
        >Начать</v-btn
      >
    </v-card-action>
  </v-card-item>
  <v-card-item v-if="showname">
    <h2>Как вас зовут?</h2>
    <v-card-action>
      <v-text-field v-model="username" type="text"></v-text-field>
      <v-btn
        @click="
          showgender = true;
          showname = false;
        "
        >Продолжить</v-btn
      >
    </v-card-action>
  </v-card-item>
  <v-card-item v-if="showgender">
    <h2>Выберите пол</h2>
    <v-card-action>
      <v-radio-group v-model="usergender">
        <v-radio label="Мужской" value="Male"></v-radio>
        <v-radio label="Женский" value="Female"></v-radio>
      </v-radio-group>
      <v-btn
        @click="
          showage = true;
          showgender = false;
        "
        >Продолжить</v-btn
      >
    </v-card-action>
  </v-card-item>
  <v-card-item v-if="showage">
    <h2>Сколько вам лет?</h2>
    <v-btn @click="decrement(userage)"><v-icon>mdi-minus</v-icon></v-btn>
    <v-text-field v-model="userage" type="number"></v-text-field>
    <v-btn @click="increment(userage)"><v-icon>mdi-plus</v-icon></v-btn>
    <v-card-action>
      <v-btn
        @click="
          showweight = true;
          showage = false;
        "
        >Продолжить</v-btn
      >
    </v-card-action>
  </v-card-item>
  <v-card-item v-if="showweight">
    <h2>Укажите ваш вес</h2>
    <v-card-action>
      <v-btn @click="decrement(userweight)"><v-icon>mdi-minus</v-icon></v-btn>
      <v-text-field v-model="userweight" type="number"></v-text-field>
      <v-btn @click="increment(userweight)"><v-icon>mdi-plus</v-icon></v-btn>
      <v-btn
        @click="
          showheight = true;
          showweight = false;
        "
        >Продолжить</v-btn
      >
    </v-card-action>
  </v-card-item>
  <v-card-item v-if="showheight">
    <h2>Укажите ваш рост</h2>
    <v-card-action>
      <v-btn @click="decrement(userheight)"><v-icon>mdi-minus</v-icon></v-btn>
      <v-text-field v-model="userheight" type="number"></v-text-field>
      <v-btn @click="increment(userheight)"><v-icon>mdi-plus</v-icon></v-btn>
      <v-btn
        @click="
          showactivity = true;
          showheight = false;
        "
        >Продолжить</v-btn
      >
    </v-card-action>
  </v-card-item>
  <v-card-item v-if="showactivity">
    <h2>Укажите ваш уровень активности</h2>
    <v-card-action>
      <v-radio-group v-model="useractivity">
        <v-radio label="Минимальная активность" value="MinAct"></v-radio>
        <v-radio label="Слабый" value="WeakAct"></v-radio>
        <v-radio label="Умеренный" value="NormAct"></v-radio>
        <v-radio label="Тяжелый" value="HardAct"></v-radio>
        <v-radio label="Экстремальный" value="ExtrAct"></v-radio>
      </v-radio-group>
    </v-card-action>
    <v-btn @click="addUser;
    router.push({ name: 'Main' })">Закончить</v-btn>
    <v-btn
      @click="
        showname = true;
        showactivity = false;
      "
      >Начать заново</v-btn
    >
  </v-card-item>
</template>
