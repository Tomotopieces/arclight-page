import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/downloads",
      name: "downloads",
      component: () => import("../views/downloads/DownloadsView.vue"),
    },
    {
      path: "/downloads/arclight",
      name: "arclight",
      component: () => import("../views/downloads/ArclightView.vue"),
    },
  ],
});

export default router;
