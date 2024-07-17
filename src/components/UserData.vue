<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "/src/stores/UserStore.js";

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
  const newUser = {
    id: uuidv4(),
    uname: username.value,
    gender: usergender.value,
    weight: parseFloat(userweight.value),
    height: parseInt(userheight.value),
    age: parseInt(userage.value),
    activity: useractivity.value,
    ucalories: calculateCalories({
      gender: usergender.value,
      weight: parseFloat(userweight.value),
      height: parseInt(userheight.value),
      age: parseInt(userage.value),
      activity: useractivity.value,
    }),
  };
  UserStore.setUser(newUser);
  resetForm();
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

  const ncalories = Math.round(bmr * activityMultiplier[user.activity])
  return ncalories;
};
</script>

<template>
  <v-card>
    <v-card-title>
      <h1>ucalories</h1>
    </v-card-title>
    <v-card-item v-if="start">
      <h2>Привет! Для начала добавьте свои данные</h2>
      <v-card-action>
        <v-btn
          class="mt-5"
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
      <v-text-field v-model="userage" type="number"></v-text-field>
      <v-card-action>
        <v-btn
          @click="showweight = true; showage = false;"
        >Продолжить</v-btn>
      </v-card-action>
    </v-card-item>
    <v-card-item v-if="showweight">
      <h2>Укажите ваш вес</h2>
      <v-card-action>
        <v-text-field v-model="userweight" type="number"></v-text-field>
        <v-btn
          @click="showheight = true; showweight = false;"
          >Продолжить</v-btn>
      </v-card-action>
    </v-card-item>
    <v-card-item v-if="showheight">
      <h2>Укажите ваш рост</h2>
      <v-card-action>
        <v-text-field v-model="userheight" type="number"></v-text-field>
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
      <v-btn @click="addUser" >Закончить</v-btn>
      <v-btn
        @click="
          showname = true;
          showactivity = false;
        "
        >Начать заново</v-btn
      >
    </v-card-item>
    <v-card-item v-for="user in UserStore.user" :key="user.id"> {{ user.uname }}, ваша суточная норма калорий равна {{ calculateCalories(user) }} </v-card-item>
  </v-card>
</template>

<style scoped lang="scss">
* {
  color: rgb(236, 236, 236);
}

.v-card {
  background-color: rgb(137, 209, 124);
  height: 50em;
  border-radius: 0;
}

.v-list {
  background-color: transparent;
  list-style: none;
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
  width: 10em;

}

.v-card-item {
  display: flex;
  justify-content: center;
}
</style>
