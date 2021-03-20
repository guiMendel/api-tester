import { createStore } from "vuex"
import axios from "axios"

const store = createStore({
  state: () => ({
    users: [],
  }),
  mutations: {
    setUsers: (state, new_list) => (state.users = new_list),
    pushUser: (state, user) => state.users.push(user),
  },
  actions: {
    loadUsers({ commit }) {
      axios
        .get("https://mendel-rocketpay.herokuapp.com/api/users/")
        .then(({ data }) => commit("setUsers", data))
        .catch(console.error)
    },
    addUser: ({ commit }, user) => commit("pushUser", user),
  },
})

export default store
