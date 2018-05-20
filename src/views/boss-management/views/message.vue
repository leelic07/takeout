<template>
    <div class="cell-box">
        <mt-cell title="今日您店的运营信息如下："></mt-cell>
        <mt-cell title="营业额" :value="report.totalPrice"></mt-cell>
        <mt-cell title="订单数" :value="report.successCount"></mt-cell>
        <mt-cell title="最大订单" :value="report.maxMoney"></mt-cell>
        <mt-cell title="最小订单" :value="report.minMoney"></mt-cell>
        <mt-cell title="用户点击量" :value="report.accessTimes"></mt-cell>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      shopMessage: {
        totalPrice: 2000,
        orderCount: 150,
        maxOrder: 15,
        minOrder: 5,
        userClick: 312
      }
    }
  },
  computed: {
    ...mapGetters([
      'report'
    ]),
    merchantId() {
      return localStorage['bossMerchantId']
    }
  },
  methods: {
    ...mapActions({
      getBossMessag: 'getBossMessag'
    })
  },
  mounted() {
    let date = new Date()
    date = parseTime(date).substring(0, parseTime(date).indexOf(' '))
    this.getBossMessag({ merchantId: this.merchantId, reportTime: date })
  }
}
</script>