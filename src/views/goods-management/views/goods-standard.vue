<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入规格名称" v-model="orderNumber"></el-input>
      </el-col>
      <el-col :span="5" class="member-select">
        <el-input placeholder="请输入规格编号" v-model="orderNumber"></el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-row>
    <!--商品分类列表-->
    <el-row class="goods-statics">
      <el-table :data="categoryList" stripe border fit style="width: 100%" row-class-name="cell-center" header-cell-class-name="cell-center">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column prop="name" label="规格名称"></el-table-column>
        <el-table-column prop="categoryNumber" label="规格编号"></el-table-column>
        <el-table-column prop="quantity" label="规格选项"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editMember(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteMember(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="categoryList.length" :page="pagination.page" :rows="pagination.rows"></pagination>
    <!--编辑商品分类信息对话框-->
    <el-dialog class="member-editor" title="编辑商品分类" :visible.sync="dialogFormVisible">
      <el-form :model="memberMessage" size="mini">
        <el-form-item label="分类编号" label-width="120px">
          <el-input v-model="memberMessage.categoryNumber" auto-complete="off" placeholder="请填写商品分类编号"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类商品数量" label-width="120px">
          <el-input v-model="memberMessage.quantity" auto-complete="off" placeholder="请填写分类商品数量"></el-input>
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
  }
}
</script>
