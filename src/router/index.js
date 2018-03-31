import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: false },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  {// 商家首页
    path: '/seller',
    component: Layout,
    redirect: '/seller/index',
    name: 'Seller',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/seller-page/index'),
      meta: { title: '商家首页', icon: 'example' }
    }]
  },

  {// 订单统计
    path: '/order',
    component: Layout,
    hidden: true,
    meta: { title: '商家首页', icon: 'example' },
    children: [{
      path: 'list',
      name: 'OrderList',
      component: () => import('@/views/seller-page/views/seller-order'),
      meta: { title: '订单统计', icon: 'example' }
    }]
  },

  {// 收入统计
    path: '/income',
    component: Layout,
    hidden: true,
    meta: { title: '商家首页', icon: 'example' },
    children: [{
      path: 'chart',
      name: 'IncomeChart',
      component: () => import('@/views/seller-page/views/seller-income'),
      meta: { title: '收入统计', icon: 'example' }
    }]
  },

  {// 快捷菜单
    path: '/menu',
    component: Layout,
    hidden: true,
    meta: { title: '商家首页', icon: 'example' },
    children: [{
      path: 'list',
      name: 'MenuList',
      component: () => import('@/views/seller-page/views/seller-menu'),
      meta: { title: '快捷菜单', icon: 'example' }
    }]
  },

  {// 会员管理
    path: '/member',
    component: Layout,
    children: [{
      path: 'management',
      name: 'MemberManagement',
      component: () => import('@/views/member-management/index'),
      meta: { title: '会员管理', icon: 'example' }
    }]
  },

  { // 订单管理
    path: '/order',
    component: Layout,
    redirect: '/order/acception',
    name: 'Order',
    meta: { title: '订单管理', icon: 'example' },
    children: [{// 接单
      path: 'acception',
      name: 'Acception',
      component: () => import('@/views/order-management/views/order-acception'),
      meta: { title: '接单', icon: 'example' }
    }, {// 预定单
      path: 'reservation',
      name: 'Reservation',
      component: () => import('@/views/order-management/views/order-reservation'),
      meta: { title: '预订单', icon: 'example' }
    }, {// 催单
      path: 'reminder',
      name: 'Reminder',
      component: () => import('@/views/order-management/views/order-reminder'),
      meta: { title: '催单', icon: 'example' }
    }, {// 退单
      path: 'retreat',
      name: 'Retreat',
      component: () => import('@/views/order-management/views/order-retreat'),
      meta: { title: '退单', icon: 'example' }
    }, {// 历史订单
      path: 'records',
      name: 'Records',
      component: () => import('@/views/order-management/views/order-records'),
      meta: { title: '历史订单', icon: 'example' }
    }]
  },

  {// 商品管理
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    name: 'Goods',
    meta: { title: '商品管理', icon: 'example' },
    children: [{
      path: 'list',
      name: 'GoodsList',
      component: () => import('@/views/goods-management/views/goods-list'),
      meta: { title: '商品列表', icon: 'example' }
    }, {
      path: 'upload',
      name: 'GoodsUpload',
      component: () => import('@/views/goods-management/views/goods-upload'),
      meta: { title: '商品上传', icon: 'example' }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

