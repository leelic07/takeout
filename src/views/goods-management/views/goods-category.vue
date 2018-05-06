<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入分类名称" v-model="orderNumber"></el-input>
      </el-col>
      <!-- <el-col :span="5" class="member-select">
        <el-input placeholder="请输入分类编号" v-model="orderNumber"></el-input>
      </el-col> -->
      <el-button type="primary" icon="el-icon-search" @click="getGoodsTypePage(pagination)">搜索</el-button>
    </el-row>
    <!--商品分类列表-->
    <el-row class="goods-statics">
      <el-table :data="goodsTypePage" stripe border fit style="width: 100%" row-class-name="cell-center" header-cell-class-name="cell-center">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column prop="code" label="分类编号"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="quantity" label="分类商品数量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showEditGoodsType(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteGoodsTypeConfirm(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="goodsTypeTotal" :page="pagination.page" :rows="pagination.rows"></pagination>
    <!--编辑商品分类信息对话框-->
    <el-dialog class="member-editor" title="编辑商品分类" :visible.sync="dialogFormVisible">
      <el-form :model="goodsTypeForEdit" ref="goodsTypeForm" :rules="rule" size="mini">
        <el-form-item label="分类编号" label-width="120px" prop="code">
          <el-input v-model="goodsTypeForEdit.code" auto-complete="off" placeholder="请填写分类编号"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px" prop="name">
          <el-input v-model="goodsTypeForEdit.name" auto-complete="off" placeholder="请填写分类名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="分类商品数量" label-width="120px" prop="quantity">
          <el-input v-model="goodsTypeForEdit.quantity" auto-complete="off" placeholder="请填写分类商品数量"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="updateGoodsTypeConfirm">确 定</el-button>
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
      datetime: '', // 日期时间
      pagination: {// 分页信息
        page: 1,
        rows: 10,
        name: ''
      },
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
      rule: {
        code: [{ required: true, message: '分类商品编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '分类商品类型名称不能为空', trigger: 'blur' }],
        quantity: [{ required: true, message: '分类商品数量不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    deleteGoodsTypeResult(newValue) { // 删除成功重新加载分类数据
      newValue.code === 200 && this.getGoodsTypePage(this.pagination)
    },
    updateGoodsTypeResult() {
      this.dialogFormVisible = false
    }
  },
  computed: {
    ...mapGetters([
      'goodsTypePage',
      'goodsTypeTotal',
      'goodsTypeForEdit',
      'updateGoodsTypeResult',
      'deleteGoodsTypeResult'
    ])
  },
  components: {
    Pagination
  },
  methods: {
    ...mapActions({
      getGoodsTypePage: 'getGoodsTypePage',
      editGoodsType: 'editGoodsType',
      updateGoodsType: 'updateGoodsType',
      deleteGoodsType: 'deleteGoodsType'
    }),
    // 点击详情执行的方法
    showMemberDetail(row) {
      this.dialogDetailVisible = true
      this.goodsTypeForEdit = row
    },
    // 点击编辑执行的方法
    showEditGoodsType(id) {
      this.dialogFormVisible = true
      this.editGoodsType(id)
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
    deleteGoodsTypeConfirm(id) {
      this.$confirm('确定删除该分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteGoodsType(id)
      }).catch(err => console.log(err))
    },
    // 点击确定编辑分类商品执行的方法
    updateGoodsTypeConfirm() {
      this.$refs.goodsTypeForm.validate(valid => {
        if (valid) this.updateGoodsType(this.goodsTypeForEdit)
        else console.log('update goodsTypeForEdit err')
      })
    }
  },
  mounted() {
    this.getGoodsTypePage(this.pagination)
  }
}
</script>
