/* eslint-disable camelcase */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/AdminSys/Login.vue'
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
import LoginSucess from '../view/AdminSys/LoginSucess.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    name:'Login',
    path:'/Login',
    component: () => import('../view/AdminSys/Login.vue')
  },
  // { path: '/', name:'Login',component: ()=>import('../view/userview/Login.vue') },
  // {
  //   path: '*',
  //   redirect: Login,
  // },
  {path:'/wxLogin',component:wxLogin},
  {path:'/LoginSucess',name:'LoginSucess',component: ()=>import('../view/AdminSys/LoginSucess.vue') },
  {
    path: '/TabView',
    name: 'TabView',
    component: ()=>import('../view/AdminSys/TabView.vue') , // 这里是核心： center作为容器组件，包含左右菜单和右侧的router-view，所以下面的子组件实际是显示在router-view
    redirect: { name: 'FirstPage' }, // 输入路由center会重定向到a页面
    children: [
      {
        name: 'FirstPage',
        path: '/admin/FirstPage',
        component:  ()=>import('../view/AdminSys/FirstPage.vue')
      },
      {
        name: 'jobList',
        path: '/admin/jobList',
        component: ()=>import('../view/AdminSys/jobList.vue')
      },
      {
        name: 'jobDetails',
        path: '/admin/jobDetails',
        component: ()=>import('../view/AdminSys/jobDetails.vue')
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
  routes
})
// 导航守卫 如果没登录就访问不了其他页面
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  //如果去往登录页则放行 
    if (to.path === '/login') {
      next();
    } 
    else if(to.path === '/LoginSucess'){
      next();
    }
    else {
      // 从本地存储里获取token
          let token = localStorage.getItem('token');
          // 判断token是否为空如果为空则跳转到登录页 如果有则放行
          if (token === null || token === '') {
            next({path:'/login'});
          } else {
            next();
          }
    }
  });
export default router
