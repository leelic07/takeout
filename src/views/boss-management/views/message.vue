<template>
    <div class="cell-box">
        <mt-cell title="今日您店的运营信息如下："></mt-cell>
        <mt-cell title="营业额" :value="shopMessage.totalPrice"></mt-cell>
        <mt-cell title="订单数" :value="shopMessage.orderCount"></mt-cell>
        <mt-cell title="最大订单" :value="shopMessage.maxOrder"></mt-cell>
        <mt-cell title="最小订单" :value="shopMessage.minOrder"></mt-cell>
        <mt-cell title="用户点击量" :value="shopMessage.userClick"></mt-cell>
    </div>
</template>

<script>
export default {
  data() {
    return {
      shopMessage: {
        totalPrice: 2000,
        orderCount: 150,
        maxOrder: 15,
        minOrder: 5,
        userClick: 312
      }
    }
  }
}
</script>