/* eslint-disable camelcase */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/userview/Login.vue'
import Homepage from '../view/userview/Homepage.vue'
import Interview from '../view/userview/Interview.vue'
import Applications_details from '../view/userview/Applications_details.vue'
import Applications from '../view/userview/Applications.vue'
import Orgnization_details from '../view/userview/Orgnization_details.vue'
import Position_detailes from '../view/userview/Position_detailes.vue'
import Examine_page from '../view/userview/Examine_page.vue'
import All_positions from '../view/userview/All_Positions.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/homepage', component: Homepage },
  { path: '/interview', component: Interview },
  { path: '/Applications_details', component: Applications_details },
  { path: '/Examine_page', component: Examine_page },
  { path: '/Orgnization_details', component: Orgnization_details },
  { path: '/Position_detailes', component: Position_detailes },
  { path: '/Applications', component: Applications },
  { path: '/All_positions', component: All_positions }
]

const router = new VueRouter({
  routes
})

export default router
