<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="3" :offset="21">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="addBanner">添加轮播图</el-button>
      </el-col>
    </el-row>
    <!--轮播图信息列表-->
    <el-row class="order-statics">
      <el-table :data="goodsList" stripe border fit style="width: 100%">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column prop="name" label="活动名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="props">
            <img :src="props.row.pictures[0].url" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="code" label="上传时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unit" label="跳转url"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="showBannerEdit(props.row.id)" v-if="type === '1'">编辑</el-button>
            <el-button type="danger" size="mini" @click="withdrawGoods(props.row.id)" v-if="props.row.isPuton === '1'">下架</el-button>
            <el-button type="success" size="mini" @click="groundGoods(props.row.id)" v-else>上架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="advertisementsTotal" :page="pagination.page" :rows="pagination.rows" :currentChange="currentChange"></pagination>
    <!--商品下架对话框-->
    <el-dialog class="withdraw-dialog" title="商品下架" :visible.sync="dialogWithdrawVisible">
      <el-form ref="shopForm">
        <el-form-item label="选择下架商铺：">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="merchantIds" @change="handleCheckMerchantChange">
            <el-checkbox v-for="(merchant,index) in merchantList" :label="merchant.id" :key="index">{{merchant.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogWithdrawVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="withdrawGoodsConfirmForSuper({
          itemId,
          merchantId: merchantIds.join(','),
          isPuton: 0
        })">确 定</el-button>
      </div>
    </el-dialog>
    <!--商品上架对话框-->
    <el-dialog class="withdraw-dialog" title="商品下架" :visible.sync="dialogGroundVisible">
      <el-form ref="shopForm">
        <el-form-item label="选择下架商铺：">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="merchantIds" @change="handleCheckMerchantChange">
            <el-checkbox v-for="(merchant,index) in merchantList" :label="merchant.id" :key="index">{{merchant.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogGroundVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="groundGoodsConfirmForSuper({
          itemId,
          merchantId: merchantIds.join(','),
          isPuton: 1
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
      datetime: [], // 日期时间
      pagination: {// 分页信息
        page: 1,
        rows: 10
      },
      value: '', // 选择会员等级
      dialogDetailVisible: false,
      dialogFormVisible: false,
      dialogWithdrawVisible: false,
      dialogGroundVisible: false,
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
      fileList: [], // 图片上传的数组
      imageUrl: '', // 上传头像的图片路径
      merchantIds: [], // 选中的商铺id的集合
      itemId: '', // 需要下架或者上架的商品id
      checkAll: false,
      isIndeterminate: true,
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  watch: {
    'pagination.merchantId'() {
      this.getGoodsList(this.pagination)
    },
    withdrawGoodsResult() {
      this.dialogWithdrawVisible = false
      this.getGoodsList(this.pagination)
    },
    groundGoodsResult() {
      this.dialogGroundVisible = false
      this.getGoodsList(this.pagination)
    },
    merchantListByItemId(newValue) {
      this.merchantIds = newValue.slice(0)
    }
  },
  computed: {
    ...mapGetters([
      'goodsList',
      'goodsForEdit',
      'merchantList',
      'merchantListByItemId',
      'withdrawGoodsResult',
      'groundGoodsResult',
      'advertisements',
      'advertisementsTotal'
    ]),
    type() {
      return sessionStorage.getItem('type')
    },
    merchantId() {
      return sessionStorage.getItem('merchantId')
    }
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
      withdrawGoodsConfirmForSuper: 'withdrawGoodsConfirmForSuper',
      groundGoodsConfirmForSuper: 'groundGoodsConfirmForSuper',
      getAdvertisements: 'getAdvertisements'
    }),
    // 点击详情执行的方法
    showMemberDetail(row) {
      this.dialogDetailVisible = true
      this.memberMessage = row
    },
    // 点击编辑执行的方法
    showBannerEdit(id) {
      this.$router.push({
        path: `/system/edit-banner/${id}`
      })
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
            merchantId: this.pagination.merchantId,
            isPuton: 0
          })
        }).catch(err => console.log(err))
      } else {
        this.getMerchantsListByitemId(itemId)
        this.dialogWithdrawVisible = true
        this.itemId = itemId
      }
    },
    // 点击上架执行的方法
    groundGoods(itemId) {
      if (this.pagination.merchantId) {
        this.$confirm('确定上架该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.withdrawGoodsConfirm({
            itemId,
            merchantId: this.pagination.merchantId,
            isPuton: 1
          })
        }).catch(err => console.log(err))
      } else {
        this.getMerchantsListByitemId(itemId)
        this.dialogGroundVisible = true
        this.itemId = itemId
      }
    },
    // 点击全选执行的方法
    handleCheckAllChange(val) {
      val ? this.merchantList.formEach(merchant => {
        this.merchantIds.push(merchant.id)
      }) : this.merchantIds.splice(0)
      this.isIndeterminate = false
    },
    // 选择商铺时执行的方法
    handleCheckMerchantChange(val) {
      this.checkAll = val.length === this.merchantList.length
      this.isIndeterminate = val.length > 0 && val.length < this.merchantList.length
    },
    currentChange(page) {
      this.getAdvertisements(Object.assign(this.pagination, { page }))
    },
    addBanner() {
      this.$router.push({
        path: '/system/add-banner'
      })
    }
  },
  mounted() {
    this.getAdvertisements(this.pagination)
  }
}
</script>