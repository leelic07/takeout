<template>
  <el-row class="order-acception-container">
    <!--切换接单内容-->
    <el-card class="box-card">
      <el-col :span="22"
        :offset="2">
        <el-form ref="form"
          :model="form"
          label-width="80px"
          style="padding-bottom:15px">
          <el-form-item label="选择店铺"
            v-if="type === '1'">
            <el-select v-model="pagination.merchantId"
              placeholder="请选择店铺"
              size="small"
              @change="merchantChange">
              <el-option value=""
                label="全部店铺"></el-option>
              <el-option v-for="(merchant,index) in merchantList"
                :key="index"
                :value="merchant.id"
                :label="merchant.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="满意程度">
            <el-radio-group v-model="form.evaluate">
              <el-radio label="">全部</el-radio>
              <el-radio label="3">好评</el-radio>
              <el-radio label="2">中评</el-radio>
              <el-radio label="1">差评</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
    <!--接单信息-->
    <el-row class="order-box">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header"
            class="card-header clearfix"
            v-if="true">
            <el-col :span="20">
              <label>符合条件的评价:</label>
              <span>{{feedbacksTotal}}条</span>
            </el-col>
            <!-- <span type="text">待发配送</span> -->
          </div>
          <el-row>
            <el-table :data="feedbacks"
              style="width: 100%"
              :show-header="false"
              stripe>
              <el-table-column label="">
                <template slot-scope="props">
                  <el-row class="card-content comments-box">
                    <el-col :span="20">
                      <label>{{props.row.users ? props.row.users.userName : '匿名'}}</label>
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
                    <el-col v-for="(sub,index) in props.row.subFeedbacks"
                      :key="index"
                      :span="20">
                      <label for="">
                        <!-- <span>{{props.row.createdAt | Date}}</span> -->
                        回复
                        <span>{{props.row.users ? props.row.users.userName : '匿名'}}:</span>
                      </label>
                      <span>{{sub.content}}</span>
                    </el-col>
                    <el-col :span="20"
                      class="seller-box">
                      <label>商品</label>
                      <el-rate v-model="props.row.goodsScore"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                      </el-rate>
                    </el-col>
                    <el-col :span="20"
                      class="seller-box">
                      <label>配送</label>
                      <el-rate v-model="props.row.distributionScore"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                      </el-rate>
                      <el-col :span="14">
                        <el-button type="text"
                          v-if="type !== '1'"
                          @click="showReply(props.row.id)">回复</el-button>
                        <el-button type="text"
                          @click="sendCoupon(props.row.userId)">发券</el-button>
                        <!-- <el-button type="text">举报</el-button> -->
                      </el-col>
                    </el-col>
                    <span class="order-detail">订单详情</span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form :data="props.row.orders"
                    label-position="right"
                    class="demo-table-expand">
                    <!--备注-->
                    <el-form-item label="备注:">
                      <span>{{ props.row.orders.remark }}</span>
                    </el-form-item>
                    <!--商品信息-->
                    <el-form-item label="商品信息:">
                      <el-table :data="props.row.orders.orderItems"
                        style="width: 100%"
                        :show-header="false">
                        <el-table-column prop="itemName"
                          label="商品">
                        </el-table-column>
                        <el-table-column label="单价">
                          <template slot-scope="props">
                            ￥{{props.row.itemPrice}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="itemNums"
                          label="数量">
                        </el-table-column>
                        <el-table-column label="总价">
                          <template slot-scope="props">
                            ￥{{props.row.totalPrice}}
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                    <el-form-item>
                      <el-form>
                        <el-form-item label="餐盒费:">
                          <span>￥{{props.row.orders.packingCharge}}</span>
                        </el-form-item>
                        <el-form-item label="配送费:">
                          <span>￥{{props.row.orders.deliverMoney}}</span>
                        </el-form-item>
                        <el-form-item label="小计:">
                          <span>￥{{props.row.orders.totalPrice}}</span>
                        </el-form-item>
                        <el-form-item label="活动减免:">
                          <span>￥{{props.row.orders.activityMoney}}</span>
                        </el-form-item>
                        <el-form-item label="优惠券:">
                          <span>￥{{props.row.orders.coupons}}</span>
                        </el-form-item>
                        <el-form-item label="平台佣金:">
                          <span>￥{{props.row.platformCommission}}</span>
                        </el-form-item>
                        <!-- <el-form-item label="本单预计收入:">
                                                    <span style="color: orange;font-size: 18px;">{{props.row.orderIncome}}元</span>
                                                </el-form-item> -->
                        <el-form-item label="本顾客实际支付:">
                          <span style="color: orange;font-size: 18px;">￥{{props.row.orders.realTotalMoney}}</span>
                        </el-form-item>
                      </el-form>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary"
                        plain
                        size="mini"
                        @click="printOrder(props.row.orders)">打印订单</el-button>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--会员送券对话框-->
    <el-dialog class="member-editor"
      title="会员送券"
      :visible.sync="dialogFormVisible">
      <el-form :model="userForEdit"
        size="small"
        :rules="rule"
        ref="couponForm">
        <el-form-item label="选择优惠券"
          label-width="120px"
          prop="couponId">
          <el-select v-model="userForEdit.couponId"
            placeholder="请选择会优惠券">
            <el-option v-for="item in backCouponList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button size="small"
          @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small"
          type="primary"
          @click="sendCouponConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!--回复会员评价-->
    <el-dialog class="member-editor"
      title="回复评价"
      :visible.sync="dialogReplyVisible">
      <el-form :model="replyForm"
        size="small"
        :rules="replyRule"
        ref="replyForm">
        <el-form-item label="回复内容"
          label-width="120px"
          prop="content">
          <el-input type="textarea"
            v-model="replyForm.content"
            placeholder="请填写回复内容"
            :autosize="{minRows:5, maxRows:25}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button size="small"
          @click="dialogReplyVisible = false">取 消</el-button>
        <el-button size="small"
          type="primary"
          @click="replyFeedbacksConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <div v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="20"
      v-loading="loading"></div>
  </el-row>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        evaluate: ''
      },
      datetime: '',
      pagination: {
        page: 1,
        rows: 5,
        merchantId: ''
      },
      busy: true,
      feedbacks: [],
      replyForm: {
        content: '',
        pid: ''
      },
      dialogFormVisible: false,
      dialogReplyVisible: false,
      rule: {
        couponId: [{ required: true, message: '请选择优惠券', trigger: 'blur' }]
      },
      replyRule: {
        content: [{ required: true, message: '请填写回复内容', trigger: 'blur' }]
      }
    }
  },
  watch: {
    feedbacksList(newValue, oldValue) {
      if (newValue.length === 0) this.busy = true
      else {
        this.busy = false
        this.feedbacks = this.feedbacks.concat(newValue)
      }
    },
    sendCouponResult() {
      this.dialogFormVisible = false
    },
    'form.evaluate'(newValue) {
      this.feedbacks.splice(0)
      this.pagination.page = 1
      this.getFeedbacksPage({ ...this.pagination, ...this.form })
    },
    replyResult() {
      this.feedbacks.forEach(feed => {
        if (feed.id === this.replyForm.pid) {
          feed.subFeedbacks.push({
            content: this.replyForm.content
          })
        }
      })
      this.dialogReplyVisible = false
      this.replyForm.content = ''
    }
  },
  computed: {
    ...mapGetters([
      'feedbacksList',
      'feedbacksTotal',
      'loading',
      'backCouponList',
      'userForEdit',
      'sendCouponResult',
      'merchantList',
      'replyResult'
    ]),
    type() {
      return sessionStorage.getItem('type')
    },
    merchantId() {
      return Number(sessionStorage.getItem('merchantId'))
    }
  },
  methods: {
    ...mapActions({
      getFeedbacksList: 'getFeedbacksList',
      getFeedbacksPage: 'getFeedbacksPage',
      getBackCouponList: 'getBackCouponList',
      editUser: 'editUser',
      sendCouponToUser: 'sendCouponToUser',
      getMerchantsList: 'getMerchantsList',
      replyFeedbacks: 'replyFeedbacks'
    }),
    ...mapMutations({
      showLoading: 'showLoading',
      printOrder: 'printOrder'
    }),
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
        })
      })
    },
    loadMore() {
      this.busy = true
      this.showLoading()
      setTimeout(() => {
        this.pagination.page++
        this.getFeedbacksPage({ ...this.pagination, ...this.form })
      }, 1000)
    },
    sendCoupon(id) {
      this.dialogFormVisible = true
      this.editUser(id)
      this.getBackCouponList()
    },
    sendCouponConfirm() {
      this.$refs.couponForm.validate(valid => {
        if (valid) this.sendCouponToUser(this.userForEdit)
        else console.log('sendCoupon err')
      })
    },
    merchantChange() {
      this.feedbacks.splice(0)
      this.pagination.page = 1
      this.getFeedbacksPage({ ...this.pagination, ...this.form })
    },
    showReply(pid) {
      this.dialogReplyVisible = true
      this.replyForm.pid = pid
    },
    replyFeedbacksConfirm() {
      this.$refs.replyForm.validate(valid => {
        if (valid) this.replyFeedbacks(this.replyForm)
        else console.log('reply err')
      })
    }
  },
  mounted() {
    this.merchantId && (this.pagination.merchantId = this.merchantId)
    this.getFeedbacksPage({ ...this.pagination, ...this.form })
    this.getMerchantsList()
  }
}
</script>

<style lang="scss" scoped>
.order-acception-container {
  & /deep/ .el-dialog {
    width: 40%;
  }
}
</style>

