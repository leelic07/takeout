<template>
  <el-row class="system-setup">
    <el-col :span="7" :offset="8">
      <el-card>
        <el-form :model="orderForPrint" id="printJS-form">
          <el-form-item>
            <h1>商家小票</h1>
          </el-form-item>
          <el-form-item>
            <h1>#{{orderForPrint.orderNo}}紫竹林外卖</h1>
          </el-form-item>
          <el-form-item>
            <p>*{{merchantName}}*</p>
          </el-form-item>
          <el-form-item label="下单时间：">
            {{orderForPrint.createdAt | Date}}
          </el-form-item>
          <el-form-item>
            <h2>备注：{{orderForPrint.remark}}</h2>
            <h2>用餐人数：{{orderForPrint.meals || 1}}</h2>
          </el-form-item>
          <el-form-item>
            <el-col>
              <span>商品</span>
            </el-col>
            <table>
              <tr>
                <th>商品名称</th>
                <th>商品数量</th>
                <th>商品价格</th>
              </tr>
              <tr v-for="(order,index) in orderForPrint.orderItems" :key="index">
                <td>{{order.itemName}}</td>
                <td>X{{order.itemNums}}</td>
                <td>{{order.itemPrice * order.itemNums}}</td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <label for="deliver">
              配送费：
              <span id="deliver">{{orderForPrint.deliverMoney || 0}}元</span>
            </label>
            <label for="packing">
              餐盒费：
              <span id="packing">{{orderForPrint.packingCharge || 0}}元</span>
            </label>
            <label for="coupon">
              优惠券减：
              <span id="coupon">{{orderForPrint.couponMoney || 0}}元</span>
            </label>
            <label for="activity">
              活动减：
              <span id="activity">{{orderForPrint.activityMoney || 0}}元</span>
            </label>
          </el-form-item>
          <el-form-item>
            <h1>总计：</h1>
            <h1>￥{{orderForPrint.totalPrice}}</h1>
          </el-form-item>
          <el-form-item>
            <h1>实际支付：</h1>
            <h1>￥{{orderForPrint.realTotalMoney}}</h1>
          </el-form-item>
          <el-form-item>
            <template slot-scope="props">
              <h2>地址：{{orderForPrint.userAddress}}</h2>
              <h2>电话：{{orderForPrint.userPhone}}</h2>
              <h2>姓名：{{orderForPrint.name? orderForPrint.name: orderForPrint.userName}}</h2>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="text" size="medium" class="print-button" @click="printReceipt">打印预览</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Print from 'print-js'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      merchantName: ''
    }
  },
  watch: {
    shopForEdit(newValue) {
      this.merchantName = newValue.name
    }
  },
  computed: {
    ...mapGetters([
      'orderForPrint',
      'shopForEdit'
    ])
  },
  methods: {
    ...mapActions({
      getShopForEdit: 'getShopForEdit'
    }),
    printReceipt() {
      Print({
        printable: 'printJS-form',
        type: 'html',
        // 继承原来的所有样式
        targetStyles: ['*']
      })
    }
  },
  mounted() {
    this.orderForPrint.merchantId && this.getShopForEdit(this.orderForPrint.merchantId)
  }
}
</script>
