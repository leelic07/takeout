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
    redirect: '/login',
    name: 'Login',
    hidden: true,
    children: [{
      path: 'login',
      component: () => import('@/views/login/index')
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
    children: [{// 商品列表
      path: 'list',
      name: 'GoodsList',
      component: () => import('@/views/goods-management/views/goods-list'),
      meta: { title: '商品列表', icon: 'example' }
    }, {// 商品上传
      path: 'upload',
      name: 'GoodsUpload',
      component: () => import('@/views/goods-management/views/goods-upload'),
      meta: { title: '商品上传', icon: 'example' }
    }, {// 商品分类
      path: 'category',
      name: 'Category',
      component: () => import('@/views/goods-management/views/goods-category'),
      meta: { title: '商品分类', icon: 'example' }
    }, {// 新增分类
      path: 'category/add',
      name: 'Add',
      component: () => import('@/views/goods-management/views/category-add'),
      meta: { title: '新增分类', icon: 'example' }
    }, {// 规格列表
      path: 'standard',
      name: 'Standard',
      component: () => import('@/views/goods-management/views/goods-standard'),
      meta: { title: '规格列表', icon: 'example' }
    }, {// 新增规格
      path: 'standard/add',
      name: 'StandardAdd',
      component: () => import('@/views/goods-management/views/standard-add'),
      meta: { title: '新增规格', icon: 'example' }
    }]
  },

  {// 活动管理
    path: '/activity',
    component: Layout,
    name: 'Activity',
    redirect: '/activity/list',
    meta: { title: '活动管理', icon: 'example' },
    children: [{// 活动列表
      path: 'list',
      component: () => import('@/views/activity-management/views/activity-list'),
      name: 'ActivityList',
      meta: { title: '活动列表', icon: 'example' }
    }, {// 新增活动
      path: 'add',
      component: () => import('@/views/activity-management/views/activity-add'),
      name: 'ActivityAdd',
      meta: { title: '新增活动', icon: 'example' }
    }]
  },

  {// 经营数据
    path: '/data',
    component: Layout,
    name: 'Business',
    redirect: '/data/business',
    meta: { title: '经营数据', icon: 'example' },
    children: [{// 营业统计
      path: 'business',
      name: 'BusinessStatics',
      component: () => import('@/views/data-operation/views/business-statics'),
      meta: { title: '营业统计', icon: 'example' }
    }, {// 销量排行
      path: 'sales',
      name: 'SalesRankings',
      component: () => import('@/views/data-operation/views/sales-rankings'),
      meta: { title: '销量排行', icon: 'example' }
    }, {// 访问统计
      path: 'access',
      name: 'AccessStatics',
      component: () => import('@/views/data-operation/views/access-statics'),
      meta: { title: '访问统计', icon: 'example' }
    }]
  },

  {// 会员管理
    path: '/member',
    name: 'MemberManagement',
    component: Layout,
    redirect: '/member/list',
    meta: { title: '会员管理', icon: 'example' },
    children: [{// 会员列表
      path: 'list',
      name: 'MemberList',
      component: () => import('@/views/member-management/views/member-list'),
      meta: { title: '会员列表', icon: 'example' }
    }, {// 会员查询
      path: 'search',
      name: 'MemberSearch',
      component: () => import('@/views/member-management/views/member-search'),
      meta: { title: '会员查询', icon: 'example' }
    }]
  },

  {// 售后管理
    path: '/customer',
    name: 'CustomerManagement',
    component: Layout,
    redirect: '/customer/list',
    meta: { title: '售后管理', icon: 'example' },
    children: [{// 评价列表
      path: 'list',
      name: 'CommentsList',
      component: () => import('@/views/customer-management/views/comments-list'),
      meta: { title: '评价列表', icon: 'example' }
    }, {
      path: '/',
      redirect: '/customer/list',
      hidden: true
    }]
  },

  {// 财务管理
    path: '/finance',
    name: 'FinanceManagement',
    component: Layout,
    redirect: '/finance/export',
    meta: { title: '财务管理', icon: 'example' },
    children: [{// 财务报表导出
      path: 'export',
      name: 'FinanceExport',
      component: () => import('@/views/finance-management/views/finance-export'),
      meta: { title: '财务报表导出', icon: 'example' }
    }, {
      path: '/',
      redirect: '/finance/export',
      hidden: true
    }]
  },

  {// 店铺管理
    path: '/shop',
    name: 'ShopManagement',
    component: Layout,
    redirect: '/shop/list',
    meta: { title: '店铺管理', icon: 'example' },
    children: [{// 店铺列表
      path: 'list',
      name: 'ShopList',
      component: () => import('@/views/shop-management/views/shop-list'),
      meta: { title: '店铺列表', icon: 'example' }
    }, {// 新增店铺
      path: 'add',
      name: 'ShopAdd',
      component: () => import('@/views/shop-management/views/shop-add'),
      meta: { title: '新增店铺', icon: 'example' }
    }]
  },

  {// 系统管理
    path: '/system',
    name: 'SystemSetUp',
    component: Layout,
    redirect: '/system/account',
    meta: { title: '系统设置', icon: 'example' },
    children: [{// 账户管理
      path: 'account',
      name: 'AccountManagement',
      component: () => import('@/views/system-setup/views/account-management'),
      meta: { title: '账户管理', icon: 'example' }
    }, {// 系统设置
      path: 'setup',
      name: 'SystemSetup',
      component: () => import('@/views/system-setup/views/system-setup'),
      meta: { title: '系统设置', icon: 'example' }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

