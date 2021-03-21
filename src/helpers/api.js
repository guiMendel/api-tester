import axios from "axios"

export default {
  async fetchUsers() {
    return axios.get("https://mendel-rocketpay.herokuapp.com/api/users/")
  },
  async createUser(user) {
    return axios.post("https://mendel-rocketpay.herokuapp.com/api/users/", user)
  },
}
