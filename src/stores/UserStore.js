import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  }),
  actions: {
    setUser(user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
    updateCalories(calories) {
      if (this.currentUser) {
        this.currentUser.ucalories = calories;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
    },
    updateUser(updatedUser) {
      if (this.currentUser) {
        this.currentUser = { ...this.currentUser, ...updatedUser };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
    },
  },
  getters: {
    getUser: (state) => state.currentUser,
  },
});
