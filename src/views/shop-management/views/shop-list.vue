<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入店铺名称"
          v-model="pagination.name"></el-input>
      </el-col>
      <el-button type="primary"
        icon="el-icon-search"
        @click="getShopList(pagination)">搜索</el-button>
    </el-row>
    <!--店铺信息列表-->
    <el-row class="order-statics">
      <lc-table :columns="columns"
        :data="shopList">
        <el-button slot="merchantName"
          slot-scope="{row}"
          type="text"
          @click="showMemberDetail(row)">{{row.name}}</el-button>
        <el-tag slot="status"
          slot-scope="{row}"
          :type="Number(row.isOnline) === 1 ? 'primary' : 'danger'">{{row.isOnline | isOnline}}</el-tag>
        <el-button slot="operation"
          slot-scope="{row}"
          type="primary"
          size="mini"
          @click="showShopEdit(row.id)">编辑</el-button>
      </lc-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="shopTotal"
      :page="pagination.page"
      :rows="pagination.rows"
      :currentChange="currentChange"></pagination>
    <!--店铺详情信息对话框-->
    <el-dialog title="店铺详情"
      class="shop-detail"
      :visible.sync="dialogDetailVisible">
      <el-form inline
        :model="shopDetail"
        size="mini">
        <el-form-item label="店铺名称："
          label-width="120px">
          <span>{{shopDetail.name}}</span>
        </el-form-item>
        <el-form-item label="店铺编号："
          label-width="120px">
          <span>{{shopDetail.code}}</span>
        </el-form-item>
        <el-form-item label="店铺类型："
          label-width="120px">
          <span>{{shopDetail.typeName}}</span>
        </el-form-item>
        <el-form-item label="联系电话："
          label-width="120px">
          <span>{{shopDetail.tel}}</span>
        </el-form-item>
        <el-form-item label="地址："
          label-width="120px">
          <span>{{shopDetail.address}}</span>
        </el-form-item>
        <el-form-item label="本月营业额："
          label-width="120px">
          <span>{{shopDetail.monthPrice}}</span>
        </el-form-item>
        <el-form-item label="本月订单数："
          label-width="120px">
          <span>{{shopDetail.monthOrder}}</span>
        </el-form-item>
        <el-form-item label="商品数量："
          label-width="120px">
          <span>{{shopDetail.itemCount}}</span>
        </el-form-item>
        <el-form-item label="分类数量："
          label-width="120px">
          <span>{{shopDetail.itemTypeCount}}</span>
        </el-form-item>
        <el-form-item label="评分："
          label-width="120px">
          <span>{{shopDetail.activityQuantity}}</span>
        </el-form-item>
        <el-form-item label="活动："
          label-width="120px">
          <span>{{shopDetail.activityCount}}</span>
        </el-form-item>
        <el-form-item label="店铺状态："
          label-width="120px">
          <span>{{shopDetail.isOnline}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button size="mini"
          type="primary"
          @click="dialogDetailVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑店铺信息对话框-->
    <el-dialog class="member-editor"
      title="编辑店铺"
      :visible.sync="dialogFormVisible">
      <el-form :model="shopForEdit"
        size="mini">
        <el-form-item label="店铺名称"
          label-width="120px">
          <el-input v-model="shopForEdit.name"
            auto-complete="off"
            placeholder="请填写活动类型"></el-input>
        </el-form-item>
        <el-form-item label="店铺编号"
          label-width="120px">
          <el-input v-model="shopForEdit.code"
            auto-complete="off"
            placeholder="请填写活动编号"></el-input>
        </el-form-item>
        <el-form-item label="店铺类型"
          label-width="120px">
          <el-select v-model="shopForEdit.typeId"
            placeholder="请选择店铺类型">
            <el-option v-for="item in shopTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话"
          label-width="120px">
          <el-input v-model="shopForEdit.tel"
            auto-complete="off"
            placeholder="请填写活动名称"></el-input>
        </el-form-item>
        <el-form-item label="地址"
          label-width="120px">
          <el-input v-model="shopForEdit.address"
            auto-complete="off"
            placeholder="请填写地址"></el-input>
        </el-form-item>
        <!-- <el-form-item label="本月营业额" label-width="120px">
          <el-input v-model="shopList.monthPrice" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="本月订单数" label-width="120px">
          <el-input v-model="shopForEdit.monthCount" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" label-width="120px">
          <el-input v-model="shopForEdit.itemCount" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="分类数量" label-width="120px">
          <el-input v-model="shopForEdit.itemTypeCount" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="评分" label-width="120px">
          <el-input v-model="shopForEdit.activityQuantity" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item> -->
        <el-form-item label="店铺状态"
          label-width="120px">
          <el-radio-group v-model="shopForEdit.isOnline">
            <el-radio label="1">上线店铺</el-radio>
            <el-radio label="0">关闭店铺</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button size="mini"
          @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini"
          type="primary"
          @click="editShopConfirm">确 定</el-button>
      </div>
    </el-dialog>

  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      pagination: {// 分页信息
        page: 1,
        rows: 10,
        name: ''// 商铺名称
      },
      dialogDetailVisible: false,
      dialogFormVisible: false,
      shopDetail: {}, // 商户详情信息
      columns: [{
        label: '序号',
        type: 'index',
        index: 1
      }, {
        label: '店铺名称',
        slot: 'merchantName'
      }, {
        label: '店铺编号',
        prop: 'code'
      }, {
        label: '店铺类型',
        prop: 'typeName'
      }, {
        label: '联系电话',
        prop: 'tel'
      }, {
        label: '地址',
        prop: 'address'
      }, {
        label: '本月营业额',
        prop: 'monthPrice'
      }, {
        label: '本月订单数',
        prop: 'monthOrder'
      }, {
        label: '商品数量',
        prop: 'itemCount'
      }, {
        label: '分类数量',
        prop: 'itemTypeCount'
      }, {
        label: '评分',
        prop: 'activityQuantity'
      }, {
        label: '活动',
        prop: 'activityCount'
      }, {
        label: '状态',
        slot: 'status'
      }, {
        label: '操作',
        slot: 'operation'
      }]
    }
  },
  watch: {
    editShopResult(newValue) {
      newValue.code === 200 && (this.dialogFormVisible = false)
    }
  },
  computed: {
    ...mapGetters([
      'shopList',
      'shopTotal',
      'shopForEdit',
      'editShopResult',
      'shopTypeList'
    ])
  },
  methods: {
    ...mapActions({
      getShopList: 'getShopList',
      editShop: 'editShop',
      getShopForEdit: 'getShopForEdit',
      getShopTypeList: 'getShopTypeList'
    }),
    // 点击详情执行的方法
    showMemberDetail(row) {
      this.dialogDetailVisible = true
      this.shopDetail = row
    },
    // 点击编辑执行的方法
    showShopEdit(id) {
      this.$router.push({
        path: `/shop/edit/${id}`
      })
    },
    // 确定编辑商户信息
    editShopConfirm() {
      this.editShop(this.shopForEdit)
    },
    currentChange(page) {
      this.getShopList(Object.assign(this.pagination, { page }))
    }
  },
  mounted() {
    this.getShopList(this.pagination)
  }
}
</script>
