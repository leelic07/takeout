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
      <el-button type="primary" icon="el-icon-search" @click="getBusinessList(pagination)">搜索</el-button>
    </el-row>
    <!--会员信息列表-->
    <el-row class="order-statics">
      <el-table :data="businessList" stripe border fit style="width: 100%">
        <el-table-column prop="settlTime" label="时间"></el-table-column>
        <el-table-column prop="totalPrice" label="总营业额"></el-table-column>
        <el-table-column prop="allCount" label="订单数"></el-table-column>
        <el-table-column prop="successCount" label="成功订单"></el-table-column>
        <el-table-column prop="refundCount" label="退款订单"></el-table-column>
        <el-table-column prop="refundTotalMoney" label="退款总额"></el-table-column>
        <el-table-column prop="totalPackingCharge" label="餐盒费"></el-table-column>
        <el-table-column prop="totalDeliverMoney" label="配送费"></el-table-column>
        <el-table-column prop="totalCouponMoney" label="优惠券使用总金额"></el-table-column>
        <el-table-column prop="totalActivityMoney" label="满立减总金额"></el-table-column>
        <!-- <el-table-column prop="activityQuantity" label="预设"></el-table-column> -->
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="businessTotal" :page="pagination.page" :rows="pagination.rows" @currentChange="currentChange"></pagination>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      pagination: {// 分页信息
        page: 1,
        rows: 10,
        datetime: '',
        merchantId: ''
      },
      value: '', // 选择会员等级
      dialogDetailVisible: false,
      dialogFormVisible: false
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'businessList',
      'businessTotal',
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
      'getBusinessList',
      'getMerchantsList'
    ]),
    currentChange(page) {
      this.getBusinessList(Object.assign(this.pagination, { page }))
    },
    merchantChange() {
      this.pagination.page = 1
      this.getBusinessList(this.pagination)
    }
  },
  mounted() {
    this.merchantId && (this.pagination.merchantId = this.merchantId)
    this.getBusinessList(this.pagination)
    this.getMerchantsList()
  }
}
</script>
