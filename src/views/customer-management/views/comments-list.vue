<template>
    <el-row class="order-acception-container">
        <!--切换接单内容-->
        <el-card class="box-card">
            <el-col :span="22" :offset="2">
                <el-form ref="form" :model="form" label-width="80px" style="padding-bottom:15px">
                    <el-form-item label="评价管理">
                        <el-radio-group v-model="form.resrveStatus">
                            <el-radio label="全部"></el-radio>
                            <el-radio label="未回复"></el-radio>
                            <el-radio label="已回复"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="满意程度">
                        <el-radio-group v-model="form.resrveStatus">
                            <el-radio label="全部"></el-radio>
                            <el-radio label="好评"></el-radio>
                            <el-radio label="中评"></el-radio>
                            <el-radio label="差评"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="有无内容">
                        <el-radio-group v-model="form.resrveStatus">
                            <el-radio label="全部"></el-radio>
                            <el-radio label="有内容"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="选择日期">
                        <el-date-picker v-model="datetime" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-card>
        <!--接单信息-->
        <el-row class="order-box">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="card-header clearfix" v-if="true">
                        <el-col :span="20">
                            <label>符合条件的评价:</label>
                            <span>{{feedbacksTotal}}条</span>
                        </el-col>
                        <span type="text">待发配送</span>
                    </div>
                    <el-row>
                        <el-table :data="feedbacks" style="width: 100%" :show-header="false" stripe>
                            <el-table-column label="" prop="id">
                                <template slot-scope="props">
                                    <el-row class="card-content comments-box">
                                        <el-col :span="20">
                                            <label>{{props.row.userName}}</label>
                                            <span>{{props.row.createdAt | Date}}</span>
                                        </el-col>
                                        <el-col :span="20">
                                            <label>商家评分:{{props.row.distributionScore}}</label>
                                            <span></span>
                                        </el-col>
                                        <el-col :span="20">
                                            <label>评论内容:</label>
                                            <span>{{props.row.content}}</span>
                                        </el-col>
                                        <el-col :span="20" class="seller-box">
                                            <label>商品</label>
                                            <el-rate v-model="props.row.goodsScore" disabled show-score text-color="#ff9900" score-template="{value}">
                                            </el-rate>
                                        </el-col>
                                        <el-col :span="20" class="seller-box">
                                            <label>商家</label>
                                            <el-rate v-model="props.row.distributionScore" disabled show-score text-color="#ff9900" score-template="{value}">
                                            </el-rate>
                                            <el-col :span="14">
                                                <el-button type="text">回复</el-button>
                                                <el-button type="text">发券</el-button>
                                                <el-button type="text">举报</el-button>
                                            </el-col>
                                        </el-col>
                                        <span class="order-detail">订单详情</span>
                                    </el-row>
                                </template>
                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="right" class="demo-table-expand">
                                        <!--备注-->
                                        <el-form-item label="备注:">
                                            <span>{{ props.row.remark }}</span>
                                        </el-form-item>
                                        <!--商品信息-->
                                        <el-form-item label="商品信息:">
                                            <el-table :data="props.row.orderItems" style="width: 100%" :show-header="false">
                                                <el-table-column prop="date" label="商品">
                                                </el-table-column>
                                                <el-table-column prop="name" label="单价">
                                                </el-table-column>
                                                <el-table-column prop="address" label="数量">
                                                </el-table-column>
                                                <el-table-column prop="total" label="总价">
                                                </el-table-column>
                                            </el-table>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-form>
                                                <el-form-item label="配送费:">
                                                    <span>{{props.row.deliverMoney}}</span>
                                                </el-form-item>
                                                <el-form-item label="小计:">
                                                    <span>{{props.row.totalMoney}}</span>
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
                                                    <span style="color: orange;font-size: 18px;">{{props.row.orderIncome}}元</span>
                                                </el-form-item>
                                                <el-form-item label="本顾客实际支付:">
                                                    <span style="color: orange;font-size: 18px;">{{props.row.realTotalMoney}}元</span>
                                                </el-form-item>
                                            </el-form>
                                        </el-form-item>
                                        <el-form-item>
                                            <template slot-scope="props">
                                                <el-button type="danger" plain size="mini" @click="cancelOrder">取消订单并退款</el-button>
                                                <el-button type="primary" plain size="mini" @click="printOrder">打印订单</el-button>
                                            </template>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" v-loading="loading" style="height:30px;"></div>
    </el-row>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {},
      datetime: '',
      tableData: [{
        date: '3俩卤粉',
        name: 8,
        address: 'x1',
        total: 8
      }, {
        date: '2俩卤粉加牛肉',
        name: 12,
        address: 'x3',
        total: 36
      }, {
        date: '煎饺',
        name: 8,
        address: 'x2',
        total: 16
      }, {
        date: '凉拌皮蛋',
        name: 3,
        address: 'x4',
        total: 12
      }],
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
      feedbacks: []
    }
  },
  watch: {
    feedbacksList(newValue, oldValue) {
    //   newValue.length === 0 && (this.busy = true) || (this.busy = false)
      if (newValue.length === 0) {
        this.busy = true
        this.feedbacks = oldValue
      } else {
        this.busy = false
        this.feedbacks = oldValue.concat(newValue)
      }
    }
  },
  computed: {
    ...mapGetters([
      'feedbacksList',
      'feedbacksTotal',
      'loading'
    ])
  },
  methods: {
    ...mapActions({
      getFeedbacksList: 'getFeedbacksList',
      getFeedbacksPage: 'getFeedbacksPage'
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
        this.getFeedbacksPage({ ...this.pagination, merchantId: sessionStorage.getItem('merchantId') })
      }, 1000)
    }
  },
  mounted() {
    // this.getFeedbacksList(sessionStorage.getItem('userId'))
    this.getFeedbacksPage({ ...this.pagination, merchantId: sessionStorage.getItem('merchantId') })
  }
}
</script>
