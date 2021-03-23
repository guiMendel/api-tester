import { createStore } from "vuex"
import axios from "axios"

const store = createStore({
  state: () => ({
    users: [],
    requests: []
  }),
  mutations: {
    setUsers: (state, new_list) => (state.users = new_list),
    pushUser: (state, user) => state.users.push(user),
    pushRequest: (state, request) => state.requests.push(request),
  },
})

export default store
