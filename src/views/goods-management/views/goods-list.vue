<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入商品名称" v-model="pagination.name"></el-input>
      </el-col>
      <el-col :span="4" class="member-select">
        <el-select v-model="pagination.merchantId" placeholder="请选择店铺">
          <el-option value="" label="全部"></el-option>
          <el-option v-for="(merchant,index) in merchantList" :value="merchant.id" :label="merchant.name" :key="index"></el-option>
        </el-select>
      </el-col>
      <!-- <el-date-picker v-model="datetime" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker> -->
      <!-- <el-col :span="1"> -->
      <el-button type="primary" icon="el-icon-search" @click="getGoodsList(pagination)">搜索</el-button>
      <!-- </el-col> -->
    </el-row>
    <!--会员信息列表-->
    <el-row class="order-statics">
      <el-table :data="goodsList" stripe border fit style="width: 100%">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="props">
            <img src="" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="code" label="编号"></el-table-column>
        <el-table-column prop="unit" label="商品单位"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="itemTypeName" label="商品分类">
        </el-table-column>
        <el-table-column prop="label" label="标签"></el-table-column>
        <el-table-column prop="salesVolume" label="销售量"></el-table-column>
        <el-table-column prop="stockStatus" label="库存状态"></el-table-column>
        <el-table-column prop="stock" label="库存量"></el-table-column>
        <el-table-column prop="status" label="商品状态"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="editGoods(props.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="withdrawGoods(props.row.id)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="goodsList.length" :page="pagination.page" :rows="pagination.rows"></pagination>
    <!--编辑商品信息对话框-->
    <el-dialog class="member-editor" title="编辑商品" :visible.sync="dialogFormVisible">
      <el-form :model="goodsForEdit" size="mini">
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="goodsForEdit.name" auto-complete="off" placeholder="请填写姓名"></el-input>
        </el-form-item>
        <el-form-item label="单位" label-width="120px">
          <el-input v-model="goodsForEdit.unit" auto-complete="off" placeholder="请填写性别"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="goodsForEdit.price" auto-complete="off" placeholder="请填写电话"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" label-width="120px">
          <el-select v-model="goodsForEdit.itemTypeName" placeholder="请选择会员等级">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-input v-model="goodsForEdit.label" auto-complete="off" placeholder="请填写地址"></el-input>
        </el-form-item>
        <el-form-item label="库存状态" label-width="120px">
          <el-input v-model="goodsForEdit.stockStatus" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="库存量" label-width="120px">
          <el-input v-model="goodsForEdit.stock" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" label-width="120px">
          <el-select v-model="goodsForEdit.status" placeholder="请选择会员等级">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" placeholder="请填写地址" label-width="120px">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="goodsForEdit.imageUrl" :src="goodsForEdit.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--商品下架对话框-->
    <el-dialog class="withdraw-dialog" title="商品下架" :visible.sync="dialogWithdrawVisible">
      <el-form ref="shopForm">
        <el-form-item label="选择下架商铺：">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="merchantId" @change="handleCheckMerchantChange">
            <el-checkbox v-for="(merchant,index) in merchantListByItemId" :label="merchant.id" :key="index">{{merchant.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogWithdrawVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="withdrawGoodsConfirmForSuper({
          itemId,
          merchantId,
          isPuton: 0
        })">确 定</el-button>
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
        name: '',
        merchantId: ''
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
      dialogWithdrawVisible: false,
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
      imageUrl: '', // 上传头像的图片路径
      merchantId: [], // 选中的商品id的集合
      itemId: '', // 需要下架或者上架的商品id
      checkAll: false,
      isIndeterminate: true
    }
  },
  watch: {
    'pagination.merchantId'() {
      this.getGoodsList(this.pagination)
    }
  },
  computed: {
    ...mapGetters([
      'goodsList',
      'goodsForEdit',
      'merchantList',
      'merchantListByItemId'
    ])
  },
  components: {
    Pagination
  },
  methods: {
    ...mapActions({
      getGoodsList: 'getGoodsList',
      editGoods: 'editGoods',
      getMerchantsList: 'getMerchantsList',
      getMerchantsListByitemId: 'getMerchantsListByitemId',
      withdrawGoodsConfirm: 'withdrawGoodsConfirm',
      withdrawGoodsConfirmForSuper: 'withdrawGoodsConfirmForSuper'
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
    // 点击下架执行的方法
    withdrawGoods(itemId) {
      if (this.pagination.merchantId) {
        this.$confirm('确定下架该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.withdrawGoodsConfirm({
            itemId,
            merchantId: this.merchantId.push(this.pagination.merchantId),
            isPuton: 0
          })
        }).catch(err => console.log(err))
      } else {
        this.getMerchantsListByitemId(itemId)
        this.dialogWithdrawVisible = true
        this.itemId = itemId
      }
    },
    // 点击全选执行的方法
    handleCheckAllChange(val) {
      val ? this.merchantList.formEach(merchant => {
        this.merchantId.push(merchant.id)
      }) : this.merchantId.splice(0)
      this.isIndeterminate = false
    },
    // 选择商铺时执行的方法
    handleCheckMerchantChange(val) {
      this.checkAll = val.length === this.merchantList.length
      this.isIndeterminate = val.length > 0 && val.length < this.merchantList.length
    }
  },
  mounted() {
    this.getGoodsList(this.pagination)
    this.getMerchantsList()
  }
}
</script>