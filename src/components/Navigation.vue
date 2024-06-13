<script setup>
import { useRouter} from 'vue-router'

const router = useRouter();


    const toogle = (pageName) => {
        router.push({name: pageName})
        console.log("1")
    }
</script>

<template>
<v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      color="primary"
      active>

      <v-btn @click="router.push({ name: 'Graph' })">
        <v-icon>mdi-thermostat-box</v-icon>

        Статистика
      </v-btn >

      <v-btn  @click="router.push({ name: 'Main' })">
        <v-icon>mdi-home-heart</v-icon>

        Главная
      </v-btn>

      <v-btn>
        <v-icon>mdi-book-heart</v-icon>

        <span>Справочник</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>

  </template>
