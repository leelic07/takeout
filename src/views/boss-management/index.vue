<template>
    <div class="boss-container">
        <mt-header fixed title="新华店，你好"></mt-header>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <div class="tabbar-box">
            <mt-tabbar>
                <mt-tab-item id="1" @click.native="showMessage">
                    <i slot="icon" class="el-icon-news"></i>
                    店铺营业信息
                </mt-tab-item>
                <mt-tab-item id="2" @click.native="showRecords">
                    <i slot="icon" class="el-icon-message"></i>
                    历史信息
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Boss'
    }
  },
  methods: {
    showMessage() {
      this.$router.push({
        path: '/boss/message'
      })
    },
    showRecords() {
      this.$router.push({
        path: '/boss/records'
      })
    }
  }
}
</script>