import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TicketView from "@/views/TicketView.vue";
import AdminView from "@/views/AdminView.vue";
import AdminLogin from "@/views/AdminLogin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    { path: "/tickets/:id", name: "TicketView", component: TicketView },
    {
      path: "/admin",
      name: "Admin",
      component: AdminView,
      meta: { requiresAuth: true },
    },
    { path: "/admin-login", name: "AdminLogin", component: AdminLogin },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("adminToken");

  if (to.meta.requiresAuth && !token) {
    return next({ name: "AdminLogin" });
  }

  next();
});

export default router;
