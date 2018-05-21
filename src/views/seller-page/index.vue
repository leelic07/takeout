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
            <el-select v-if="type === '1'" v-model="seller.merchantId" placeholder="请选择店铺" size="small" @change="merchantChange">
              <el-option value="" label="全部店铺"></el-option>
              <el-option v-for="(merchant,index) in merchantList" :key="index" :value="merchant.id" :label="merchant.name"></el-option>
            </el-select>
            <span v-else>{{shopForEdit.name}}</span>
          </el-col>
          <el-col :span="4">
            <el-rate v-model="shopForEdit.rate" disabled show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </el-col>
          <el-button class="goods-management" icon="el-icon-goods" type="text" @click="showGoodsManagement">商品管理</el-button>
        </el-row>
      </div>
      <el-row>
        <el-col class="goods-body" :span="12">
          <el-col :span="12">
            <p>今日未处理订单
              <i class="el-icon-circle-check el-icon--right"></i>
            </p>
            <el-col :span="24" class="order-amount-today">
              <router-link to="/order/acception">
                <h1>{{merchantHomePage.pendingOrder || 0}}</h1>
                <span>单
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </span>
              </router-link>
            </el-col>
            <!-- <el-col :span="24" class="order-amount-yesterday">
              <p>昨日1单</p>
            </el-col> -->
          </el-col>
          <el-col :span="12">
            <p>今日退款中的外卖订单
              <i class="el-icon-circle-check el-icon--right"></i>
            </p>
            <el-col :span="24" class="order-amount-today">
              <router-link to="/order/retreat">
                <h1>{{merchantHomePage.refundingOrder || 0}}</h1>
                <span>
                  单
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </span>
              </router-link>
            </el-col>
            <!-- <el-col :span="24" class="order-amount-yesterday">
              <p>昨日2单</p>
            </el-col> -->
          </el-col>
        </el-col>
        <el-col class="goods-body" :span="12">
          <el-col :span="12">
            <p>今日有效订单
              <i class="el-icon-circle-check el-icon--right"></i>
            </p>
            <el-col :span="24" class="order-amount-today">
              <router-link to="/order/records">
                <h1>{{merchantHomePage.dayOrder || 0}}</h1>
                <span>单
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </span>
              </router-link>
            </el-col>
            <!-- <el-col :span="24" class="order-amount-yesterday">
              <p>昨日12单</p>
            </el-col> -->
          </el-col>
          <el-col :span="12">
            <p class="income-today">今日订单收入
              <i class="el-icon-circle-check el-icon--right"></i>
            </p>
            <el-col :span="24" class="order-amount-today">
              <router-link to="/seller/index">
                <h1>
                  <svg-icon icon-class="money" /> {{merchantHomePage.dayPrice || '0.00'}}
                </h1>
                <span>
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </span>
              </router-link>
            </el-col>
            <!-- <el-col :span="24" class="order-amount-yesterday">
              <p class="income-today-money">昨日收入166.66元</p>
            </el-col> -->
          </el-col>
        </el-col>
      </el-row>
    </el-card>
    <!--统计信息-->
    <el-col :span="24">
      <panel-group :merchantHomePage="merchantHomePage" @handleSetLineChartData="handleSetLineChartData"></panel-group>
    </el-col>
  </el-row>
</template>

<script>
import PanelGroup from './components/panel-group'
import LineChart from './components/line-chart'
import DndList from '@/components/DndList'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      list1: [],
      list2: [],
      seller: {
        merchantId: ''
      }
    }
  },
  components: {
    PanelGroup,
    LineChart,
    DndList
  },
  watch: {
    // 'seller.merchantId'(newValue) {
    //   newValue = newValue || 1
    //   this.getShopForEdit(newValue)
    // },
    type: {
      handler: function(newValue) {
        this.seller.merchantId = sessionStorage['merchantId']
        if (newValue === '1') this.getMerchantsList()
        else this.getShopForEdit(this.seller.merchantId)
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'merchantList',
      'shopForEdit',
      'merchantHomePage'
    ]),
    type() {
      return sessionStorage.getItem('type')
    }
  },
  methods: {
    ...mapActions({
      getMerchantsList: 'getMerchantsList',
      getShopForEdit: 'getShopForEdit',
      getMerchantsHomePage: 'getMerchantsHomePage',
      getOrderRecordsList: 'getOrderRecordsList'
    }),
    handleSetLineChartData(type) {
      switch (type) {
        case 'orderList':
          this.$router.push({
            path: '/order/records'
          })
          break
        case 'incomeList':
          this.$router.push({
            path: '/data/business'
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
    },
    showGoodsManagement() {
      this.$router.push({
        path: '/goods/list'
      })
    },
    merchantChange(merchantId) {
      this.getMerchantsHomePage(merchantId)
    }
  },
  mounted() {
    this.getMerchantsHomePage(this.seller.merchantId)
  }
}
</script>
