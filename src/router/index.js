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
import wxLogin from '../view/AdminSys/wxLogin.vue'
import LoginSucess from '../view/userview/LoginSucess.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Login },
  {
    path: '*',
    redirect: Login,
  },
  { path: '/homepage', component: Homepage ,
 // 需要登录后才能访问的页面
//  meta: { requiresAuth: true }
},
  { path: '/interview', component: Interview },
  { path: '/Applications_details', component: Applications_details },
  { path: '/Examine_page', component: Examine_page },
  { path: '/Orgnization_details', component: Orgnization_details },
  { path: '/Position_detailes', component: Position_detailes },
  { path: '/Applications', component: Applications },
  { path: '/All_positions', component: All_positions },
  { path: '/Application_list', component: Application_list },
  { path: '/Interview_list', component: Interview_list },
  { path: '/Exam_list', component: Exam_list },
  { path: '/Collection_list', component: Collection_list },
  {path:'/wxLogin',component:wxLogin},
  {path:'/LoginSucess',component:LoginSucess},
  {
    path: '/TabView',
    name: 'TabView',
    component: TabView, // 这里是核心： center作为容器组件，包含左右菜单和右侧的router-view，所以下面的子组件实际是显示在router-view
    redirect: { name: 'FirstPage' }, // 输入路由center会重定向到a页面
    children: [
      {
        path: '/FirstPage',
        name: 'FirstPage',
        component: FirstPage
      },
      {
        path: '/jobList',
        name: 'jobList',
        component: jobList
      },
      {
        path: '/jobDetails',
        name: 'jobDetails',
        component: jobDetails
      },
      {
        path: '/jobpost',
        name: 'jobpost',
        component: jobpost
      },
      {
        path: '/ailApproval',
        name: 'ailApproval',
        component: ailApproval
      },
      {
        path: '/viewList',
        name: 'viewList',
        component: viewList
      },
      {
        path: '/viewArra',
        name: 'viewArra',
        component: viewArra
      },
      {
        path: '/AssessView',
        name: 'AssessView',
        component: AssessView
      },
      {
        path: '/AssessRela',
        name: 'AssessRela',
        component: AssessRela
      },
      {
        path: '/AssessDetail',
        name: 'AssessDetail',
        component: AssessDetail
      }
    ]
  }
]

const router = new VueRouter({
  mode:"history",
  routes
})
// 导航守卫 如果没登录就访问不了其他页面
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  //如果去往登录页则放行 
    if (to.path === '/') {
      next();
    } 
    else {
      // 从本地存储里获取token
          let token = localStorage.getItem('token');
          // 判断token是否为空如果为空则跳转到登录页 如果有则放行
          if (token === null || token === '') {
            next({path:'/'});
          } else {
            next();
          }
    }
  });
export default router
