<template>
  <div class="cell-box">
    <div class="btn-box">
      <mt-button v-for="(d,index) in dateList"
        :key="index"
        type="primary"
        :ref="`btn-${index}`"
        size="small"
        plain
        @click.native="getMessageConfirm(d.date, d.fullDate, $event)">{{d.date}}</mt-button>
    </div>
    <mt-cell title="营业日期"
      :value="report.date"></mt-cell>
    <mt-cell title="营业额"
      :value="report.totalPrice"></mt-cell>
    <mt-cell title="订单数"
      :value="report.successCount"></mt-cell>
    <mt-cell title="最大订单"
      :value="report.maxMoney"></mt-cell>
    <mt-cell title="最小订单"
      :value="report.minMoney"></mt-cell>
    <mt-cell title="用户点击量"
      :value="report.accessTimes"></mt-cell>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      records: 1,
      dateList: []
    }
  },
  watch: {
    'boss.merchantId': {
      handler: function() {
        this.getBossMerchant(this.merchantId)
      },
      immediate: true
    }
  },
  computed: {
    merchantId() {
      return localStorage['bossMerchantId']
    },
    ...mapGetters([
      'report',
      'boss'
    ])
  },
  methods: {
    ...mapActions({
      getBossMessag: 'getBossMessag',
      getBossMerchant: 'getBossMerchant'
    }),
    getMessageConfirm(date, reportTime, e) {
      const targetEl = e.target
      const children = targetEl.parentNode.children
      for (const node of children) {
        if (node.children[0].innerHTML === date) node.className = targetEl.className.replace(/is-plain/g, '')
        else node.className.indexOf('is-plain') === -1 && (node.className = node.className.concat('is-plain'))
      }
      this.getBossMessag({
        merchantId: this.merchantId,
        reportTime
      })
    },
    GetDateStr(AddDayCount) {
      const dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期
      const y = dd.getFullYear()
      const m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)// 获取当前月份的日期，不足10补0
      const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()// 获取当前几号，不足10补0
      return y + '-' + m + '-' + d
    },
    initDateList() {
      for (let i = -1; i > -6; i--) {
        this.dateList.push({
          date: this.GetDateStr(i).substring(this.GetDateStr(i).indexOf('-') + 1),
          fullDate: this.GetDateStr(i),
          type: 'default'
        })
      }
    }
  },
  mounted() {
    this.initDateList()
  }
}
</script>