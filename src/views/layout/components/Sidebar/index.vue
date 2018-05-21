<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    routes() {
      return this.$router.options.routes
    },
    type() {
      return sessionStorage['type']
    }
  },
  methods: {
    initRoutes(routes, type) {
      routes.forEach((route, index, arr) => {
        switch (route.name) {
          case 'Activity':
            type !== '1' ? route.hidden = true : route.hidden = false
            break
          case 'ShopManagement':
            route.children.forEach(shop => {
              if (shop.name === 'ShopList' || shop.name === 'ShopAdd') type !== '1' ? shop.hidden = true : shop.hidden = false
              else type !== '1' ? shop.hidden = false : shop.hidden = true
            })
            break
          case 'Goods':
            route.children.forEach(goods => {
              if (goods.name === 'GoodsUpload' ||
                goods.name === 'Category' ||
                goods.name === 'Add' ||
                goods.name === 'Standard' ||
                goods.name === 'StandardAdd' ||
                goods.name === 'StandardEdit') type !== '1' ? goods.hidden = true : goods.hidden = false
            })
            break
          case 'SystemSetUp':
            route.children.forEach(system => {
              if (system.name === 'SystemBanner' ||
                system.name === 'DeliveryTime' ||
                system.name === 'MemberLevel') type !== '1' ? system.hidden = true : system.hidden = false
            })
            break
          case 'Order':
            route.children.forEach(order => {
              if (order.name === 'Acception' ||
              order.name === 'Reservation' ||
              order.name === 'Reminder') type !== '1' ? order.hidden = false : order.hidden = true
            })
        }
      })
    }
  },
  created() {
    this.initRoutes(this.routes, this.type)
  }
}
</script>
