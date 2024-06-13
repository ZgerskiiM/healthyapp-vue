<script setup>
import {ref, reactive} from 'vue'
import Navigation from '/src/components/Navigation.vue'


</script>

<template>
<v-card class="progress_card">
    <v-card-title><p>Cчет каллорий</p></v-card-title>
    <v-card-subtitle><p>Cчитай с нами</p></v-card-subtitle>
    <v-card-item>
        <v-progress-circular
        v-slot:default
        :size="250">Осталось</v-progress-circular>
    </v-card-item>
</v-card>
<v-card class="daily_eats">
    <v-card-title>
        <v-btn>Сегодня</v-btn>
    </v-card-title>
    <v-row justify="space-around">
    <v-date-picker show-adjacent-months></v-date-picker>
    </v-row>
    <v-card-item>
        <v-list>
            <v-list-item> <!--сделать group для раскрытия списка продуктов
            и кнопку добавить для добавления продуктов из БД и их удаление из дня-->
                Завтрак
                <!--название, масса, привязка ко дню (фильтр продуктов)-->
            </v-list-item>
            <v-list-item>
                Обед
            </v-list-item>
            <v-list-item>
                Ужин
            </v-list-item>
        </v-list>
    </v-card-item>
</v-card>
<Navigation/>
</template>

<style scoped lang="scss">
    .v-card {
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items:center;
    }

.progress_card {
    background-color: orange;
}

.v-list-item {
    border: 2px solid black;
    border-radius: 10em;
    margin: 10px;
    width: 1000px;
    display:flex;
    justify-content: flex-start;
}

.daily_eats {

}
</style>
