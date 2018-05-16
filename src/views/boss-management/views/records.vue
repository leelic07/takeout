<template>
    <div class="cell-box">
        <div class="btn-box">
            <mt-button v-for="(busy,index) in businessRecords" :key="index" type="primary" size="normal" @click.native="records = busy.id">{{busy.date}}</mt-button>
        </div>
        <mt-tab-container v-model="records" swipeable>
            <mt-tab-container-item v-for="(busy,index) in businessRecords" :key="index" :id="busy.id">
                <mt-cell title="营业日期" :value="busy.date"></mt-cell>
                <mt-cell title="营业额" :value="busy.totalPrice"></mt-cell>
                <mt-cell title="订单数" :value="busy.orderCount"></mt-cell>
                <mt-cell title="最大订单" :value="busy.maxOrder"></mt-cell>
                <mt-cell title="最小订单" :value="busy.minOrder"></mt-cell>
                <mt-cell title="用户点击量" :value="busy.userClick"></mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      records: 1,
      businessRecords: [{
        id: 1,
        date: '5.16',
        totalPrice: 2000,
        orderCount: 157,
        maxOrder: 15,
        minOrder: 5,
        userClick: 312
      }, {
        id: 2,
        date: '5.17',
        totalPrice: 1000,
        orderCount: 130,
        maxOrder: 75,
        minOrder: 7,
        userClick: 722
      }, {
        id: 3,
        date: '5.18',
        totalPrice: 4240,
        orderCount: 150,
        maxOrder: 88,
        minOrder: 8,
        userClick: 562
      }, {
        id: 4,
        date: '5.19',
        totalPrice: 5020,
        orderCount: 150,
        maxOrder: 55,
        minOrder: 8,
        userClick: 712
      }]
    }
  }
}
</script>