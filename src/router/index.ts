import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/arclight",
      name: "arclight",
      component: () => import("../views/ArclightView.vue"),
    },
    {
      path: "/downloads",
      name: "downloads",
      component: () => import("../views/DownloadsView.vue"),
    },
    {
      path: "/docs",
      name: "docs",
      component: () => import("../views/DocsView.vue"),
    }
  ],
});

export default router;
