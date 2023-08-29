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

import TabView from '../view/AdminSys/TabView.vue'
import jobList from '../view/AdminSys/jobList.vue'
import jobDetails from '../view/AdminSys/jobDetails.vue'
import ailApproval from '../view/AdminSys/ailApproval.vue'
import jobpost from '../view/AdminSys/jobpost.vue'
import FirstPage from '../view/AdminSys/FirstPage.vue'
import viewArra from '../view/AdminSys/viewArra.vue'
import viewList from '../view/AdminSys/viewList.vue'
import AssessView from '../view/AdminSys/AssessView.vue'
import AssessRela from '../view/AdminSys/AssessRela.vue'
import AssessDetail from '../view/AdminSys/AssessDetail.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Homepage },
  {
    path: '/user/homepage', component: Homepage
    // 需要登录后才能访问的页面
    //  meta: { requiresAuth: true }
  },
  { path: '/user/interview', component: Interview, name: 'Interview' },
  { path: '/user/Applications_details', component: Applications_details },
  { path: '/user/Examine_page', component: Examine_page },
  { path: '/user/Orgnization_details', component: Orgnization_details },
  { path: '/user/Position_detailes/:id', component: Position_detailes, name: 'Position_detailes' },
  { path: '/user/Applications', component: Applications, name: 'Applications' },
  { path: '/user/All_positions', component: All_positions },
  { path: '/user/Application_list', component: Application_list },
  { path: '/user/Interview_list', component: Interview_list },
  { path: '/user/Exam_list', component: Exam_list },
  { path: '/user/Collection_list', component: Collection_list },
  {
    path: '/admin/TabView',
    name: 'TabView',
    component: TabView, // 这里是核心： center作为容器组件，包含左右菜单和右侧的router-view，所以下面的子组件实际是显示在router-view
    redirect: { name: 'FirstPage' }, // 输入路由center会重定向到a页面
    children: [
      {
        path: '/admin/FirstPage',
        name: 'FirstPage',
        component: FirstPage
      },
      {
        path: '/admin/jobList',
        name: 'jobList',
        component: jobList
      },
      {
        path: '/admin/jobDetails',
        name: 'jobDetails',
        component: jobDetails
      },
      {
        path: '/admin/jobpost',
        name: 'jobpost',
        component: jobpost
      },
      {
        path: '/admin/ailApproval',
        name: 'ailApproval',
        component: ailApproval
      },
      {
        path: '/admin/viewList',
        name: 'viewList',
        component: viewList
      },
      {
        path: '/admin/viewArra',
        name: 'viewArra',
        component: viewArra
      },
      {
        path: '/admin/AssessView',
        name: 'AssessView',
        component: AssessView
      },
      {
        path: '/admin/AssessRela',
        name: 'AssessRela',
        component: AssessRela
      },
      {
        path: '/admin/AssessDetail',
        name: 'AssessDetail',
        component: AssessDetail
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
// 导航守卫 如果没登录就访问不了其他页面
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  // 如果去往登录页则放行
  if (to.path === '/') {
    next()
  } else {
    // 从本地存储里获取token
    const token = localStorage.getItem('HQU_naxin')
    // 判断token是否为空如果为空则跳转到登录页 如果有则放行
    if (token === null || token === '') {
      next({ path: '/' })
    } else {
      next()
    }
  }
})
export default router
