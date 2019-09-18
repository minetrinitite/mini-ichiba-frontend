import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

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
          path: '/cart',
          name: 'Cart',
          component: () => import ("./views/Cart.vue"),
        },
        {
          path: '/checkout',
          name: 'Checkout',
          component: () => import("./views/Checkout.vue"),
        },
        {
          path: '/checkoutfailure',
          name: 'Checkout Failure',
          component: () => import("./views/CheckoutFailure.vue")
        },
        {
          path: '/item',
          name: 'Item',
          component: () => import("./views/ItemDescription.vue"),
          props: function (route) {
            var founditem = store.state.items.find(function (entry) {
              return entry.id === route.query.id;
            });
            return { item: founditem };
          }
        },
        {
          path: '/user',
          name: 'UserInfo',
          component: () => import("./views/UserInfo.vue"),
        },
        {
          path: '/orders',
          name: 'Orders',
          component: () => import("./views/Orders.vue"),
        },
        {
          path: '/signin',
          name: 'Sign In',
          component: () => import("./views/SignIn.vue"),
        },
        {
          path: '/signup',
          name: 'Sign Up',
          component: () => import("./views/SignUp.vue"),
        },
        {
          path: '/passwordrecovery',
          name: 'Password Recovery',
          component: () => import("./views/PasswordRecovery.vue")
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
