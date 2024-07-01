<script setup>
import {ref, reactive} from 'vue'

import Navigation from '/src/components/Navigation.vue'

const showCalendaer = ref(false);

const date = new Date();
const options = { weekday: 'long' };
const dayOfWeek = date.toLocaleString('ru', options);
var now = new Date().toLocaleDateString();

const breakfastList = {
    title:"food",
    icon: "mdi-food",
}

</script>

<template>
<v-card>
<v-card class="progress_card">
    <v-card-title><h1>Cчет каллорий</h1></v-card-title>
    <v-card-subtitle><h2>Cчитай с нами</h2></v-card-subtitle>
    <v-card-item>
        <v-progress-circular
        v-slot:default
        :size="250">Осталось</v-progress-circular>
    </v-card-item>
</v-card>
<v-card  class="daily_eats">
    <v-card-title>
        <v-btn @click="showCalendaer = !showCalendaer">{{ dayOfWeek }}, {{ now }}</v-btn>
    </v-card-title>
    <v-row v-if="(showCalendaer)" justify="space-around">
    <v-date-picker show-adjacent-months ></v-date-picker>
    </v-row>
    <v-card-item>
        <v-list v-model:opened="open">
            <!--сделать group для раскрытия списка продуктов
            и кнопку добавить для добавления продуктов из БД и их удаление из дня-->
                <v-list-group value="Breakfast" >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon="mdi-food"
                            title="Завтрак">
                        </v-list-item>
                    </template>
                    <v-list-group value="breakfast">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" title="food"></v-list-item>
                    </template>
                    <v-list-item
                        v-for="([title, icon], i) in breakfastList"
                        :key="i"
                        :prepend-icon="icon"
                        :title="title"
                        :value="title">
                    </v-list-item>
                    </v-list-group>
                    <v-btn>Добавить</v-btn>
                </v-list-group>
                <v-list-group value="Lunch" >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon="mdi-food"
                            title="Обед">
                        </v-list-item>
                    </template>
                </v-list-group>
                <v-list-group value="Dinner" >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon="mdi-food"
                            title="Ужин">
                        </v-list-item>
                    </template>
                </v-list-group>
        </v-list>
    </v-card-item>
</v-card>
<Navigation/>
</v-card>
</template>

<style scoped lang="scss">
    .v-card {
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items:center;
    }

.progress_card {
    background-color:rgb(137, 209, 124);
    width:100%;
}

.v-list-item {
    margin: 10px;
    width: 1000px;
    display:flex;
    justify-content: flex-start;
}

.v-list-group {
    border: 1px solid rgb(118, 118, 118);
    margin: 10px;
    width: 1000px;
    display:flex;
    flex-direction: row;
    border-radius: 10em;

    .v-list-item{
        border:none;
        justify-content: flex-start;
    }
}


.daily_eats {
    width:100%;
}
</style>
