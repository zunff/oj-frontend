import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("setLoading", true);
  next();
});

router.afterEach((to, from) => {
  store.dispatch("setLoading", false);
});

export default router;
