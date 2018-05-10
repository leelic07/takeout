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
      if (type !== '1') {
        routes.forEach((route, index, arr) => {
          switch (route.name) {
            case 'Activity':
              route.hidden = true
              break
            case 'ShopManagement':
              route.children.forEach(shop => {
                if (shop.name === 'ShopList' || shop.name === 'ShopAdd') shop.hidden = true
                else shop.hidden = false
              })
              break
            case 'Goods':
              route.children.forEach(goods => {
                if (goods.name === 'GoodsUpload') goods.hidden = true
              })
              break
          }
        })
      } else {
        routes.forEach((route, index, arr) => {
          switch (route.name) {
            case 'Activity':
              route.hidden = false
              break
            case 'ShopManagement':
              route.children.forEach(shop => {
                if (shop.name === 'ShopList' || shop.name === 'ShopAdd') shop.hidden = false
                else shop.hidden = true
              })
              break
            case 'Goods':
              route.children.forEach(goods => {
                if (goods.name === 'GoodsUpload') goods.hidden = false
              })
              break
          }
        })
      }
    }
  },
  mounted() {
    this.initRoutes(this.routes, this.type)
  }
}
</script>
