import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: ()=>import(/* webpackChunkName: "home" */ '../views/HomeView.vue' )
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {name: 'home'}
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
