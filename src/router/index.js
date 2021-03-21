import { createWebHistory, createRouter } from "vue-router"
import NewUser from "../views/NewUser.vue"
import APILog from "../views/APILog.vue"

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
  // {
  //   path: "/",
  //   name: "Index",
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
