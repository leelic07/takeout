<template>
    <el-row class="order-acception-container">
        <!--切换接单内容-->
        <el-card class="box-card">
            <el-col :span="22" :offset="2">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="处理状态">
                        <el-radio-group v-model="form.resrveStatus">
                            <el-radio label="新订单"></el-radio>
                            <el-radio label="已处理"></el-radio>
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
                        <el-table :data="tableData5" style="width: 100%" :show-header="false" stripe>
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="right" class="demo-table-expand">
                                        <!--备注-->
                                        <el-form-item label="备注:">
                                            <span>{{ props.row.name }}</span>
                                        </el-form-item>
                                        <!--商品信息-->
                                        <el-form-item label="商品信息:">
                                            <template slot-scope="scope">
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
                                            </template>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-form inline>
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
                                        <el-form-item>
                                            <template slot-scope="props">
                                                <el-button type="danger" plain size="mini" @click="cancelOrder">取消订单并退款</el-button>
                                                <el-button type="primary" plain size="mini" @click="printOrder">打印订单</el-button>
                                            </template>
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
                            <b>1</b><span>笔</span>
                        </el-col>
                        <el-col>
                            <label for="">今日营业总额:</label>
                            <b>115</b><span>元</span>
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
                                <label for="">紧急预订单：</label><span><b>0</b>笔</span>
                            </el-col>
                            <el-col :span="12">
                                <a href="#">查看订单<i class="el-icon-arrow-right"></i></a>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="12">
                                <label for="">被取消配送：</label><span><b>0</b>笔</span>
                            </el-col>
                            <el-col :span="12">
                                <a href="#">查看订单<i class="el-icon-arrow-right"></i></a>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="12">
                                <label for="">待发配送：</label><span><b>0</b>笔</span>
                            </el-col>
                            <el-col :span="12">
                                <a href="#">查看订单<i class="el-icon-arrow-right"></i></a>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="12">
                                <label for="">未处理退款：</label><span><b>0</b>笔</span>
                            </el-col>
                            <el-col :span="12">
                                <a href="#">查看订单<i class="el-icon-arrow-right"></i></a>
                            </el-col>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    export default {
      data() {
        return {
          form: {},
          tableData5: [{
            id: '12987122',
            name: '不要香菜,不要香菜,不要香菜',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }, {
            id: '12987123',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }, {
            id: '12987125',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }, {
            id: '12987126',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
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
          }]
        }
      },
      methods: {
        // 点击打印订单执行的方法
        printOrder() {
          this.$confirm('确定打印订单？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '打印订单成功'
            }).catch(err => console.log(err))
          })
        },
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
        }
      }
    }
</script>