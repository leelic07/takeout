<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row :gutter="25">
      <el-select v-if="type === '1'" v-model="pagination.merchantId" placeholder="请选择店铺" @change="merchantChange">
        <el-option value="" label="全部店铺"></el-option>
        <el-option v-for="(merchant,index) in merchantList" :key="index" :value="merchant.id" :label="merchant.name"></el-option>
      </el-select>
      <el-col :span="5">
        <el-input placeholder="请输入商品名称" v-model="pagination.itemName"></el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-search" @click="getSalesList(pagination)">搜索</el-button>
    </el-row>
    <!--商品分类列表-->
    <el-row class="goods-statics">
      <el-table :data="salesList" stripe border fit style="width: 100%" row-class-name="cell-center" header-cell-class-name="cell-center">
        <el-table-column type="index" :index="1" label="排名"></el-table-column>
        <el-table-column prop="itemName" label="商品名称"></el-table-column>
        <el-table-column prop="totalNums" label="销量"></el-table-column>
        <el-table-column prop="itemPrice" label="单价"></el-table-column>
        <el-table-column prop="totalPrice" label="销售额"></el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="salesTotal" :page="pagination.page" :rows="pagination.rows" @currentChange="currentChange"></pagination>
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
        orderNumber: '',
        merchantId: ''
      },
      dialogDetailVisible: false,
      dialogFormVisible: false
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'salesList',
      'salesTotal',
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
      'getSalesList',
      'getMerchantsList'
    ]),
    currentChange(page) {
      this.getSalesList(Object.assign(this.pagination, { page }))
    },
    merchantChange() {
      this.pagination.page = 1
      this.getSalesList(this.pagination)
    }
  },
  mounted() {
    this.merchantId && (this.pagination.merchantId = this.merchantId)
    this.getSalesList(this.pagination)
  }
}
</script>
