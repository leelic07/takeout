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
      <el-button type="primary" icon="el-icon-search" @click="searchOrders">搜索</el-button>
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
              <el-form-item>
                <el-form>
                  <!--备注-->
                  <el-form-item label="备注:">
                    <span>{{props.row.remark}}</span>
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
                    <span>{{props.row.couponMoney}}</span>
                  </el-form-item>
                  <el-form-item label="平台佣金:">
                    <span>{{props.row.platformCommission}}</span>
                  </el-form-item>
                  <el-form-item label="本单预计收入:">
                    <span style="color: orange;font-size: 18px;">￥?</span>
                  </el-form-item>
                  <el-form-item label="本顾客实际支付:">
                    <span style="color: orange;font-size: 18px;">￥{{props.row.realTotalMoney? props.row.realTotalMoney: 0}}</span>
                  </el-form-item>
                </el-form>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="orderNo">
        </el-table-column>
        <el-table-column label="姓名" prop="userName">
        </el-table-column>
        <el-table-column label="电话" prop="userPhone">
        </el-table-column>
        <el-table-column label="地址" prop="uesrAddress">
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="props">
            {{props.row.createdAt | Date}}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="status">
        </el-table-column>
        <el-table-column label="顾客实际支付" prop="realTotalMoney">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="printOrder(props.row)">打印订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="orderRecordsTotal" :page="pagination.page" :rows="pagination.rows"></pagination>
  </el-row>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { mapActions, mapMutations, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        form: {},
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
        'orderRecordsList',
        'orderRecordsTotal'
      ])
    },
    components: {
      Pagination
    },
    methods: {
      ...mapActions({
        getOrderRecordsList: 'getOrderRecordsList',
        getOrdersRecordsPage: 'getOrdersRecordsPage'
      }),
      ...mapMutations({
        printOrder: 'printOrder'
      }),
      searchOrders() {
        if (this.pagination.userId) this.getOrdersRecordsPage(this.pagination)
        else this.getOrderRecordsList(this.pagination)
      }
    },
    mounted() {
      this.pagination.userId = this.$route.params.id || ''
      if (this.pagination.userId) this.getOrdersRecordsPage(this.pagination)
      else this.getOrderRecordsList(this.pagination)
    }
  }
</script>
