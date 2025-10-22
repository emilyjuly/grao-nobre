import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import { useAuthStore } from "@/stores/auth";
import MainLayout from "@/layouts/MainLayout.vue";
// import RegisterPage from '@/pages/RegisterPage.vue'
// import CartPage from '@/pages/CartPage.vue'
// import CheckoutPage from '@/pages/CheckoutPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "login", component: LoginPage },
        {
            path: "/home",
            component: MainLayout,
            children: [
                {
                    path: "",
                    name: "home",
                    meta: { requiresAuth: true },
                    component: HomePage,
                },
            ],
        },
    ],
});

router.beforeEach((to, _, next) => {
    const auth = useAuthStore();
    const isAuthenticated = !!auth.token;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: "login" });
    } else if (to.name === "login" && isAuthenticated) {
        next({ name: "home" });
    } else {
        next();
    }
});

export default router;
