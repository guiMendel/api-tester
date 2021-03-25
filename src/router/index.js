import { createWebHistory, createRouter } from "vue-router"
import NewUser from "../views/NewUser.vue"
import MainHeader from "../views/MainHeader.vue"
import APILog from "../views/APILog.vue"
import APIRequest from "../views/APIRequest.vue"

const routes = [
  {
    path: "/new-user",
    name: "NewUser",
    component: NewUser,
  },
  {
    path: "/api-log",
    name: "APILog",
    component: APILog,
  },
  {
    path: "/api-log/:index",
    name: "APIRequest",
    component: APIRequest,
  },
  {
    path: "/",
    name: "Index",
    component: MainHeader,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
