<template>
  <el-row class="seller-container">
    <!--广告轮播图-->
    <el-carousel :interval="4000" type="card" height="150px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img src="../../assets/demo_images/903bb01606fd9bb80391dde95b83df0c.jpg" alt="" width="100%">
      </el-carousel-item>
    </el-carousel>
    <!--商家基本信息-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="3">
            <span>{{seller.title}}</span>
          </el-col>
          <el-col :span="4">
            <el-rate v-model="seller.rate" disabled show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </el-col>
          <el-button class="goods-management" icon="el-icon-goods" type="text">商品管理</el-button>
        </el-row>
      </div>
      <el-row>
        <el-col class="goods-body" :span="14">
          <el-col :span="12">
            <p>今日有效订单
              <i class="el-icon-circle-check el-icon--right"></i>
            </p>
            <el-col :span="24" class="order-amount-today">
              <router-link to="/seller/index">
                <h1>1</h1>
                <span>单
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </span>
              </router-link>
            </el-col>
            <el-col :span="24" class="order-amount-yesterday">
              <p>昨日12单</p>
            </el-col>
          </el-col>
          <el-col :span="12">
            <p>今日订单收入
              <i class="el-icon-circle-check el-icon--right"></i>
            </p>
            <el-col :span="24" class="order-amount-today">
              <router-link to="/seller/index">
                <h1>
                  <svg-icon icon-class="money" /> 114.99
                </h1>
                <span>
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </span>
              </router-link>
            </el-col>
            <el-col :span="24" class="order-amount-yesterday">
              <p>昨日12单</p>
            </el-col>
          </el-col>
        </el-col>

        <el-col class="goods-body" :span="10">
          <el-col :span="12">
            <p>今日有效订单
              <i class="el-icon-circle-check el-icon--right"></i>
            </p>
            <el-col :span="24" class="order-amount-today">
              <router-link to="/seller/index">
                <h1>1</h1>
                <span>单
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </span>
              </router-link>
            </el-col>
            <el-col :span="24" class="order-amount-yesterday">
              <p>昨日12单</p>
            </el-col>
          </el-col>
          <el-col :span="12">
            <p>今日订单收入
              <i class="el-icon-circle-check el-icon--right"></i>
            </p>
            <el-col :span="24" class="order-amount-today">
              <router-link to="/seller/index">
                <h1>
                  <svg-icon icon-class="money" /> 114.99
                </h1>
                <span>
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </span>
              </router-link>
            </el-col>
            <el-col :span="24" class="order-amount-yesterday">
              <p>昨日12单</p>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </el-card>
    <!--统计信息-->
    <el-col :span="24">
      <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    </el-col>
  </el-row>
</template>

<script>
import PanelGroup from './components/panel-group'
import LineChart from './components/line-chart'
import DndList from '@/components/DndList'

export default {
  data() {
    return {
      list1: [],
      list2: [],
      seller: {
        title: '意甜蛋糕(友阿店)',
        rate: 3.7
      }
    }
  },
  components: {
    PanelGroup,
    LineChart,
    DndList
  },
  methods: {
    handleSetLineChartData(type) {
      switch (type) {
        case 'orderList':
          this.$router.push({
            path: '/order/list'
          })
          break
        case 'incomeList':
          this.$router.push({
            path: '/income/chart'
          })
          break
        case 'menuList':
          this.$router.push({
            path: '/menu/list'
          })
          break
        default:
          break
      }
    }
  }
}
</script>