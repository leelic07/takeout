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
import { constantRouterMap } from '@/router'

export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      routes: []
    }
  },
  watch: {
    routes: {
      handler: function(newValue) {
        this.routes = newValue
      },
      deep: true,
      immediate: true
    }
    // type: {
    //   handler: function(newValue) {
    //     this.routes = this.$router.options.routes
    //   },
    //   immediate: true
    // }
    // routes: {
    //   handler: function(to, from) {
    //     // console.log('routes', to)
    //     this.router = to
    //   },
    //   deep: true
    // }
    // $router: {
    //   handler: function(to) {
    //     console.log(to.options.routes)
    //     this.routes = to.options.routes
    //   },
    //   immediate: true
    // }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'type'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
    // routes() {
    //   return constantRouterMap
    // }
    // type() {
    //   return sessionStorage['type']
    // }
  },
  mounted() {
    this.routes = constantRouterMap
  }
}
</script>
