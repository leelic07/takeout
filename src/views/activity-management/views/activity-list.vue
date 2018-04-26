<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入活动名称" v-model="pagination.name"></el-input>
      </el-col>
      <el-col :span="5" class="member-select">
        <el-select v-model="activityType" placeholder="请选择活动类型">
          <el-option v-for="(activity,index) in activityTypeList" :value="activity.id" :label="activity.name" :key="index"></el-option>
        </el-select>
      </el-col>
      <!-- <el-date-picker v-model="datetime" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker> -->
      <el-button type="primary" icon="el-icon-search" @click="searchActivity">搜索</el-button>
    </el-row>
    <!--满减活动列表-->
    <el-row class="order-statics" v-if="showActivityList">
      <el-table :data="activityList" stripe border fit style="width: 100%">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column prop="activityType" label="活动类型"></el-table-column>
        <el-table-column prop="code" label="活动编号"></el-table-column>
        <el-table-column prop="name" label="活动名称"></el-table-column>
        <el-table-column prop="startDate" label="开始日期"></el-table-column>
        <el-table-column prop="ednDate" label="活动结束日期"></el-table-column>
        <el-table-column prop="participant" label="活动参与人数"></el-table-column>
        <el-table-column prop="money" label="优惠券金额"></el-table-column>
        <el-table-column prop="exchangeCount" label="优惠券总数"></el-table-column>
        <el-table-column prop="discountRemain" label="优惠券余量"></el-table-column>
        <el-table-column prop="activityCount" label="活动核销数"></el-table-column>
        <el-table-column prop="activityMoney" label="活动核销金额"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="showEditActivity(props.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteActivityConfirm(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="order-statics" v-if="showCouponList">
      <el-table :data="couponList" stripe border fit style="width: 100%">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column prop="activityType" label="活动类型"></el-table-column>
        <el-table-column prop="code" label="活动编号"></el-table-column>
        <el-table-column prop="name" label="活动名称"></el-table-column>
        <el-table-column prop="startDate" label="开始日期"></el-table-column>
        <el-table-column prop="ednDate" label="活动结束日期"></el-table-column>
        <el-table-column prop="participant" label="活动参与人数"></el-table-column>
        <el-table-column prop="money" label="优惠券金额"></el-table-column>
        <el-table-column prop="exchangeCount" label="优惠券总数"></el-table-column>
        <el-table-column prop="discountRemain" label="优惠券余量"></el-table-column>
        <el-table-column prop="activityCount" label="活动核销数"></el-table-column>
        <el-table-column prop="activityMoney" label="活动核销金额"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="showEditCoupon(props.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteActivityConfirm(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="activityTotal" :page="pagination.page" :rows="pagination.rows" @currentPage="currentPage"></pagination>
    <!--编辑会员信息对话框-->
    <el-dialog class="member-editor" title="编辑活动" :visible.sync="dialogFormVisible">
      <el-form :model="activityForEdit" size="mini">
        <el-form-item label="活动类型" label-width="120px">
          <el-input v-model="activityForEdit.activityType" auto-complete="off" placeholder="请填写活动类型"></el-input>
        </el-form-item>
        <el-form-item label="活动编号" label-width="120px">
          <el-input v-model="activityForEdit.code" auto-complete="off" placeholder="请填写活动编号"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="activityForEdit.name" auto-complete="off" placeholder="请填写活动名称"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" label-width="120px">
          <el-date-picker v-model="activityForEdit.startDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束日期" label-width="120px">
          <el-date-picker v-model="activityForEdit.endDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="活动参与人数" label-width="120px">
          <el-input v-model="activityForEdit.participant" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="优惠券金额" label-width="120px">
          <el-input v-model="activityForEdit.money" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="优惠券总数" label-width="120px">
          <el-input v-model="activityForEdit.exchangeCount" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="优惠券余量" label-width="120px">
          <el-input v-model="activityForEdit.discountRemain" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="活动核销数" label-width="120px">
          <el-input v-model="activityForEdit.activityCount" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="活动核销金额" label-width="120px">
          <el-input v-model="activityForEdit.activityMoney" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="updateActivityConfirm">确 定</el-button>
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
      datetime: [], // 日期时间
      pagination: {// 分页信息
        page: 1,
        rows: 10,
        name: ''
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
      imageUrl: '', // 上传头像的图片路径
      activityTypeList: [{
        id: 1,
        name: '满减活动'
      }, {
        id: 2,
        name: '优惠券'
      }],
      activityType: 1,
      showCouponList: false,
      showActivityList: true
    }
  },
  watch: {
    activityType: {
      handler: function(newValue) {
        if (newValue === 1) {
          this.getActivityList(this.pagination)
          this.couponList.splice(0)
        } else {
          this.getCouponList(this.pagination)
          this.activityList.splice(0)
        }
      },
      immediate: true
    },
    activityList() {
      this.showActivityList = true
      this.showCouponList = false
    },
    couponList() {
      this.showCouponList = true
      this.showActivityList = false
    },
    $router(to, from) {
      const path = from.path.substring(0, path.lastIndexOf('/'))
      if (path === '/activity/edit') this.activityType = 1
      else if (path === '/activity/edit-coupons') this.activityType = 2
    },
    deleteActivityResult() {
      this.getActivityList(this.pagination)
      this.couponList.splice(0)
    },
    deleteCouponResult() {
      this.getCouponList(this.pagination)
      this.activityList.splice(0)
    }
  },
  computed: {
    ...mapGetters([
      'activityList',
      'couponList',
      'activityTotal',
      'activityForEdit',
      'deleteActivityResult',
      'deleteCouponResult'
    ])
  },
  components: {
    Pagination
  },
  methods: {
    ...mapActions({
      getActivityList: 'getActivityList',
      getCouponList: 'getCouponList',
      editActivity: 'editActivity',
      updateActivity: 'updateActivity',
      deleteActivity: 'deleteActivity',
      deleteCoupon: 'deleteCoupon'
    }),
    // 点击详情执行的方法
    showMemberDetail(row) {
      this.dialogDetailVisible = true
      this.activityForEdit = row
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
    deleteActivityConfirm(id) {
      this.$confirm('确定删除商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.activityType === 1 && this.deleteActivity(id) || this.deleteCoupon(id)
      }).catch(err => console.log(err))
    },
    showEditActivity(id) {
      this.$router.push({
        path: `/activity/edit/${id}`
      })
    },
    showEditCoupon(id) {
      this.$router.push({
        path: `/activity/edit-coupons/${id}`
      })
    },
    updateActivityConfirm() {
      this.dialogFormVisible = true
      this.updateActivity(this.activityForEdit)
    },
    searchActivity() {
      this.activityType === 1 && this.getActivityList(this.pagination) || this.getCouponList(this.pagination)
    },
    currentPage(page) {
      this.getActivityList(Object.assign(this.pagination, { page }))
    }
  }
}
</script>
