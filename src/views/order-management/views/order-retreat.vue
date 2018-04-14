<template>
  <el-row class="order-acception-container">
    <!--切换接单内容-->
    <el-card class="box-card">
      <el-col :span="22" :offset="2">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="处理状态">
            <el-radio-group v-model="form.status">
              <el-radio label="0">未取消</el-radio>
              <el-radio label="1">已取消</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
    <!--接单信息-->
    <el-row class="order-box" :gutter="20">
      <el-col :span="14">
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
            <el-table :data="orderRetreatList" style="width: 100%" :show-header="false" stripe>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right" class="demo-table-expand">
                    <!--备注-->
                    <el-form-item label="备注:">
                      <span>{{ props.row.remark }}</span>
                    </el-form-item>
                    <!--商品信息-->
                    <el-form-item label="商品信息:">
                      <el-table :data="props.row.merchants" style="width: 100%" :show-header="false">
                        <el-table-column prop="date" label="商品">
                        </el-table-column>
                        <el-table-column prop="name" label="单价">
                        </el-table-column>
                        <el-table-column prop="address" label="数量">
                        </el-table-column>
                        <el-table-column prop="total" label="总价">
                        </el-table-column>
                      </el-table>
                      <!--餐盒-->
                      <!-- <el-table :data="boxData" style="width: 100%" :show-header="false">
                        <el-table-column label="餐盒">
                          <template slot-scope="scope">餐盒</template>
                        </el-table-column>
                        <el-table-column prop="price" label="商品">
                        </el-table-column>
                        <el-table-column prop="amount" label="单价">
                        </el-table-column>
                        <el-table-column prop="total" label="数量">
                        </el-table-column>
                      </el-table> -->
                    </el-form-item>
                    <!-- <el-form-item>
                      <el-form> -->
                    <el-form-item label="配送费:">
                      <span>6元</span>
                    </el-form-item>
                    <el-form-item label="小计:">
                      <span>82元</span>
                    </el-form-item>
                    <el-form-item label="活动减免:">
                      <span>8元</span>
                    </el-form-item>
                    <el-form-item label="优惠券:">
                      <span>3元</span>
                    </el-form-item>
                    <el-form-item label="平台佣金:">
                      <span>4.1元</span>
                    </el-form-item>
                    <el-form-item label="本单预计收入:">
                      <span style="color: orange;font-size: 18px;">66.9元</span>
                    </el-form-item>
                    <el-form-item label="本顾客实际支付:">
                      <span style="color: orange;font-size: 18px;">77元</span>
                    </el-form-item>
                    <!-- </el-form>
                    </el-form-item> -->
                    <el-form-item>
                      <el-button type="danger" plain size="mini" @click="cancelOrder">取消订单并退款</el-button>
                      <el-button type="danger" plain size="mini" @click="partCancelOrder">部分退款</el-button>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="" prop="id">
                <template slot-scope="props">
                  <el-row class="card-content">
                    <el-col :span="20">
                      <h3>曾(女士)</h3>
                    </el-col>
                    <el-col :span="20">
                      <label>订单号:</label>
                      <span>112222</span>
                    </el-col>
                    <el-col :span="20">
                      <label>下单时间:</label>
                      <span>2018年3月26日 12:12:12下单</span>
                    </el-col>
                    <span type="text">待发配送</span>
                    <el-col>
                      <label for="">电话:</label>
                      <span>1324564345</span>
                    </el-col>
                    <el-col :span="18">
                      <label for="">地址:</label>
                      <span>湖南省衡阳市蒸湘区华新大道福悦名居B栋</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="" prop="name" width="95">
                <template slot-scope="socpe">
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
      <el-col :span="10" class="order-summary">
        <!--今日订单概况-->
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
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
      }
    }
  },
  watch: {
    'form.status'(newValue) {
      this.getOrderRetreatByStatus({ ...this.pagination, status: newValue })
    }
  },
  computed: {
    ...mapGetters([
      'orderRetreatList'
    ])
  },
  methods: {
    ...mapActions({
      getOrderRetreatList: 'getOrderRetreatList',
      getOrderRetreatByStatus: 'getOrderRetreatByStatus'
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
        }).catch(err => console.log(err))
      })
    },
    // 点击部分退款时执行的方法
    partCancelOrder() {
      this.$confirm('确定部分退款？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '部分退款成功'
        }).catch(err => console.log(err))
      })
    }
  },
  mounted() {
    this.getOrderRetreatByStatus({ ...this.pagination, ...this.form })
  }
}
</script>
