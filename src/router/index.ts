import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/questions/:topic",
      name: "questions",
      component: () => import("@/views/QuestionsView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: " notfound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
