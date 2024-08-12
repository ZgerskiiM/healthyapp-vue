<script setup>
import { ref,computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "/src/stores/UserStore.js";

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};

const userStore = useUserStore();
const userweight = ref("");
const username = ref("");
const usergender = ref("");
const userage = ref("");
const userheight = ref("");
const useractivity = ref("");
const showname = ref(false);
const showgender = ref(false);
const showage = ref(false);
const showweight = ref(false);
const showheight = ref(false);
const showactivity = ref(false);
const start = ref(true);
const isNameValid = computed(() => validateField(username.value, [rules.required, rules.empty]));
const isAgeValid = computed(() => validateField(userage.value, [rules.required, rules.number, rules.positive]));
const isWeightValid = computed(() => validateField(userweight.value, [rules.required, rules.number, rules.positive]));
const isHeightValid = computed(() => validateField(userheight.value, [rules.required, rules.number, rules.positive]));
const isGenderValid = computed(() => !!usergender.value);
const isActivityValid = computed(() => !!useractivity.value);

const rules = {
  required: (value) => !!value || "Обязательное поле",
  empty: (value) => value.length > 0 || "Не должно быть пустым",
  number: (value) => (!isNaN(parseFloat(value)) && isFinite(value)) || "Должно быть числом",
  positive: (value) => parseFloat(value) > 0 || "Должно быть положительным числом",
};

const validateField = (value, fieldRules) => {
  return fieldRules.every(rule => rule(value) === true);
};

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
  userStore.setUser(newUser);
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

  const ncalories = Math.round(bmr * activityMultiplier[user.activity]);
  return ncalories;
};

const handleClick = () => {
  if (isNameValid.value && isGenderValid.value && isAgeValid.value &&
      isWeightValid.value && isHeightValid.value && isActivityValid.value) {
    addUser();
    close();
  }
};
</script>

<template>
  <v-card>
    <v-card-title>
      <h1>ucalories</h1>
    </v-card-title>
    <v-card-item v-if="start">
      <h2>Привет! Для начала добавьте свои данные</h2>
      <v-card-actions>
        <v-btn
          class="mt-5"
          text="Начать"
          @click="
            showname = true;
            start = false;
          "
        />
      </v-card-actions>
    </v-card-item>
    <v-card-item v-if="showname">
      <h2>Как вас зовут?</h2>
      <v-card-actions>
        <v-text-field
          v-model="username"
          type="text"
          :rules=[rules.required]
        />
        <v-btn
          text="Продолжить"
          @click=" showgender = true; showname = false;"
          :disabled="!isNameValid"
        />
      </v-card-actions>
    </v-card-item>
    <v-card-item v-if="showgender">
      <h2>Выберите пол</h2>
      <v-card-actions>
        <v-radio-group v-model="usergender">
          <v-radio
            label="Мужской"
            value="Male"
          />
          <v-radio
            label="Женский"
            value="Female"
          />
        </v-radio-group>
        <v-btn
          text="Продолжить"
          @click="
            showage = true;
            showgender = false;
          "
          :disabled="!isGenderValid"
        />
      </v-card-actions>
    </v-card-item>
    <v-card-item v-if="showage">
      <h2>Сколько вам лет?</h2>
      <v-text-field
        v-model="userage"
        type="number"
        :rules="[rules.required, rules.positive]"
      />
      <v-card-actions>
        <v-btn
          text="Продолжить"
          @click="
            showweight = true;
            showage = false;
          "
          :disabled="!isAgeValid"
        />
      </v-card-actions>
    </v-card-item>
    <v-card-item v-if="showweight">
      <h2>Укажите ваш вес</h2>
      <v-card-actions>
        <v-text-field
          v-model="userweight"
          type="number"
          :rules="[rules.required, rules.positive]"
        />
        <v-btn
          text="Продолжить"
          @click="
            showheight = true;
            showweight = false;
          "
          :disabled="!isWeightValid"
        />
      </v-card-actions>
    </v-card-item>
    <v-card-item v-if="showheight">
      <h2>Укажите ваш рост</h2>
      <v-card-actions>
        <v-text-field
          v-model="userheight"
          type="number"
          :rules="[rules.required, rules.positive]"
        />
        <v-btn
          text="Продолжить"
          @click="
            showactivity = true;
            showheight = false;
          "
          :disabled="!isHeightValid"
        />
      </v-card-actions>
    </v-card-item>
    <v-card-item v-if="showactivity">
      <h2>Укажите ваш уровень активности</h2>
      <v-card-actions>
        <v-radio-group v-model="useractivity">
          <v-radio
            label="Минимальная активность"
            value="MinAct"
          />
          <v-radio
            label="Слабый"
            value="WeakAct"
          />
          <v-radio
            label="Умеренный"
            value="NormAct"
          />
          <v-radio
            label="Тяжелый"
            value="HardAct"
          />
          <v-radio
            label="Экстремальный"
            value="ExtrAct"
          />
        </v-radio-group>
      </v-card-actions>
      <v-btn
        text="Закончить"
        @click="handleClick"
        :disabled="!isActivityValid"
      />
    </v-card-item>
  </v-card>
</template>

<style scoped lang="scss">
* {
  color: rgb(223, 223, 223);
}

.v-card {
  background-color: rgb(82, 193, 106);
  height: 58.9em;
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
  color: black;
}

.v-card-item {
  display: flex;
  justify-content: center;
}
</style>
