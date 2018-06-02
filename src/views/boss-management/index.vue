<template>
  <div class="boss-container">
    <mt-header fixed
      :title="bossMerchant.name">
      <mt-button slot="right"
        @click="logout">退出</mt-button>
      <mt-butto @click="localStorage['bossMerchantId'] = 10">切换</mt-butto>
    </mt-header>
    <transition name="fade"
      mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="tabbar-box">
      <mt-tabbar>
        <mt-tab-item id="1"
          @click.native="showMessage">
          <i slot="icon"
            class="el-icon-news"></i>
          店铺营业信息
        </mt-tab-item>
        <mt-tab-item id="2"
          @click.native="showRecords">
          <i slot="icon"
            class="el-icon-message"></i>
          历史信息
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
  data() {
    return {
      title: 'Boss'
    }
  },
  watch: {
    'boss.merchantId': {
      handler: function(newValue) {
        this.merchantId && this.getBossMerchant(this.merchantId)
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'bossMerchant',
      'boss'
    ]),
    name() {
      return localStorage['name']
    },
    merchantId() {
      return localStorage['bossMerchantId']
    }
  },
  methods: {
    ...mapActions({
      bossLogout: 'bossLogout',
      getBossMerchant: 'getBossMerchant'
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