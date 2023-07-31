/* eslint-disable camelcase */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/Login.vue'
import Homepage from '../view/Homepage.vue'
import Interview from '../view/Interview.vue'
import Applications_details from '../view/Applications_details.vue'
import Applications from '../view/Applications.vue'
import Orgnization_details from '../view/Orgnization_details.vue'
import Position_detailes from '../view/Position_detailes.vue'
import Examine_page from '../view/Examine_page.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/homepage', component: Homepage },
  { path: '/interview', component: Interview },
  { path: '/Applications_details', component: Applications_details },
  { path: '/Examine_page', component: Examine_page },
  { path: '/Orgnization_details', component: Orgnization_details },
  { path: '/Position_detailes', component: Position_detailes },
  { path: '/Applications', component: Applications }
]

const router = new VueRouter({
  routes
})

export default router
