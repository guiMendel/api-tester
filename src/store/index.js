import { createStore } from "vuex"
import axios from "axios"

const store = createStore({
  state: () => ({
    users: [],
    // Format:
    /* {
      method: String,
      path: String,
      body: Object,
      response: { status: Number, statusText: String, data: Object },
      timestamp: String, 
    } */
    requests: [],
  }),
  mutations: {
    setUsers: (state, new_list) => (state.users = new_list),
    pushUser: (state, user) => state.users.push(user),
    pushRequest: (state, request) => state.requests.unshift(request),
  },
})

export default store
