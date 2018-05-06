<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
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
    <pagination :total="businessTotal" :page="pagination.page" :rows="pagination.rows" @currentPage="currentPage"></pagination>
    <!--编辑会员信息对话框-->
    <el-dialog class="member-editor" title="编辑活动" :visible.sync="dialogFormVisible">
      <el-form :model="memberMessage" size="mini">
        <el-form-item label="活动类型" label-width="120px">
          <el-input v-model="memberMessage.activityCategory" auto-complete="off" placeholder="请填写活动类型"></el-input>
        </el-form-item>
        <el-form-item label="活动编号" label-width="120px">
          <el-input v-model="memberMessage.activityNumber" auto-complete="off" placeholder="请填写活动编号"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写活动名称"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" label-width="120px">
          <el-date-picker v-model="memberMessage.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束日期" label-width="120px">
          <el-input v-model="memberMessage.endedAt" auto-complete="off" placeholder="请填写地址"></el-input>
        </el-form-item>
        <el-form-item label="活动参与人数" label-width="120px">
          <el-input v-model="memberMessage.participant" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="优惠券金额" label-width="120px">
          <el-input v-model="memberMessage.discountMoney" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="优惠券总数" label-width="120px">
          <el-input v-model="memberMessage.discountTotal" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="优惠券余量" label-width="120px">
          <el-input v-model="memberMessage.discountRemain" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="活动核销数" label-width="120px">
          <el-input v-model="memberMessage.activityQuantity" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="活动核销金额" label-width="120px">
          <el-input v-model="memberMessage.activityMoney" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
        datetime: ''
      },
      value: '', // 选择会员等级
      dialogDetailVisible: false,
      dialogFormVisible: false,
      memberMessage: {
        imageUrl: ''
      }, // 会员详情信息
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      imageUrl: '' // 上传头像的图片路径
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'businessList',
      'businessTotal'
    ])
  },
  methods: {
    ...mapActions([
      'getBusinessList'
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
    // 会员头像上传成功执行的方法
    handleAvatarSuccess(file) {
      console.log(file)
    },
    // 会员头像上传之前执行的方法
    beforeAvatarUpload(file) {
      console.log(file)
    },
    // 点击删除执行的方法
    deleteMember(id) {
      this.$confirm('确定下架该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '下架成功!'
        })
      }).catch(err => console.log(err))
    },
    currentPage(page) {
      this.getBusinessList(Object.assign(this.pagination, { page }))
    }
  },
  mounted() {
    this.getBusinessList(this.pagination)
  }
}
</script>
