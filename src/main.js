import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
// notifications
import Toaster from "@meforma/vue-toaster"
import "./index.css"
import "./generic-classes.css"

const notificationConfig = {
  position: "top",
}

createApp(App)
  .use(router)
  .use(Toaster, notificationConfig)
  .mount("#app")
