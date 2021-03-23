import { createApp } from "vue"
import App from "./App.vue"

// vuex
import store from "./store"

// roteamento
import router from "./router"

// notifications
import Toaster from "@meforma/vue-toaster"

// css
import "./index.css"
import "./generic-classes.css"

const notificationConfig = {
  position: "bottom",
}

createApp(App)
  .use(router)
  .use(store)
  .use(Toaster, notificationConfig)
  .mount("#app")
