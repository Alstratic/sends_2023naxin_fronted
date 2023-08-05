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
  { path: '/login', component: Login },
  { path: '/homepage', component: Homepage },
  { path: '/interview', component: Interview },
  { path: '/Applications_details', component: Applications_details },
  { path: '/Examine_page', component: Examine_page },
  { path: '/Orgnization_details', component: Orgnization_details },
  { path: '/Position_detailes', component: Position_detailes },
  { path: '/Applications', component: Applications },
  { path: '/All_positions', component: All_positions },
  {
    path: '/TabView',
    name: 'TabView',
    component: TabView, //这里是核心： center作为容器组件，包含左右菜单和右侧的router-view，所以下面的子组件实际是显示在router-view
     redirect: {name: "FirstPage"},   //输入路由center会重定向到a页面
    children:
      [
        {
          path: "/FirstPage",
          name: "FirstPage",
          component: FirstPage
        },
        {
          path: "/jobList",
          name: "jobList",
          component: jobList
        },
        {
          path: "/jobDetails",
          name: "jobDetails",
          component: jobDetails
        },
        {
          path: "/jobpost",
          name: "jobpost",
          component: jobpost
        },
        {
          path: "/ailApproval",
          name: "ailApproval",
          component: ailApproval
        },
        {
          path: "/viewList",
          name: "viewList",
          component: viewList
        },
        {
          path: "/viewArra",
          name: "viewArra",
          component: viewArra
        },
        {
          path: "/AssessView",
          name: "AssessView",
          component: AssessView
        },
        {
          path: "/AssessRela",
          name: "AssessRela",
          component: AssessRela
        },
        {
          path: "/AssessDetail",
          name: "AssessDetail",
          component: AssessDetail
        },
      ]
  }

]

const router = new VueRouter({
  routes
})

export default router
