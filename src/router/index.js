import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页' }
      }
    ]
  },
  /* {
    path: '/profile',
    component: Layout,
    redirect: '/profile/consumer',
    name: 'Profile',
    meta: { title: '用户管理', icon: 'user1' },
    children: [
      /!* {
        path: 'consumer',
        name: 'ProfileConsumer',
        component: () => import('@/views/profile/consumer'),
        meta: { title: '修改个人信息' }
      },*!/
      {
        path: 'userList',
        name: 'ProfileUserList',
        component: () => import('@/views/profile/userList'),
        meta: { title: '用户信息' }
      },
      {
        path: 'pwd',
        name: 'ProfilePwd',
        component: () => import('@/views/profile/pwd'),
        meta: { title: '修改个人密码' }
      }
    ]
  },
  {
    path: '/staff',
    component: Layout,
    redirect: '/staff/maintain',
    name: 'Staff',
    meta: { title: '员工', icon: 'peoples' },
    children: [
      {
        path: 'maintain',
        name: 'StaffMaintain',
        component: () => import('@/views/staff/maintain'),
        meta: { title: '员工维护' }
      },
      {
        path: 'agent',
        name: 'StaffAgent',
        component: () => import('@/views/staff/agent'),
        meta: { title: '代理人设置' }
      },
      {
        path: 'resetPwd',
        name: 'StaffResetPwd',
        component: () => import('@/views/staff/resetPwd'),
        meta: { title: '密码重置' }
      },
      {
        path: 'dailyWork',
        name: 'StaffDailyWork',
        component: () => import('@/views/staff/dailyWork'),
        meta: { title: '日报作业' }
      },
      {
        path: 'requestForm',
        name: 'StaffRequestForm',
        component: () => import('@/views/staff/requestForm'),
        meta: { title: '需求单' }
      },
      {
        path: 'taipeiSigned',
        name: 'StaffTaipeiSigned',
        component: () => import('@/views/staff/taipeiSigned'),
        meta: { title: '台北签核' }
      },
      {
        path: 'userInforMain',
        name: 'StaffUserInforMain',
        component: () => import('@/views/staff/userInforMain'),
        meta: { title: '员工联络信息维护' }
      },
      {
        path: 'statement',
        name: 'StaffStatement',
        component: () => import('@/views/staff/statement'),
        meta: { title: '信管报表' }
      },
      {
        path: 'commonSettings',
        name: 'StaffCommonSettings',
        component: () => import('@/views/staff/commonSettings'),
        meta: { title: '常用签和设置' }
      },
      {
        path: 'leaveSystem',
        name: 'StaffLeaveSystem',
        component: () => import('@/views/staff/leaveSystem'),
        meta: { title: '请休假系统' }
      }
    ]
  },
  {
    path: '/oa',
    component: Layout,
    redirect: '/oa/idManage',
    name: 'OA',
    meta: { title: 'OA' },
    children: []
  },
  {
    path: '/client',
    component: Layout,
    redirect: '/client/index',
    name: 'Client',
    meta: { title: '客户' },
    children: []
  },
  {
    path: '/manufacturer',
    component: Layout,
    redirect: '/manufacturer/index',
    name: 'Manufacturer',
    meta: { title: '厂商' },
    children: []
  },
  {
    path: '/car',
    component: Layout,
    redirect: '/car/index',
    name: 'Car',
    meta: { title: '车辆' },
    children: []
  },*/
  {
    path: '/trial',
    component: Layout,
    redirect: '/trial/opTable',
    name: 'Trial',
    meta: { title: '试算' },
    children: [
      {
        path: 'opTable',
        name: 'TrialOpTable',
        component: () => import('@/views/trial/opTable'),
        meta: { title: '营业报表' }
      }
      /* {
        path: 'index',
        name: 'TrialIndex',
        component: () => import('@/views/trial/index'),
        meta: { title: '回租报价' }
      }*/
    ]
  },
  /* {
    path: '/contract',
    component: Layout,
    redirect: '/contract/index',
    name: 'Contract',
    meta: { title: '契约' },
    children: []
  },
  {
    path: '/insurance',
    component: Layout,
    redirect: '/insurance/index',
    name: 'Insurance',
    meta: { title: '保险' },
    children: []
  },
  {
    path: '/maintain',
    component: Layout,
    redirect: '/maintain/index',
    name: 'Maintain',
    meta: { title: '维修' },
    children: []
  },
  {
    path: '/upLicense',
    component: Layout,
    redirect: '/upLicense/index',
    name: 'UpLicense',
    meta: { title: '上牌管理' },
    children: []
  },
  {
    path: '/insurances',
    component: Layout,
    redirect: '/insurances/index',
    name: 'Insurances',
    meta: { title: '保险管理' },
    children: []
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    name: 'Account',
    meta: { title: '应收' },
    children: []
  },
  {
    path: '/rentOut',
    component: Layout,
    redirect: '/rentOut/index',
    name: 'RentOut',
    meta: { title: '出租资产' },
    children: []
  },
  {
    path: '/credit',
    component: Layout,
    redirect: '/credit/index',
    name: 'Credit',
    meta: { title: '授信系统' },
    children: []
  },
  {
    path: '/shortRent',
    component: Layout,
    redirect: '/shortRent/index',
    name: 'ShortRent',
    meta: { title: '短租附驾' },
    children: []
  },
  {
    path: '/carInsurance',
    component: Layout,
    redirect: '/carInsurance/index',
    name: 'CarInsurance',
    meta: { title: '车险' },
    children: []
  },
  {
    path: '/collect',
    component: Layout,
    redirect: '/collect/index',
    name: 'Collect',
    meta: { title: '催收系统' },
    children: []
  },
  {
    path: '/control',
    component: Layout,
    redirect: '/control/index',
    name: 'Control',
    meta: { title: '调度中心' },
    children: []
  },
  {
    path: '/servicePro',
    component: Layout,
    redirect: '/servicePro/index',
    name: 'ServicePro',
    meta: { title: '服务派工' },
    children: []
  },
  {
    path: '/businessCar',
    component: Layout,
    redirect: '/businessCar/index',
    name: 'BusinessCar',
    meta: { title: '业务用车' },
    children: []
  },
  {
    path: '/cashOut',
    component: Layout,
    redirect: '/cashOut/index',
    name: 'CashOut',
    meta: { title: '请款' },
    children: []
  },
  {
    path: '/breakOff',
    component: Layout,
    redirect: '/breakOff/index',
    name: 'BreakOff',
    meta: { title: '解约' },
    children: []
  },*/
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
