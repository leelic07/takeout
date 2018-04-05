<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入店铺名称" v-model="pagination.name"></el-input>
      </el-col>
      <!-- <el-col :span="5" class="member-select">
        <el-input placeholder="请输入店铺编号" v-model="orderNumber"></el-input>
      </el-col> -->
      <!-- <el-date-picker v-model="datetime" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker> -->
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-row>
    <!--会员信息列表-->
    <el-row class="order-statics">
      <el-table :data="orderList" stripe border fit style="width: 100%">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column label="店铺名称">
          <template slot-scope="props">
            <el-button type="text" @click="showMemberDetail(props.row)">{{props.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="activityNumber" label="店铺编号"></el-table-column>
        <el-table-column prop="name" label="店铺类型"></el-table-column>
        <el-table-column prop="createdAt" label="联系电话"></el-table-column>
        <el-table-column prop="endedAt" label="地址"></el-table-column>
        <el-table-column prop="participant" label="本月营业额"></el-table-column>
        <el-table-column prop="discountMoney" label="本月订单数"></el-table-column>
        <el-table-column prop="discountTotal" label="商品数量"></el-table-column>
        <el-table-column prop="discountRemain" label="分类数量"></el-table-column>
        <el-table-column prop="activityQuantity" label="评分"></el-table-column>
        <el-table-column prop="activityMoney" label="活动"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editMember(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="orderList.length" :page="pagination.page" :rows="pagination.rows"></pagination>
    <!--店铺详情信息对话框-->
    <el-dialog title="店铺详情" class="shop-detail" :visible.sync="dialogDetailVisible">
      <el-form inline :model="memberMessage" size="mini">
        <el-form-item label="店铺名称：" label-width="120px">
          <span>{{memberMessage.activityCategory}}</span>
        </el-form-item>
        <el-form-item label="店铺编号：" label-width="120px">
          <span>{{memberMessage.activityNumber}}</span>
        </el-form-item>
        <el-form-item label="店铺类型：" label-width="120px">
          <span>{{memberMessage.name}}</span>
        </el-form-item>
        <el-form-item label="联系电话：" label-width="120px">
          <span>{{memberMessage.name}}</span>
        </el-form-item>
        <el-form-item label="地址：" label-width="120px">
          <span>{{memberMessage.endedAt}}</span>
        </el-form-item>
        <el-form-item label="本月营业额：" label-width="120px">
          <span>{{memberMessage.participant}}</span>
        </el-form-item>
        <el-form-item label="本月订单数：" label-width="120px">
          <span>{{memberMessage.discountMoney}}</span>
        </el-form-item>
        <el-form-item label="商品数量：" label-width="120px">
          <span>{{memberMessage.discountTotal}}</span>
        </el-form-item>
        <el-form-item label="分类数量：" label-width="120px">
          <span>{{memberMessage.discountRemain}}</span>
        </el-form-item>
        <el-form-item label="评分：" label-width="120px">
          <span>{{memberMessage.activityQuantity}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogDetailVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogDetailVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑店铺信息对话框-->
    <el-dialog class="member-editor" title="编辑店铺" :visible.sync="dialogFormVisible">
      <el-form :model="memberMessage" size="mini">
        <el-form-item label="店铺名称" label-width="120px">
          <el-input v-model="memberMessage.activityCategory" auto-complete="off" placeholder="请填写活动类型"></el-input>
        </el-form-item>
        <el-form-item label="店铺编号" label-width="120px">
          <el-input v-model="memberMessage.activityNumber" auto-complete="off" placeholder="请填写活动编号"></el-input>
        </el-form-item>
        <el-form-item label="店铺类型" label-width="120px">
          <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写活动名称"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="120px">
          <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写活动名称"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="memberMessage.endedAt" auto-complete="off" placeholder="请填写地址"></el-input>
        </el-form-item>
        <el-form-item label="本月营业额" label-width="120px">
          <el-input v-model="memberMessage.participant" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="本月订单数" label-width="120px">
          <el-input v-model="memberMessage.discountMoney" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" label-width="120px">
          <el-input v-model="memberMessage.discountTotal" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="分类数量" label-width="120px">
          <el-input v-model="memberMessage.discountRemain" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="评分" label-width="120px">
          <el-input v-model="memberMessage.activityQuantity" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="店铺状态" label-width="120px">
          <el-radio-group v-model="memberMessage.shopStatus">
            <el-radio label="1">上线店铺</el-radio>
            <el-radio label="0">关闭店铺</el-radio>
          </el-radio-group>
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
        rows: 10,
        name: ''// 商铺名称
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
    ...mapActions({
      getShopList: 'getShopList'
    }),
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
  },
  mounted() {
    this.getShopList(this.pagination)
  }
}
</script>
