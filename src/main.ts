import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "element-plus/theme-chalk/dark/css-vars.css";
import "@/assets/styles/main.css";
import "@/assets/styles/dark.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
