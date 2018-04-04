<template>
    <el-row class="goods-management-container">
        <!--搜索框-->
        <el-row>
            <el-col :span="5">
                <el-input placeholder="请输入活动名称" v-model="orderNumber"></el-input>
            </el-col>
            <el-col :span="5" class="member-select">
                <el-input placeholder="请输入活动编号" v-model="orderNumber"></el-input>
            </el-col>
            <el-date-picker v-model="datetime" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-row>
        <!--会员信息列表-->
        <el-row class="order-statics">
            <el-table :data="orderList" stripe border fit style="width: 100%">
                <el-table-column type="index" :index="1" label="时间"></el-table-column>
                <el-table-column prop="activityCategory" label="总营业额"></el-table-column>
                <el-table-column prop="activityNumber" label="订单数"></el-table-column>
                <el-table-column prop="name" label="成功订单"></el-table-column>
                <el-table-column prop="createdAt" label="退款订单"></el-table-column>
                <el-table-column prop="endedAt" label="退款总额">
                </el-table-column>
                <el-table-column prop="participant" label="餐盒费"></el-table-column>
                <el-table-column prop="discountMoney" label="配送费"></el-table-column>
                <el-table-column prop="discountTotal" label="优惠券使用总金额"></el-table-column>
                <el-table-column prop="discountRemain" label="满立减总金额"></el-table-column>
                <el-table-column prop="activityQuantity" label="预设"></el-table-column>
            </el-table>
        </el-row>
        <!--分页组件-->
        <pagination :total="orderList.length" :page="pagination.page" :rows="pagination.rows"></pagination>
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
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期">
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

export default {
  data() {
    return {
      orderList: [{
        activityCategory: '满减送',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '优惠券',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '满减送',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '优惠券',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '满减送',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '优惠券',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '满减送',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '优惠券',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '优惠券',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '满减送',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '优惠券',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '满减送',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }, {
        activityCategory: '满减送',
        activityNumber: '1234547',
        name: '新店开张',
        createdAt: '2018-4-1 18:18',
        endedAt: '2018-4-1 18:18',
        participant: 222,
        discountMoney: 3,
        discountQuantity: 10000,
        discountRemain: 333,
        activityQuantity: 234,
        activityMoney: 333,
        discountTotal: 10000
      }], // 订单统计列表
      orderNumber: '', // 订单号
      datetime: [], // 日期时间
      pagination: {// 分页信息
        page: 1,
        rows: 10
      },
      options: [{
        value: 1,
        label: '钻石会员'
      }, {
        value: '2',
        label: '黄金会员'
      }, {
        value: '3',
        label: '白银会员'
      }],
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
  methods: {
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
    }
  }
}
</script>
