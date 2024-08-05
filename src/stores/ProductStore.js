import { defineStore } from "pinia";
import jsonData from "/food_base.json";
 
export const useFoodStore = defineStore("food", {
  state: () => ({
    food: JSON.parse(localStorage.getItem("food")) || jsonData,
  }),
  actions: {
    addFood(food) {
      this.food.push(food);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("food", JSON.stringify(this.food));
    },
    loadFromLocalStorage() {
      const storedFood = localStorage.getItem("food");
      if (storedFood) {
        this.food = JSON.parse(storedFood);
      }
    },
  },
});
