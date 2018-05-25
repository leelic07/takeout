<template>
  <el-row class="order-acception-container">
    <!--切换接单内容-->
    <el-card class="box-card">
      <el-col :span="22" :offset="2">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="选择店铺" v-if="type === '1'">
            <el-select v-model="pagination.merchantId" placeholder="请选择店铺" size="small" @change="merchantChange">
              <el-option value="" label="全部店铺"></el-option>
              <el-option v-for="(merchant,index) in merchantList" :key="index" :value="merchant.id" :label="merchant.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理状态">
            <el-radio-group v-model="form.status">
              <el-radio label="0">未退单</el-radio>
              <el-radio label="1">已退单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
    <!--接单信息-->
    <el-row class="order-box" :gutter="20">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="card-header clearfix" v-if="true">
            <el-col :span="20">
              <label>预定今日</label> |
              <label>14:00</label>
              <span>送达</span>
            </el-col>
            <!-- <span type="text">待发配送</span> -->
          </div>
          <el-row>
            <el-table :data="orderRetreats" style="width: 100%" :show-header="false" stripe>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form :model="props.row" label-position="right" class="demo-table-expand">
                    <!--备注-->
                    <el-form-item label="备注:">
                      <span>{{ props.row.orders.remark }}</span>
                    </el-form-item>
                    <!--商品信息-->
                    <el-form-item label="商品信息:">
                      <el-table :data="props.row.orderItems" style="width: 100%" :show-header="false">
                        <el-table-column prop="itemName" label="商品">
                        </el-table-column>
                        <el-table-column prop="itemPrice" label="单价">
                        </el-table-column>
                        <el-table-column label="数量">
                          <template slot-scope="prop">
                            {{`x ${prop.row.itemNums}`}}
                          </template>
                        </el-table-column>
                        <el-table-column label="总价">
                          <template slot-scope="prop">
                            {{prop.row.itemPrice * prop.row.itemNums}}
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                    <el-form-item label="配送费:">
                      <span>{{props.row.orders.deliverMoney}}</span>
                    </el-form-item>
                    <el-form-item label="小计:">
                      <span>{{props.row.orders.totalPrice}}</span>
                    </el-form-item>
                    <el-form-item label="活动减免:">
                      <span>{{props.row.orders.activityMoney}}</span>
                    </el-form-item>
                    <el-form-item label="优惠券:">
                      <span>{{props.row.orders.couponMoney}}</span>
                    </el-form-item>
                    <el-form-item label="平台佣金:">
                      <span>{{props.row.orders.platformCommission}}</span>
                    </el-form-item>
                    <!-- <el-form-item label="本单预计收入:">
                      <span style="color: orange;font-size: 18px;"></span>
                    </el-form-item> -->
                    <el-form-item label="本顾客实际支付:">
                      <span style="color: orange;font-size: 18px;">{{props.row.orders.realTotalMoney}}</span>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="danger" plain size="mini" @click="cancelOrder(props.row)" v-if="props.row.orders.isRefund === 0 && type !== '1'">取消订单并退款</el-button>
                      <el-button type="danger" plain size="mini" @click="partCancelOrder(props.row)" v-if="props.row.orders.isRefund === 0 && type !== '1'">部分退款</el-button>
                      <el-button type="primary" plain size="mini" @click="printOrder(props.row.orders)">打印订单</el-button>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="">
                <template slot-scope="props">
                  <el-row class="card-content">
                    <el-col :span="20">
                      <h3>{{props.row.orders.name}}</h3>
                    </el-col>
                    <el-col :span="20">
                      <label>订单号:</label>
                      <span>{{props.row.orders.orderNo}}</span>
                    </el-col>
                    <el-col :span="20">
                      <label>下单时间:</label>
                      <span>{{props.row.orders.createdAt | Date}}</span>
                    </el-col>
                    <el-col>
                      <label for="">电话:</label>
                      <span>{{props.row.orders.userPhone}}</span>
                    </el-col>
                    <el-col :span="18">
                      <label for="">地址:</label>
                      <span>{{props.row.orders.userAddress}}</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--订单退款对话框-->
    <el-dialog class="member-editor" title="订单退款" :visible.sync="dialogFormVisible">
      <el-form :model="refundForm" size="small" :rules="rule" ref="refundForm">
        <el-form-item label="请输入退款金额" label-width="120px" prop="totalPrice">
          <el-input v-model="refundForm.totalPrice" placeholder="请选填写退款金额">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="partCancelOrderConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" v-loading="loading" style="height:30px;"></div>
  </el-row>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    const IsSupremePayment = (rule, value, callback) => {
      if (this.totalPrice < value) callback(new Error('退款金额不能大于实际支付金额'))
      else callback()
    }
    return {
      form: {
        status: '0'
      },
      rule: {
        totalPrice: [
          { required: true, message: '请输入退款金额', trigger: 'blur' },
          { validator: IsSupremePayment, message: '退款金额不能大于顾客实际付款' }
        ]
      },
      pagination: {
        page: 1,
        rows: 10,
        merchantId: ''
      },
      orderRetreats: [],
      totalPrice: '',
      busy: true,
      refundForm: {
        totalPrice: '',
        orderId: '',
        refundNo: ''
      },
      dialogFormVisible: false
    }
  },
  watch: {
    'form.status': {
      handler: function(newValue) {
        this.pagination.page = 1
        this.orderRetreats.splice(0)
        this.orderRetreatList.splice(0)
        this.getOrderRetreatByStatus({ ...this.pagination, status: newValue })
      },
      immediate: true
    },
    orderRetreatList(newValue, oldValue) {
      if (newValue.length === 0) this.busy = true
      else {
        this.busy = false
        this.orderRetreats = this.orderRetreats.concat(newValue)
      }
    },
    retreatResult() {
      this.orderRetreats.splice(0)
      this.pagination.page = 1
      this.getOrderRetreatByStatus({ ...this.pagination, ...this.form })
      this.dialogFormVisible = false
    }
  },
  computed: {
    ...mapGetters([
      'orderRetreatList',
      'loading',
      'retreatResult',
      'merchantList'
    ]),
    merchantId() {
      return Number(sessionStorage['merchantId'])
    },
    type() {
      return sessionStorage['type']
    }
  },
  methods: {
    ...mapActions({
      getOrderRetreatList: 'getOrderRetreatList',
      getOrderRetreatByStatus: 'getOrderRetreatByStatus',
      retreatOrder: 'retreatOrder',
      getMerchantsList: 'getMerchantsList'
    }),
    ...mapMutations({
      showLoading: 'showLoading',
      printOrder: 'printOrder'
    }),
    cancelOrder(refundOrder) {
      this.$confirm('确定取消订单并且退款？', '提示', {
        type: 'warning'
      }).then(() => {
        this.retreatOrder({
          orderId: refundOrder.orderId,
          refundNo: refundOrder.refundNo,
          totalPrice: refundOrder.orders.realTotalMoney
        })
      }).catch(err => console.log(err))
    },
    // 点击部分退款时执行的方法
    partCancelOrder(refundOrder) {
      this.dialogFormVisible = true
      this.totalPrice = refundOrder.orders.realTotalMoney
      this.refundForm = {
        orderId: refundOrder.orderId,
        refundNo: refundOrder.refundNo,
        totalPrice: ''
      }
    },
    partCancelOrderConfirm() {
      this.$refs.refundForm.validate(valid => {
        if (valid) this.retreatOrder(this.refundForm)
        else console.log('err retreat')
      })
    },
    loadMore() {
      this.busy = true
      this.showLoading()
      setTimeout(() => {
        this.pagination.page++
        this.getOrderRetreatByStatus({ ...this.pagination, ...this.form })
      }, 1000)
    },
    retreatOrderConfirm() {
      this.$refs.refundForm.validate(valid => {
        if (valid) this.retreatOrder(this.refundForm)
        else console.log('err retreat')
      })
    },
    merchantChange() {
      this.orderRetreats.splice(0)
      this.pagination.page = 1
      this.getOrderRetreatByStatus({ ...this.pagination, ...this.form })
    }
  },
  mounted() {
    this.merchantId && (this.pagination.merchantId = this.merchantId)
    this.getMerchantsList()
  }
}
</script>
