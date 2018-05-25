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
      <el-button type="primary" icon="el-icon-search" @click="getAccessList(pagination)">搜索</el-button>
    </el-row>
    <!--访问统计列表-->
    <el-row class="goods-statics">
      <el-table :data="accessList" stripe border fit style="width: 100%" row-class-name="cell-center" header-cell-class-name="cell-center">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column prop="accessDate" label="时间"></el-table-column>
        <el-table-column prop="accessTimes" label="访问量"></el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="accessTotal" :page="pagination.page" :rows="pagination.rows" @currentChange="currentChange"></pagination>
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
      dialogDetailVisible: false,
      dialogFormVisible: false
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'accessList',
      'accessTotal',
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
      'getAccessList',
      'getMerchantsList'
    ]),
    merchantChange() {
      this.pagination.page = 1
      this.getAccessList(this.pagination)
    },
    currentChange(page) {
      this.getAccessList(Object.assign(this.pagination, { page }))
    }
  },
  mounted() {
    this.merchantId && (this.pagination.merchantId = this.merchantId)
    this.getAccessList(this.pagination)
    this.getMerchantsList()
  }
}
</script>
