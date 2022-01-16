import { createRouter, createWebHistory } from 'vue-router'
// import login from "@/views/login.vue"
import loading from "@/views/loading/index.vue"
import airVue from "@/views/air/index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "loader",
      component: loading
    }, {
      path: "/air",
      name: "air",
      component: airVue
    }
  ]
})

export default router
