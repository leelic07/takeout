<template>
    <el-row class="activity-add-container">
        <el-col :span="14" :offset="5">
            <!--选择满减还是优惠券-->
            <el-card>
                <el-form :model="typeForm">
                    <el-form-item label="活动类型">
                        <el-radio-group v-model="typeForm.type">
                            <el-radio label="1">满减活动</el-radio>
                            <el-radio label="2">优惠券</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-card>
            <!--活动内容-->
            <el-card>
                <!--满减活动-->
                <el-form v-show="typeForm.type === '1'" :label-position="labelPosition" :model="activityForm" ref="activityForm" :rules="activityRules" label-width="80px">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model="activityForm.name" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="满" prop="fullMoney">
                        <el-input v-model="activityForm.fullMoney" placeholder="请输入满的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="减" prop="reduceMoney">
                        <el-input v-model="activityForm.reduceMoney" placeholder="请输入减的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="活动开始时间" label-width="110px" prop="startDate">
                        <el-date-picker v-model="activityForm.startDate" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束时间" label-width="110px" prop="endDate">
                        <el-date-picker v-model="activityForm.endDate" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动参与店铺" label-width="100px">
                        <el-checkbox-group v-model="activityForm.merchants">
                            <el-checkbox v-for="(merchant,index) in merchantsList" :label="merchant.id" :key="index">{{merchant.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="activityForm.description" placeholder="请输入描述"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="publishActivity">发布活动</el-button>
                    </el-form-item>
                </el-form>
                <!--优惠券-->
                <el-form v-show="typeForm.type !== '1'" :label-position="labelPosition" :model="discountForm" ref="discountForm" :rules="discountRules" label-width="80px">
                    <el-form-item label="优惠券名称" label-width="100px" prop="name">
                        <el-input v-model="discountForm.name" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券金额" label-width="100px" prop="couponMoney">
                        <el-input v-model="discountForm.couponMoney" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="活动开始时间" label-width="110px" prop="startDate">
                        <el-date-picker v-model="discountForm.startDate" type="date" placeholder="选择开始日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束时间" label-width="110px" prop="endDate">
                        <el-date-picker v-model="discountForm.endDate" placeholder="选择结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动参与店铺" label-width="100px">
                        <el-checkbox-group v-model="discountForm.merchants">
                            <el-checkbox v-for="(merchant,index) in merchantsList" :label="merchant.id" :key="index">{{merchant.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="优惠券类型" label-width="100px" prop="couponSendType">
                        <el-select v-model="discountForm.couponSendType" placeholder="请选择优惠券类型">
                            <el-option v-for="(type,index) in couponSendTypes" :key="index" :value="type.id" :label="type.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="满多少送券" label-width="100px" v-if="isEnoughSend">
                        <el-input v-model="discountForm.enoughSend" placeholder="请输入满的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="最低消费金额" label-width="110px" prop="spendMoney">
                        <el-input v-model="discountForm.spendMoney" placeholder="请输入满的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="discountForm.description" placeholder="请输入描述"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="publishCoupon">发布活动</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      typeForm: {
        type: '1'
      },
      discountForm: {
        merchants: []
      },
      activityForm: {
        merchants: []
      },
      labelPosition: 'left',
      activityRules: {
        name: [{ required: true, message: '活动名称不能为空', trigger: 'blur' }],
        fullMoney: [{ required: true, message: '满金额不能为空', trigger: 'blur' }],
        reduceMoney: [{ required: true, message: '减金额不能为空', trigger: 'blur' }],
        startDate: [{ required: true, message: '活动开始时间不能为空', trigger: 'blur' }],
        endDate: [{ required: true, message: '活动结束时间不能为空', trigger: 'blur' }]
      },
      discountRules: {
        name: [{ required: true, message: '优惠券名称不能为空', trigger: 'blur' }],
        couponMoney: [{ required: true, message: '优惠券金额不能为空', trigger: 'blur' }],
        spendMoney: [{ required: true, message: '最低消费金额不能为空', trigger: 'blur' }],
        couponSendType: [{ required: true, message: '优惠券类型不能为空', trigger: 'blur' }],
        startDate: [{ required: true, message: '优惠券开始时间不能为空', trigger: 'blur' }],
        endDate: [{ required: true, message: '优惠券结束时间不能为空', trigger: 'blur' }]
      },
      //   couponTypeList: [{
      //     id: 1,
      //     name: '首页领取普通优惠券'
      //   }, {
      //     id: 2,
      //     name: '实付满多少送券'
      //   }, {
      //     id: 3,
      //     name: '后台操作送券'
      //   }, {
      //     id: 4,
      //     name: '首次点餐成功送券'
      //   }, {
      //     id: 5,
      //     name: '首次进入小程序送券'
      //   }],
      isEnoughSend: false
    }
  },
  watch: {
    'discountForm.couponSendType'(newValue) {
      if (newValue === 2) this.isEnoughSend = true
      else this.isEnoughSend = false
    }
  },
  computed: {
    ...mapGetters([
      'couponTypeList',
      'couponSendTypes',
      'merchantsList'
    ])
  },
  methods: {
    ...mapActions({
      getCouponTypeList: 'getCouponTypeList',
      saveActivity: 'saveActivity',
      saveCoupon: 'saveCoupon',
      getMerchantsList: 'getMerchantsList'
    }),
    publishActivity() {
      this.$refs.activityForm.validate(valid => {
        if (valid) this.saveActivity(this.activityForm)
        else {
          console.log('saveActivity err')
          return false
        }
      })
    },
    publishCoupon() {
      this.$refs.discountForm.validate(valid => {
        if (valid) this.saveCoupon(this.discountForm)
        else {
          console.log('saveCoupon err')
          return false
        }
      })
    }
  },
  mounted() {
    this.getCouponTypeList()
    this.getMerchantsList()
  }
}
</script>