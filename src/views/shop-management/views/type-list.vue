<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入类型名称"
          v-model="pagination.name"></el-input>
      </el-col>
      <el-button type="primary"
        icon="el-icon-search"
        @click="getMerchantTypePage(pagination)">搜索</el-button>
    </el-row>
    <!--店铺类型列表-->
    <el-row class="goods-statics">
      <el-table :data="merchantTypePage"
        stripe
        border
        fit
        style="width: 100%"
        row-class-name="cell-center"
        header-cell-class-name="cell-center">
        <el-table-column type="index"
          :index="1"
          label="序号"></el-table-column>
        <el-table-column prop="name"
          label="类型名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
              size="mini"
              @click="showEditMerchantType(scope.row.id)">编辑</el-button>
            <el-button type="danger"
              size="mini"
              @click="deleteMerchantTypeConfirm(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="merchantTypeTotal"
      :page="pagination.page"
      :rows="pagination.rows"
      @currentChange="currentChange"></pagination>
    <!--编辑店铺类型信息对话框-->
    <el-dialog class="member-editor"
      title="编辑商品类型"
      :visible.sync="dialogFormVisible">
      <el-form :model="goodsTypeForEdit"
        ref="goodsTypeForm"
        :rules="rule"
        size="mini">
        <el-form-item label="类型编号"
          label-width="120px"
          prop="code">
          <el-input v-model="goodsTypeForEdit.code"
            auto-complete="off"
            placeholder="请填写类型编号"></el-input>
        </el-form-item>
        <el-form-item label="类型名称"
          label-width="120px"
          prop="name">
          <el-input v-model="goodsTypeForEdit.name"
            auto-complete="off"
            placeholder="请填写类型名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button size="mini"
          @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini"
          type="primary"
          @click="updateMerchantTypeConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      code: '', // 订单号
      pagination: {// 分页信息
        page: 1,
        rows: 10,
        name: ''
      },
      dialogDetailVisible: false,
      dialogFormVisible: false,
      rule: {
        name: [{ required: true, message: '类型名称不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    deleteMerchantTypeResult(newValue) { // 删除成功重新加载类型数据
      this.getMerchantTypePage(this.pagination)
    },
    updateMerchantTypeResult() {
      this.dialogFormVisible = false
      this.getMerchantTypePage(this.pagination)
    }
  },
  computed: {
    ...mapGetters([
      'merchantTypePage',
      'goodsTypeTotal',
      'goodsTypeForEdit',
      'updateMerchantTypeResult',
      'deleteMerchantTypeResult',
      'merchantTypeTotal'
    ])
  },
  methods: {
    ...mapActions({
      getMerchantTypePage: 'getMerchantTypePage',
      editGoodsType: 'editGoodsType',
      updateMerchantType: 'updateMerchantType',
      deleteMerchantType: 'deleteMerchantType'
    }),
    // 点击编辑执行的方法
    showEditMerchantType(id) {
      // this.dialogFormVisible = true
      // this.editMerchantType(id)
      this.$router.push({
        path: `/shop/type-edit/${id}`
      })
    },
    // 点击删除执行的方法
    deleteMerchantTypeConfirm(id) {
      this.$confirm('确定删除该类型吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMerchantType(id)
      }).catch(err => console.log(err))
    },
    // 点击确定编辑商品类型执行的方法
    updateMerchantTypeConfirm() {
      this.$refs.goodsTypeForm.validate(valid => {
        if (valid) this.updateMerchantType(this.goodsTypeForEdit)
        else console.log('update MerchantTypeForEdit err')
      })
    },
    currentChange(page) {
      this.pagination.page = page
      this.getMerchantTypePage(this.pagination)
    }
  },
  mounted() {
    this.getMerchantTypePage(this.pagination)
  }
}
</script>
