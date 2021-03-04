import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./index.css"
import "./generic-classes.css"

createApp(App).use(router).mount("#app")
