import { defineStore } from 'pinia';

import jsonData from '/food_base.json';


export const useFoodStore = defineStore('food', {
    state: () => ({
        food: jsonData,
        }
    ),
    actions: {
        addFood(food) {
            this.food.push(food);
    }
}
});
