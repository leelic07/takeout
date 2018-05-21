<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-select v-if="type === '1'" v-model="pagination.merchantId" placeholder="请选择店铺" @change="merchantChange">
        <el-option value="" label="全部店铺"></el-option>
        <el-option v-for="(merchant,index) in merchantList" :key="index" :value="merchant.id" :label="merchant.name"></el-option>
      </el-select>
      <el-date-picker v-model="pagination.datetime" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="getFinanceList(pagination)">搜索</el-button>
      <el-button type="primary" @click="exportExcel(pagination.datetime)">导出excel</el-button>
    </el-row>
    <!--会员信息列表-->
    <el-row class="order-statics">
      <el-table :data="financeList" stripe border fit style="width: 100%">
        <el-table-column prop="settlTime" label="时间"></el-table-column>
        <el-table-column prop="totalPrice" label="营业额"></el-table-column>
        <el-table-column prop="deliverMoney" label="配送费"></el-table-column>
        <el-table-column prop="couponMoney" label="优惠券金额"></el-table-column>
        <el-table-column prop="activityMoney" label="满减送金额"></el-table-column>
        <el-table-column prop="realTotalMoney" label="实际支付金额"></el-table-column>
        <el-table-column prop="platFormServiceFee" label="平台服务费"></el-table-column>
        <el-table-column prop="realIncome" label="实际收入"></el-table-column>
        <el-table-column prop="wxProcedures" label="微信手续费"></el-table-column>
        <el-table-column prop="settleMoney" label="结算金额"></el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="financeTotal" :page="pagination.page" :rows="pagination.rows" @currentPage="currentPage"></pagination>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      orderNumber: '', // 订单号
      pagination: {// 分页信息
        page: 1,
        rows: 10,
        datetime: '',
        merchantId: ''
      },
      value: '', // 选择会员等级
      dialogDetailVisible: false,
      dialogFormVisible: false,
      memberMessage: {
        imageUrl: ''
      } // 会员详情信息
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'financeList',
      'financeTotal',
      'merchantList'
    ]),
    merchantId() {
      return Number(sessionStorage['merchantId'])
    },
    type() {
      return sessionStorage['type']
    }
  },
  methods: {
    ...mapActions([
      'getFinanceList',
      'exportExcel',
      'getMerchantsList'
    ]),
    // 点击详情执行的方法
    showMemberDetail(row) {
      this.dialogDetailVisible = true
      this.memberMessage = row
    },
    // 点击编辑执行的方法
    editMember(row) {
      this.dialogFormVisible = true
      this.memberMessage = row
    },
    currentPage(page) {
      this.getFinanceList(Object.assign(this.pagination, { page }))
    },
    merchantChange() {
      this.pagination.page = 1
      this.getFinanceList(this.pagination)
    }
  },
  mounted() {
    this.merchantId && (this.pagination.merchantId = this.merchantId)
    this.getFinanceList(this.pagination)
    this.getMerchantsList()
  }
}
</script>
