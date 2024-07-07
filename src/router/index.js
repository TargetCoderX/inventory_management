import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Dashboard from '@/views/dashboard/dashboard.vue'
import Categories from '@/views/categories_and_tags/Categories.vue'
import Cookies from 'js-cookie'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { stopVisitOnAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { protected: true }
    },
    {
      path: '/categories-and-tags',
      name: 'categories_and_tags',
      component: Categories,
      meta: { protected: true }
    },
  ]
})

router.beforeEach((to, form, next) => {
  if (to.meta.protected && !to.meta.stopVisitOnAuth) {
    /* checking the token */
    if (Cookies.get("token"))
      next()
    else
      next("/login")
  } else if (!to.meta.protected && to.meta.stopVisitOnAuth) {
    if (Cookies.get("token"))
      router.go(-1);
    else
      next()
  } else {
    next()
  }
})

export default router
