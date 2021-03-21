import { createStore } from "vuex"
import axios from "axios"

const store = createStore({
  state: () => ({
    users: [],
    loading: true,
  }),
  mutations: {
    setUsers: (state, new_list) => (state.users = new_list),
    pushUser: (state, user) => state.users.push(user),
  },
  actions: {
    addUser: ({ commit }, user) => commit("pushUser", user),
  },
})

export default store
