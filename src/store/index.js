import { createStore } from "vuex"

function pushUser(state, user) {
  state.users[user.id] = user
}

const store = createStore({
  state: () => ({
    // Format:
    /* {
      account: { balance: String, id: String },
      age: Number,
      email: String,
      id: String,
      name: String,
      nickname: String
    } */
    users: {},
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
    setUsers: (state, new_list) =>
      new_list.map((user) => pushUser(state, user)),
    pushUser,
    removeUser: (state, userId) => delete state.users[userId],
    pushRequest: (state, request) => state.requests.unshift(request),
  },
  getters: {
    getUser: (state) => (id) => state.users[id],
  },
})

export default store
