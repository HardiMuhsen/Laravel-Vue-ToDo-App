import { createApp } from "vue";
import { createPinia } from "pinia";
import route from "./router";
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);
app.use(createPinia());
app.use(route);
app.mount("#app");
