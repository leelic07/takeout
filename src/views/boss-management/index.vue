<template>
    <div class="boss-container">
        <mt-header fixed title="新华店，你好">
          <mt-button slot="right" @click="logout">退出</mt-button>
        </mt-header>
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
import { mapActions } from 'vuex'
import { MessageBox, Toast } from 'mint-ui'

export default {
  data() {
    return {
      title: 'Boss'
    }
  },
  watch: {
    $router: {
      handler: function(to, from) {
        if (!name) {
          Toast({
            message: '未登录，请先登录',
            position: 'middle',
            duration: 2000
          })
          this.$router.push({ path: '/boss/login' })
        }
      },
      immediate: true
    }
  },
  computed: {
    name() {
      return localStorage['name']
    }
  },
  methods: {
    ...mapActions({
      bossLogout: 'bossLogout'
    }),
    showMessage() {
      this.$router.push({
        path: '/boss/message'
      })
    },
    showRecords() {
      this.$router.push({
        path: '/boss/records'
      })
    },
    logout() {
      MessageBox.confirm('确定退出登录?').then(() => {
        this.bossLogout()
      })
    }
  }
}
</script>