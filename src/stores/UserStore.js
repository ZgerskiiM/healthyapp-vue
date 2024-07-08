import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: [],
        }
    ),
    actions: {
        addUser(user) {
            this.user.push(user);
    },
    getPerson(id) {
        return this.people.find(people => people.id === id);
    },
    PersonName (name) {
        return this.people.find(people => people.name === name)
    },
    getPerson(id) {
        return this.people.find(people => people.id === id);
    },
    PersonName (firstname) {
        return this.people.find(people => people.firstname === firstname)
    },
    getPerson(id) {
        return this.people.find(people => people.id === id);
    },
    PersonName (firstname) {
        return this.people.find(people => people.firstname === firstname)
    }
}
});
