<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入活动名称"
          v-model="pagination.name"></el-input>
      </el-col>
      <el-button type="primary"
        icon="el-icon-search"
        @click="searchActivity">搜索</el-button>
    </el-row>
    <!--优惠券列表-->
    <el-row class="order-statics">
      <el-table :data="couponList"
        stripe
        border
        fit
        style="width: 100%">
        <el-table-column type="index"
          :index="1"
          label="序号"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="props">
            <img :src="props.row.pictures.length ? props.row.pictures[0].url : ''"
              alt=""
              style="width:60%">
          </template>
        </el-table-column>
        <el-table-column label="活动类型"
          show-overflow-tooltip>
          <template slot-scope="props">
            {{props.row.couponSendType | couponSendTypes}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="activityNo" label="活动编号"></el-table-column> -->
        <el-table-column prop="name"
          label="活动名称"
          show-overflow-tooltip></el-table-column>
        <el-table-column label="开始日期"
          show-overflow-tooltip>
          <template slot-scope="props">
            {{props.row.startDate | Date}}
          </template>
        </el-table-column>
        <el-table-column label="活动结束日期"
          show-overflow-tooltip>
          <template slot-scope="props">
            {{props.row.endDate | Date}}
          </template>
        </el-table-column>
        <el-table-column prop="couponMoney"
          label="优惠券金额"></el-table-column>
        <!-- <el-table-column prop="exchangeCount" label="优惠券总数"></el-table-column> -->
        <!-- <el-table-column prop="discountRemain" label="优惠券余量"></el-table-column> -->
        <el-table-column label="操作"
          width="140">
          <template slot-scope="props">
            <el-button type="primary"
              size="mini"
              @click="showEditCoupon(props.row.id)">编辑</el-button>
            <el-button type="danger"
              size="mini"
              @click="deleteActivityConfirm(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="activityTotal"
      :page="pagination.page"
      :rows="pagination.rows"
      @currentChange="currentChange"></pagination>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      datetime: [], // 日期时间
      pagination: {// 分页信息
        page: 1,
        rows: 10,
        name: ''
      },
      dialogDetailVisible: false,
      activityType: 1
    }
  },
  watch: {
    deleteCouponResult() {
      this.getCouponList(this.pagination)
    }
  },
  computed: {
    ...mapGetters([
      'couponList',
      'activityTotal',
      'activityForEdit',
      'deleteCouponResult'
    ])
  },
  components: {
    Pagination
  },
  methods: {
    ...mapActions({
      getCouponList: 'getCouponList',
      editActivity: 'editActivity',
      updateActivity: 'updateActivity',
      deleteCoupon: 'deleteCoupon'
    }),
    // 点击详情执行的方法
    showMemberDetail(row) {
      this.dialogDetailVisible = true
      this.activityForEdit = row
    },
    // 点击删除执行的方法
    deleteActivityConfirm(id) {
      this.$confirm('确定删除商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCoupon(id)
      }).catch(err => console.log(err))
    },
    showEditCoupon(id) {
      this.$router.push({
        path: `/activity/edit-coupons/${id}`
      })
    },
    searchActivity() {
      this.getCouponList(this.pagination)
    },
    currentChange(page) {
      this.getCouponList(Object.assign(this.pagination, { page }))
    }
  },
  mounted() {
    this.getCouponList(this.pagination)
  }
}
</script>
