<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入商品名称" v-model="orderNumber"></el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-row>
    <!--商品分类列表-->
    <el-row class="goods-statics">
      <el-table :data="salesList" stripe border fit style="width: 100%" row-class-name="cell-center" header-cell-class-name="cell-center">
        <el-table-column type="index" :index="1" label="排名"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="categoryNumber" label="销量"></el-table-column>
        <el-table-column prop="quantity" label="单价"></el-table-column>
        <el-table-column prop="quantity" label="销售额"></el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="salesTotal" :page="pagination.page" :rows="pagination.rows"></pagination>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      categoryList: [{
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }, {
        categoryNumber: 12345678324324,
        name: '卤粉',
        quantity: '微辣,中辣,加辣'
      }], // 订单统计列表
      orderNumber: '', // 订单号
      datetime: '', // 日期时间
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
  computed: {
    ...mapGetters([
      'salesList'
    ])
  },
  methods: {
    ...mapActions([
      'getSalesList'
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
      this.$confirm('确定删除该分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(err => console.log(err))
    }
  },
  mounted() {
    this.getSalesList(this.pagination)
  }
}
</script>
