<template>
  <el-row class="seller-order-container">
    <!-- <el-card class="box-card">
      <el-col :span="22" :offset="2">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="预定状态">
            <el-radio-group v-model="form.resrveStatus">
              <el-radio label="未到预定时间"></el-radio>
              <el-radio label="120分钟内需要送达预定单"></el-radio>
              <el-radio label="已过预定时间"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-radio-group v-model="form.orderStatus">
              <el-radio label="全部"></el-radio>
              <el-radio label="有效订单"></el-radio>
              <el-radio label="待配送"></el-radio>
              <el-radio label="配送中"></el-radio>
              <el-radio label="已送达"></el-radio>
              <el-radio label="用户已确认收货"></el-radio>
              <el-radio label="无效订单"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="配送状态">
            <el-radio-group v-model="form.deliveryStatus">
              <el-radio label="全部"></el-radio>
              <el-radio label="待骑手接单"></el-radio>
              <el-radio label="待骑手取货"></el-radio>
              <el-radio label="骑手已取货"></el-radio>
              <el-radio label="骑手已送达"></el-radio>
              <el-radio label="配送已取消"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="订单排序">
            <el-radio-group v-model="form.orderSort">
              <el-radio label="期望送达时间"></el-radio>
              <el-radio label="下单时间"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
    <el-row class="order-detail">
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>预定今日 | 14:00送达</span>
            <span style="float: right; padding: 3px 0" type="text">待发配送</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row> -->
    <el-row :gutter="40">
      <el-col :span="5">
        <el-input placeholder="请输入订单号" v-model="orderNumber"></el-input>
      </el-col>
      <el-date-picker v-model="datetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary">搜索</el-button>
    </el-row>
    <el-row class="order-statics">
      <el-table :data="orderList" stripe border style="width: 100%">
        <el-table-column prop="orderNumber" label="订单号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="orderTime" label="订单时间" width="180"></el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orderStatus === '已配送'" type="success" :closable="false">{{scope.row.orderStatus}}</el-tag>
            <el-tag v-else type="danger" :closable="false">{{scope.row.orderStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="success" size="mini" :disabled="scope.row.orderStatus === '已配送'">配送</el-button>
            <el-button type="danger" size="mini" @click="deleteOrder(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="orderList.length" :page="pagination.page" :rows="pagination.rows"></pagination>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination/index'

export default {
  data() {
    return {
      orderList: [{
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '待配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '待配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '已配送'
      }], // 订单统计列表
      orderNumber: '', // 订单号
      datetime: '', // 日期时间
      pagination: {// 分页信息
        page: 1,
        rows: 10
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    // 点击删除按钮时执行的方法
    deleteOrder(id) {
      this.$confirm('确定删除该订单信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss" scoped>
.seller-order-container {
  padding: 32px;
  .order-detail {
    margin-top: 20px;
  }
  .el-col.datetime {
    margin-left: -1%;
  }
  .el-button {
    margin-left: 1%;
  }
  .el-row.order-statics {
    margin-top: 30px;
  }
  .el-alert {
    max-width: 100%;
  }
}
</style>
