<template>
  <el-row class="order-acception-container">
    <!--切换接单内容-->
    <el-card class="box-card">
      <el-col :span="22" :offset="2">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="处理状态">
            <el-radio-group v-model="form.status">
              <el-radio label="0">新订单</el-radio>
              <el-radio label="1">已处理</el-radio>
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
            <span type="text">待发配送</span>
          </div>
          <el-row>
            <el-table :data="orderAcceptions" style="width: 100%" :show-header="false" stripe>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form :model="props.row" label-position="right" class="demo-table-expand">
                    <!--备注-->
                    <el-form-item label="备注:">
                      <span>{{ props.row.remark }}</span>
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
                      <span>{{props.row.deliverMoney}}</span>
                    </el-form-item>
                    <el-form-item label="小计:">
                      <span>{{props.row.totalPrice}}</span>
                    </el-form-item>
                    <el-form-item label="活动减免:">
                      <span>{{props.row.activityMoney}}</span>
                    </el-form-item>
                    <el-form-item label="优惠券:">
                      <span>{{props.row.targetName}}</span>
                    </el-form-item>
                    <el-form-item label="平台佣金:">
                      <span>{{props.row.platformCommission}}</span>
                    </el-form-item>
                    <el-form-item label="本单预计收入:">
                      <span style="color: orange;font-size: 18px;">{{props.row.orderIncome}}</span>
                    </el-form-item>
                    <el-form-item label="本顾客实际支付:">
                      <span style="color: orange;font-size: 18px;">{{props.row.realTotalMoney}}</span>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="danger" plain size="mini" @click="cancelOrder">取消订单并退款</el-button>
                      <el-button type="primary" plain size="mini" @click="printOrder">打印订单</el-button>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="">
                <template slot-scope="props">
                  <el-row class="card-content">
                    <el-col :span="20">
                      <h3>{{props.row.userName}}</h3>
                    </el-col>
                    <el-col :span="20">
                      <label>订单号:</label>
                      <span>{{props.row.orderNo}}</span>
                    </el-col>
                    <el-col :span="20">
                      <label>下单时间:</label>
                      <span>{{props.row.createdAt}}</span>
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
              <el-table-column label="" prop="name" width="95">
                <template slot-scope="props">
                  <el-row class="card-content">
                    <el-button size="mini" type="primary" plain>发起配送</el-button>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </el-col>
      <!--商家关注信息-->
      <!-- <el-col :span="10" class="order-summary">
        <el-card>
          <div slot="header" class="clearfix">
            <span>今日订单概况</span>
          </div>
          <el-row class="card-content">
            <el-col>
              <label for="">已接订单:</label>
              <b>1</b>
              <span>笔</span>
            </el-col>
            <el-col>
              <label for="">今日营业总额:</label>
              <b>115</b>
              <span>元</span>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span>需关注订单</span>
          </div>
          <el-row>
            <el-col :span="24">
              <el-col :span="12">
                <label for="">紧急预订单：</label>
                <span>
                  <b>0</b>笔</span>
              </el-col>
              <el-col :span="12">
                <a href="#">查看订单
                  <i class="el-icon-arrow-right"></i>
                </a>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="12">
                <label for="">被取消配送：</label>
                <span>
                  <b>0</b>笔</span>
              </el-col>
              <el-col :span="12">
                <a href="#">查看订单
                  <i class="el-icon-arrow-right"></i>
                </a>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="12">
                <label for="">待发配送：</label>
                <span>
                  <b>0</b>笔</span>
              </el-col>
              <el-col :span="12">
                <a href="#">查看订单
                  <i class="el-icon-arrow-right"></i>
                </a>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="12">
                <label for="">未处理退款：</label>
                <span>
                  <b>0</b>笔</span>
              </el-col>
              <el-col :span="12">
                <a href="#">查看订单
                  <i class="el-icon-arrow-right"></i>
                </a>
              </el-col>
            </el-col>
          </el-row>
        </el-card>
      </el-col> -->
    </el-row>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" v-loading="loading" style="height:30px;"></div>
  </el-row>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        status: '0'
      },
      boxData: [{
        price: 1,
        amount: 'x10',
        total: 10
      }],
      deliveryData: [{
        amount: 6
      }],
      pagination: {
        page: 1,
        rows: 10
      },
      busy: true,
      orderAcceptions: []
    }
  },
  watch: {
    'form.status': {
      handler: function(newValue) {
        this.pagination.page = 1
        this.orderAcceptions.splice(0)
        this.orderAcceptionList.splice(0)
        this.getOrderAcceptionByStatus({ ...this.pagination, status: newValue })
      },
      immediate: true
    },
    orderAcceptionList(newValue, oldValue) {
      if (newValue.length === 0) this.busy = true
      else {
        this.busy = false
        this.orderAcceptions = oldValue.concat(newValue)
      }
    }
  },
  computed: {
    ...mapGetters([
      'orderAcceptionList',
      'loading'
    ])
  },
  methods: {
    ...mapActions({
      getOrderAcceptionList: 'getOrderAcceptionList',
      getOrderAcceptionByStatus: 'getOrderAcceptionByStatus'
    }),
    ...mapMutations({
      showLoading: 'showLoading'
    }),
    // 点击打印订单执行的方法
    printOrder() {
      this.$confirm('确定打印订单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '打印订单成功'
        }).catch(err => console.log(err))
      })
    },
    // 点击打印订单执行的方法
    cancelOrder() {
      this.$confirm('确定取消订单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '取消订单成功'
        }).catch(err => console.log(err))
      })
    },
    loadMore() {
      this.busy = true
      this.showLoading()
      setTimeout(() => {
        this.pagination.page++
        this.getOrderAcceptionByStatus({ ...this.pagination, ...this.form })
      }, 1000)
    }
  }
}
</script>
