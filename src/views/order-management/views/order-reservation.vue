<template>
  <el-row class="order-acception-container">
    <!--切换接单内容-->
    <el-card class="box-card">
      <el-col :span="22"
        :offset="2">
        <el-form ref="form"
          :model="form"
          label-width="80px">
          <el-form-item label="处理状态">
            <el-radio-group v-model="form.status">
              <el-radio :label="2">未处理</el-radio>
              <el-radio :label="3">已处理</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
    <!--接单信息-->
    <el-row class="order-box"
      :gutter="20">
      <el-col>
        <el-card class="box-card">
          <div slot="header"
            class="card-header clearfix"
            v-if="true">
            <el-col :span="20">
              <label>预定今日</label> |
              <!-- <label>14:00</label> -->
              <span>送达</span>
            </el-col>
            <!-- <span type="text">待发配送</span> -->
          </div>
          <el-row>
            <el-table :data="orderReservations"
              style="width: 100%"
              :show-header="false"
              stripe>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right"
                    class="demo-table-expand">
                    <!--备注-->
                    <el-form-item label="备注:">
                      <span>{{ props.row.remark }}</span>
                    </el-form-item>
                    <el-form-item label="用餐人数:">
                      <span style="float:left">{{props.row.meals || 1}}人</span>
                    </el-form-item>
                    <!--商品信息-->
                    <el-form-item label="商品信息:">
                      <el-table :data="props.row.orderItems"
                        style="width: 100%"
                        :show-header="false">
                        <el-table-column prop="itemName"
                          label="商品"></el-table-column>
                        <el-table-column prop="itemPrice"
                          label="单价">
                          <template slot-scope="props">
                            ￥{{props.row.itemPrice}}
                          </template>
                        </el-table-column>
                        <el-table-column label="数量">
                          <template slot-scope="prop">
                            {{`x ${prop.row.itemNums}`}}
                          </template>
                        </el-table-column>
                        <el-table-column label="总价">
                          <template slot-scope="prop">
                            ￥{{prop.row.itemPrice * prop.row.itemNums}}
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                    <el-form-item>
                      <el-form>
                        <el-form-item label="餐盒费:">
                          <span>￥{{props.row.packingCharge}}</span>
                        </el-form-item>
                        <el-form-item label="配送费:">
                          <span>￥{{props.row.deliverMoney}}</span>
                        </el-form-item>
                        <el-form-item label="小计:">
                          <span>￥{{props.row.totalPrice}}</span>
                        </el-form-item>
                        <el-form-item label="活动减免:">
                          <span>￥{{props.row.activityMoney}}</span>
                        </el-form-item>
                        <el-form-item label="优惠券:">
                          <span>￥{{props.row.couponMoney}}</span>
                        </el-form-item>
                        <el-form-item label="平台佣金:">
                          <span>￥{{props.row.platformCommission}}</span>
                        </el-form-item>
                        <!-- <el-form-item label="本单预计收入:">
                          <span style="color: orange;font-size: 18px;">{{props.row.orderIncome}}</span>
                        </el-form-item> -->
                        <el-form-item label="本顾客实际支付:">
                          <span style="color: orange;font-size: 18px;">￥{{props.row.realTotalMoney}}</span>
                        </el-form-item>
                      </el-form>
                    </el-form-item>
                    <el-form-item>
                      <!-- <el-button type="danger" plain size="mini" @click="cancelOrder(props.row)">取消订单并退款</el-button>
                      <el-button type="danger" plain size="mini" @click="partCancelOrder(props.row)">部分退款</el-button> -->
                      <el-button type="primary"
                        plain
                        size="mini"
                        @click="printOrder(props.row)">打印订单</el-button>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="">
                <template slot-scope="props">
                  <el-row class="card-content">
                    <el-col :span="3"
                      style="float:right"
                      v-if="props.row.status === '7' || props.row.status === 7">
                      <el-alert title="已退款"
                        type="error"
                        description=""
                        show-icon
                        :closable="false">
                      </el-alert>
                    </el-col>
                    <el-col :span="20">
                      <h3>{{props.row.userName}}</h3>
                    </el-col>
                    <el-col :span="20">
                      <label>订单号:</label>
                      <span>{{props.row.orderNo}}</span>
                    </el-col>
                    <el-col :span="20">
                      <label>下单时间:</label>
                      <span>{{props.row.createdAt | Date}}</span>
                    </el-col>
                    <el-col :span="20"
                      v-if="props.row.reservationDate">
                      <label for="">期望时间:</label>
                      <span>{{props.row.reservationDate | Date}}</span>
                    </el-col>
                    <el-col :span="20"
                      v-else>
                      <label for="">立即配送</label>
                    </el-col>
                    <span type="text">待发配送</span>
                    <el-col>
                      <label for="">电话:</label>
                      <span>{{props.row.userPhone}}</span>
                    </el-col>
                    <el-col :span="18">
                      <label for="">地址:</label>
                      <span>{{props.row.userAddress}}</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label=""
                prop="name"
                width="95">
                <template slot-scope="props">
                  <el-row class="card-content">
                    <el-button size="mini"
                      type="primary"
                      plain
                      @click="distributionConfirm(props.row.id)"
                      v-if="props.row.status === '2' || 2 ">发起配送</el-button>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--订单退款对话框-->
    <el-dialog class="member-editor"
      title="订单退款"
      :visible.sync="dialogFormVisible">
      <el-form :model="refundForm"
        size="small"
        :rules="rule"
        ref="refundForm">
        <el-form-item label="请输入退款金额"
          label-width="120px"
          prop="totalPrice">
          <el-input v-model="refundForm.totalPrice"
            placeholder="请选填写退款金额">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button size="small"
          @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small"
          type="primary"
          @click="partCancelOrderConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <div v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="20"
      v-loading="loading"
      style="height:30px;"></div>
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
        status: 2
      },
      rule: {
        totalPrice: [
          { required: true, message: '请输入退款金额', trigger: 'blur' },
          { validator: IsSupremePayment, message: '退款金额不能大于顾客实际付款' }
        ]
      },
      pagination: {
        page: 1,
        rows: 10
      },
      refundForm: {
        totalPrice: '',
        orderId: '',
        size: '',
        name: ''
      },
      totalPrice: '',
      orderReservations: [],
      busy: true,
      dialogFormVisible: false
    }
  },
  watch: {
    'form.status': {
      handler: function(newValue) {
        this.pagination.page = 1
        this.orderReservations.splice(0)
        this.orderReservationList.splice(0)
        this.getOrderReservationByStatus({ ...this.pagination, status: newValue })
      },
      immediate: true
    },
    orderReservationList(newValue, oldValue) {
      if (newValue.length === 0) this.busy = true
      else {
        this.busy = false
        this.orderReservations = this.orderReservations.concat(newValue)
      }
    },
    retreatResult() {
      this.getOrderReservationByStatus({ ...this.pagination, ...this.form })
      this.dialogFormVisible = false
    }
  },
  computed: {
    ...mapGetters([
      'orderReservationList',
      'loading',
      'retreatResult'
    ])
  },
  methods: {
    ...mapActions({
      getOrderReservationList: 'getOrderReservationList',
      getOrderReservationByStatus: 'getOrderReservationByStatus',
      retreatOrder: 'retreatOrder',
      distributionOrder: 'distributionOrder'
    }),
    ...mapMutations({
      showLoading: 'showLoading',
      printOrder: 'printOrder'
    }),
    // 点击打印订单执行的方法
    cancelOrder(refundOrder) {
      this.$confirm('确定取消订单并且退款？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let totalNums = 0
        if (refundOrder.orderItems.length) {
          refundOrder.orderItems.forEach(item => {
            totalNums += item.itemNums
          })
        } else totalNums = refundOrder.orderItems.itemNums
        this.retreatOrder({
          orderId: refundOrder.id,
          size: totalNums,
          totalPrice: refundOrder.totalPrice,
          name: refundOrder.userName
        })
      }).catch(err => console.log(err))
    },
    // 点击部分退款时执行的方法
    partCancelOrder(refundOrder) {
      this.dialogFormVisible = true
      this.totalPrice = refundOrder.orders.totalPrice
      let totalNums = 0
      if (refundOrder.orderItems.length) {
        refundOrder.orderItems.forEach(item => {
          totalNums += item.itemNums
        })
      } else totalNums = refundOrder.orderItems.itemNums
      this.refundForm = {
        orderId: refundOrder.orders.id,
        totalPrice: '',
        size: totalNums,
        name: refundOrder.name
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
        this.getOrderReservationByStatus({ ...this.pagination, ...this.form })
      }, 1000)
    },
    distributionConfirm(id) {
      this.$confirm('确定发起配送?', '提示', {
        type: 'warning'
      }).then(() => {
        this.distributionOrder(id)
      }).catch(err => console.log(err))
    }
  }
}
</script>
