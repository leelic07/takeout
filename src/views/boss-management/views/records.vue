<template>
    <div class="cell-box">
        <div class="btn-box">
            <mt-button v-for="(d,index) in dateList" :key="index" type="primary" size="small" @click.native="getMessageConfirm(d.date)">{{d.date}}</mt-button>
        </div>
        <mt-tab-container v-model="records" swipeable>
            <mt-tab-container-item>
                <mt-cell title="营业日期" :value="report.date"></mt-cell>
                <mt-cell title="营业额" :value="report.totalPrice"></mt-cell>
                <mt-cell title="订单数" :value="report.orderCount"></mt-cell>
                <mt-cell title="最大订单" :value="report.maxOrder"></mt-cell>
                <mt-cell title="最小订单" :value="report.minOrder"></mt-cell>
                <mt-cell title="用户点击量" :value="report.userClick"></mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      records: 1,
      businessRecords: [{
        id: 1,
        date: '5.16',
        totalPrice: 2000,
        orderCount: 157,
        maxOrder: 15,
        minOrder: 5,
        userClick: 312
      }, {
        id: 2,
        date: '5.17',
        totalPrice: 1000,
        orderCount: 130,
        maxOrder: 75,
        minOrder: 7,
        userClick: 722
      }, {
        id: 3,
        date: '5.18',
        totalPrice: 4240,
        orderCount: 150,
        maxOrder: 88,
        minOrder: 8,
        userClick: 562
      }, {
        id: 4,
        date: '5.19',
        totalPrice: 5020,
        orderCount: 150,
        maxOrder: 55,
        minOrder: 8,
        userClick: 712
      }],
      dateList: []
    }
  },
  computed: {
    year() {
      return new Date(2018, 5, 1).getFullYear()
    },
    month() {
      return new Date(2018, 5, 1).getMonth()
    },
    date() {
      return new Date(2018, 5, 1).getDate()
    },
    merchantId() {
      // return localStorage['bossMerchantId']
      return 10
    },
    ...mapGetters([
      'report'
    ])
  },
  methods: {
    ...mapActions({
      getBossMessag: 'getBossMessag'
    }),
    getMessageConfirm(reportTime) {
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
    }
  },
  mounted() {
    for (let i = -1; i > -6; i--) {
      this.dateList.push({ date: this.GetDateStr(i).substring(this.GetDateStr(i).indexOf('-') + 1) })
    }
  }
}
</script>