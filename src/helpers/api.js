import axios from "axios"
import store from "../store"

// extra argument for axios requests
const opts = {
  auth: {
    username: "pirata",
    password: "ahoy",
  },
}

/// Turns an axios response into the format to be stored as a request in vuex and stores it
function registerRequest(message) {
  const {
    config: { method, url, data: body },
    status,
    statusText,
    data,
  } = message

  store.commit("pushRequest", {
    method,
    path: url.match(/\/[^.]*$/)[0],
    body: body && JSON.parse(body),
    response: { status, statusText, data },
    timestamp: new Date().toLocaleTimeString(),
  })
  return message
}

function requestAndRegister(path, method, body = null) {
  return axios[method](path, body, opts)
    .then((result) => {
      console.log(`Axios response to ${method} ${path}:`, result)
      return registerRequest(result)
    })
    .catch((error) => {
      console.log(`Axios response to ${method} ${path}:`, error.response)
      registerRequest(error.response)
      throw error
    })
}

export default {
  fetchUsers: () =>
    requestAndRegister(
      "https://mendel-rocketpay.herokuapp.com/api/users/",
      "get",
    ),
  createUser: (user) =>
    requestAndRegister(
      "https://mendel-rocketpay.herokuapp.com/api/users/",
      "post",
      user,
    ),
  deleteUser: (userId) =>
    requestAndRegister(
      `https://mendel-rocketpay.herokuapp.com/api/users/${userId}`,
      "delete",
    ),
  accountWithdraw: (accountId, value) =>
    requestAndRegister(
      `https://mendel-rocketpay.herokuapp.com/api/accounts/${accountId}/withdraw`,
      "post",
      { value },
    ),
  accountDeposit: (accountId, value) =>
    requestAndRegister(
      `https://mendel-rocketpay.herokuapp.com/api/accounts/${accountId}/deposit`,
      "post",
      { value },
    ),
}
