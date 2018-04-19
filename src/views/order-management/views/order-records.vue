<template>
  <el-row class="order-records-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入订单号" v-model="pagination.orderNo"></el-input>
      </el-col>
      <!-- <el-col :span="5" class="records-select">
        <el-input placeholder="请输入姓名" v-model="orderNumber"></el-input>
      </el-col> -->
      <!-- <el-date-picker v-model="datetime" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker> -->
      <el-button type="primary" icon="el-icon-search" @click="getOrderRecordsList(pagination)">搜索</el-button>
    </el-row>
    <!--历史订单信息列表-->
    <el-row class="order-box">
      <el-table :data="orderRecordsList" stripe style="width: 100%">
        <el-table-column type="expand" label="#">
          <template slot-scope="props">
            <el-form :model="props.row" label-position="right" class="demo-table-expand">
              <!--商品信息-->
              <el-form-item label="商品信息:">
                <el-table :data="props.row.orderItems" style="width: 100%" :show-header="false">
                  <el-table-column prop="itemsName" label="商品">
                  </el-table-column>
                  <el-table-column prop="itemsPrice" label="单价">
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
              <el-form-item>
                <el-form>
                  <!--备注-->
                  <el-form-item label="备注:">
                    <span>{{props.row.remark}}</span>
                  </el-form-item>
                  <el-form-item label="配送费:">
                    <span>{{props.row.deliverPrice}}</span>
                  </el-form-item>
                  <el-form-item label="小计:">
                    <span>{{props.row.totalPrice}}</span>
                  </el-form-item>
                  <el-form-item label="活动减免:">
                    <span>{{props.row.activityMoney}}</span>
                  </el-form-item>
                  <el-form-item label="优惠券:">
                    <span>{{props.row.couponMoney}}</span>
                  </el-form-item>
                  <el-form-item label="平台佣金:">
                    <span>{{props.row.platformCommission}}</span>
                  </el-form-item>
                  <el-form-item label="本单预计收入:">
                    <span style="color: orange;font-size: 18px;"></span>
                  </el-form-item>
                  <el-form-item label="本顾客实际支付:">
                    <span style="color: orange;font-size: 18px;">{{props.row.realTotalMoney}}</span>
                  </el-form-item>
                </el-form>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="orderNo">
        </el-table-column>
        <el-table-column label="姓名" prop="name">
        </el-table-column>
        <el-table-column label="电话" prop="phone">
        </el-table-column>
        <el-table-column label="地址" prop="address">
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="props">
            {{props.row.receivedDate | Date}}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="status">
        </el-table-column>
        <el-table-column label="顾客实际支付" prop="income">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="printOrder">打印订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="orderRecordsList.length" :page="pagination.page" :rows="pagination.rows"></pagination>
  </el-row>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        form: {},
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
          rows: 10,
          orderNo: '',
          userId: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'orderRecordsList'
      ])
    },
    components: {
      Pagination
    },
    methods: {
      ...mapActions({
        getOrderRecordsList: 'getOrderRecordsList'
      }),
      // 点击打印订单执行的方法
      printOrder() {
        this.$confirm('确定打印该订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '打印成功'
          })
        }).catch(err => console.log(err))
      }
    },
    mounted() {
      this.pagination.userId = this.$route.params.id || ''
      this.getOrderRecordsList(this.pagination)
    }
  }
</script>
