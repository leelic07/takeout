<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'
import { mapGetters } from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  watch: {
    orderMessage(newValue) {
      console.log(newValue)
      this.$notify({
        title: '订单提醒',
        message: '您有一笔新的订单',
        type: 'success',
        duration: 0
      })
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters([
      'orderMessage'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
$bgGray: #fcfcfc;
.app-wrapper {
  @include clearfix;
  @include absolute;
}
</style>
