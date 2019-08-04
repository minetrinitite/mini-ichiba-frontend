import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DefaultView from "@/views/DefaultView.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "DefaultView" */ "./views/DefaultView.vue"),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import("./views/Home.vue"),
        },
        {
          path: '/about',
          name: 'About',
          component: () => import(/* webpackChunkName: "About" */ './views/About.vue')
        }
      ]
    },

  ]
})
