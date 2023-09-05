/* eslint-disable camelcase */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../view/userview/Homepage.vue'
import Interview from '../view/userview/Interview.vue'
import Applications_details from '../view/userview/Applications_details.vue'
import Applications from '../view/userview/Applications.vue'
import Orgnization_details from '../view/userview/Orgnization_details.vue'
import Position_detailes from '../view/userview/Position_detailes.vue'
import Examine_page from '../view/userview/Examine_page.vue'
import All_positions from '../view/userview/All_Positions.vue'
import Application_list from '../view/userview/Application_list.vue'
import Interview_list from '@/view/userview/Interview_list.vue'
import Exam_list from '@/view/userview/Exam_list.vue'
import Collection_list from '@/view/userview/Collection_list.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user/homepage',
    component: Homepage
    // 需要登录后才能访问的页面
    //  meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/Login'
  },
  {
    name: 'Login',
    path: '/Login',
    component: () => import('../view/userview/Login.vue')
  },
  { path: '/user/interview', component: Interview, name: 'Interview' },
  { path: '/user/Applications_details', component: Applications_details },
  { path: '/user/Examine_page', component: Examine_page, name: 'Examine_page' },
  { path: '/user/Orgnization_details', component: Orgnization_details },
  {
    path: '/user/Position_detailes/:id',
    component: Position_detailes,
    name: 'Position_detailes'
  },
  { path: '/user/Applications', component: Applications, name: 'Applications' },
  { path: '/user/All_positions', component: All_positions },
  { path: '/user/Application_list', component: Application_list },
  { path: '/user/Interview_list', component: Interview_list },
  { path: '/user/Exam_list', component: Exam_list },
  { path: '/user/Collection_list', component: Collection_list },
  {
    path: '/LoginSucess',
    name: 'LoginSucess',
    component: () => import('../view/userview/LoginSucess.vue')
  }
]

const router = new VueRouter({
  routes
})
// 导航守卫 如果没登录就访问不了其他页面
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  // 如果去往登录页则放行
  if (to.path === '/login') {
    next()
  } else if (to.path === '/LoginSucess') {
    next()
  } else {
    // 从本地存储里获取token
    const token = localStorage.getItem('HQU_naxin')
    // 判断token是否为空如果为空则跳转到登录页 如果有则放行
    if (token === null || token === '') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})
export default router
