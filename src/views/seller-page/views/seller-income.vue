<template>
    <el-row class="seller-income-container">
        <el-col :span="4">
            <el-col :span="24">
                <div class="payment ali-payment"></div>
                <p>支付宝支付</p>
            </el-col>
            <el-col :span="24">
                <div class="payment wx-payment"></div>
                <p>微信支付</p>
            </el-col>
            <el-col :span="24">
                <div class="payment cash-payment"></div>
                <p>现金支付</p>
            </el-col>
        </el-col>
        <bar-chart></bar-chart>
    </el-row>
</template>

<script>
import BarChart from '../components/bar-chart'

export default {
  data() {
    return {}
  },
  components: {
    BarChart
  }
}
</script>

<style ref="stylesheet/scss" lang="scss">
.seller-income-container {
  .payment {
    float: left;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
  .ali-payment {
    background: #5ab1ef;
  }
  .wx-payment {
    background: #b6a2de;
  }
  .cash-payment {
    background: #2ec7c9;
  }
  .el-col-4 {
    margin: 20px 0 20px 20px;
  }
  .el-col-4 .el-col-24 {
    margin: 10px 0;
  }
  .el-col p {
    float: left;
    margin: 0;
    margin-left: 8px;
  }
}
</style>

