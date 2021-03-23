import axios from "axios"
import store from "../store"

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
    body,
    response: { status, statusText, data },
    timestamp: new Date().toLocaleTimeString(),
  })
  return message
}

function requestAndRegister(path, method, body = null) {
  return axios[method](path, body)
    .then((result) => {
      console.log(`Axios response to ${method} ${path}:`, result)
      return registerRequest(result)
    })
    .catch((error) => {
      console.log({ error })
      registerRequest(error.response)
      throw error
    })
}

export default {
  fetchUsers() {
    return requestAndRegister(
      "https://mendel-rocketpay.herokuapp.com/api/users/",
      "get",
    )
  },
  createUser(user) {
    return requestAndRegister(
      "https://mendel-rocketpay.herokuapp.com/api/users/",
      "post",
      user,
    )
  },
}
