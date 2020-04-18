/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Authenticated from '@/views/Authenticated.vue'
import LayoutWithToolbar from '@/views/LayoutWithToolbar.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    component: Authenticated,
    children: [
      {
        path: '/',
        component: LayoutWithToolbar,
        children: [
          {
            path: '/orders',
            name: 'orders',
            component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue'),
            children: [
              {
                path: ':id/preview',
                name: 'preview-order',
                component: () => import(/* webpackChunkName: "preview-order" */ '../views/PreviewOrder.vue'),
              },
            ],
          },
          {
            path: '/orders/new',
            name: 'create-order',
            component: () => import(/* webpackChunkName: "create-order" */ '../views/CreateOrder.vue'),
          },
          {
            path: '/orders/edit/:id',
            name: 'edit-order',
            component: () => import(/* webpackChunkName: "edit-order" */ '../views/CreateOrder.vue'),
          },
        ],
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
