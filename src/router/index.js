import { createWebHistory, createRouter } from "vue-router"
import Index from "../views/Index.vue"
import NewUser from "../views/NewUser.vue"

const routes = [
  {
    path: "/new-user",
    name: "NewUser",
    component: NewUser,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
