<template>
  <el-row class="order-records-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入订单号" v-model="orderNumber"></el-input>
      </el-col>
      <el-col :span="5" class="records-select">
        <el-input placeholder="请输入姓名" v-model="orderNumber"></el-input>
      </el-col>
      <el-date-picker v-model="datetime" type="daterange" range-separator="——" start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-row>
    <!--历史订单信息列表-->
    <el-row class="order-box">
      <el-table :data="tableData5" stripe style="width: 100%">
        <el-table-column type="expand" label="#">
          <template slot-scope="props">
            <el-form label-position="right" class="demo-table-expand">
              <!--商品信息-->
              <el-form-item label="商品信息:">
                <el-table :data="tableData" style="width: 100%" :show-header="false">
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
                <el-table :data="boxData" style="width: 100%" :show-header="false">
                  <el-table-column label="餐盒">
                    <template slot-scope="scope">餐盒</template>
                  </el-table-column>
                  <el-table-column prop="price" label="商品">
                  </el-table-column>
                  <el-table-column prop="amount" label="单价">
                  </el-table-column>
                  <el-table-column prop="total" label="数量">
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item>
                <el-form>
                  <!--备注-->
                  <el-form-item label="备注:">
                    <span>不要香菜，不要香菜，不要香菜，不要香菜，不要香菜，不要香菜</span>
                  </el-form-item>
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
                </el-form>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="orderNumber">
        </el-table-column>
        <el-table-column label="姓名" prop="name">
        </el-table-column>
        <el-table-column label="电话" prop="phone">
        </el-table-column>
        <el-table-column label="地址" prop="address">
        </el-table-column>
        <el-table-column label="下单时间" prop="createdAt">
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
    <pagination :total="tableData5.length" :page="pagination.page" :rows="pagination.rows"></pagination>
  </el-row>
</template>

<script>
  import Pagination from '@/components/Pagination'
  export default {
    data() {
      return {
        form: {},
        tableData5: [{
          id: '12987122',
          name: '曾女士',
          orderNumber: '21324535456',
          phone: '13485765456',
          address: '上海市普陀区真北路',
          status: '已配送',
          income: 77,
          createdAt: '2018-3-31 16:66:00'
        }, {
          id: '12987123',
          name: '曾女士',
          orderNumber: '21324535456',
          phone: '13485765456',
          address: '上海市普陀区真北路',
          status: '已配送',
          income: 77,
          createdAt: '2018-3-31 16:66:00'
        }, {
          id: '12987125',
          name: '曾女士',
          orderNumber: '21324535456',
          phone: '13485765456',
          address: '上海市普陀区真北路',
          status: '已配送',
          income: 77,
          createdAt: '2018-3-31 16:66:00'
        }, {
          id: '12987126',
          name: '曾女士',
          orderNumber: '21324535456',
          phone: '13485765456',
          address: '上海市普陀区真北路',
          status: '已配送',
          income: 77,
          createdAt: '2018-3-31 16:66:00'
        }, {
          id: '12987126',
          name: '曾女士',
          orderNumber: '21324535456',
          phone: '13485765456',
          address: '上海市普陀区真北路',
          status: '已配送',
          income: 77,
          createdAt: '2018-3-31 16:66:00'
        }, {
          id: '12987126',
          name: '曾女士',
          orderNumber: '21324535456',
          phone: '13485765456',
          address: '上海市普陀区真北路',
          status: '已配送',
          income: 77,
          createdAt: '2018-3-31 16:66:00'
        }, {
          id: '12987126',
          name: '曾女士',
          orderNumber: '21324535456',
          phone: '13485765456',
          address: '上海市普陀区真北路',
          status: '已配送',
          income: 77,
          createdAt: '2018-3-31 16:66:00'
        }, {
          id: '12987126',
          name: '曾女士',
          orderNumber: '21324535456',
          phone: '13485765456',
          address: '上海市普陀区真北路',
          status: '已配送',
          income: 77,
          createdAt: '2018-3-31 16:66:00'
        }],
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
        }
      }
    },
    components: {
      Pagination
    },
    methods: {
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
    }
  }
</script>
