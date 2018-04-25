<template>
    <el-row class="activity-add-container">
        <el-col :span="14" :offset="5">
            <!--选择满减还是优惠券-->
            <el-card>
                <el-form :model="typeForm">
                    <el-form-item label="活动类型">
                        <el-radio-group v-model="typeForm.type">
                            <el-radio label="2">优惠券</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-card>
            <!--活动内容-->
            <el-card>
                <!--优惠券-->
                <el-form :label-position="labelPosition" :model="couponForEdit" ref="discountForm" :rules="discountRules" label-width="80px">
                    <el-form-item label="优惠券名称" label-width="100px" prop="name">
                        <el-input v-model="couponForEdit.name" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券金额" label-width="100px" prop="couponMoney">
                        <el-input v-model="couponForEdit.couponMoney" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="活动开始时间" label-width="110px" prop="startDate">
                        <el-date-picker v-model="couponForEdit.startDate" type="date" placeholder="选择开始日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束时间" label-width="110px" prop="endDate">
                        <el-date-picker v-model="couponForEdit.endDate" placeholder="选择结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动参与店铺" label-width="100px">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(checkAll)">全选</el-checkbox>
                        <el-checkbox-group v-model="couponForEdit.merchants" @change="handleCheckMerchantChange">
                            <el-checkbox v-for="(merchant,index) in merchantList" :label="merchant.id" :key="index">{{merchant.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="优惠券类型" label-width="100px" prop="couponSendType">
                        <el-select v-model="couponForEdit.couponSendType" placeholder="请选择优惠券类型">
                            <el-option v-for="(type,index) in couponSendTypes" :key="index" :value="type.id" :label="type.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="满多少送券" label-width="100px" v-if="isEnoughSend">
                        <el-input v-model="couponForEdit.enoughSend" placeholder="请输入满的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="最低消费金额" label-width="110px" prop="spendMoney">
                        <el-input v-model="couponForEdit.spendMoney" placeholder="请输入满的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="couponForEdit.description" placeholder="请输入描述"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="updateCouponConfirm">更新活动</el-button>
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
        type: '2'
      },
      labelPosition: 'left',
      discountRules: {
        name: [{ required: true, message: '优惠券名称不能为空', trigger: 'blur' }],
        couponMoney: [{ required: true, message: '优惠券金额不能为空', trigger: 'blur' }],
        spendMoney: [{ required: true, message: '最低消费金额不能为空', trigger: 'blur' }],
        couponSendType: [{ required: true, message: '优惠券类型不能为空', trigger: 'blur' }],
        startDate: [{ required: true, message: '优惠券开始时间不能为空', trigger: 'blur' }],
        endDate: [{ required: true, message: '优惠券结束时间不能为空', trigger: 'blur' }]
      },
      isEnoughSend: false,
      isIndeterminate: true,
      checkAll: false
    }
  },
  watch: {
    'couponForEdit.couponSendType'(newValue) {
      newValue === 2 && (this.isEnoughSend = true) || (this.isEnoughSend = false)
    },
    updateCouponResult() {
      this.$router.push({
        path: '/activity/list'
      })
    }
  },
  computed: {
    ...mapGetters([
      'couponTypeList',
      'couponSendTypes',
      'merchantList',
      'couponForEdit',
      'updateCouponResult'
    ])
  },
  methods: {
    ...mapActions({
      getCouponTypeList: 'getCouponTypeList',
      updateCoupon: 'updateCoupon',
      editCoupon: 'editCoupon',
      getMerchantsList: 'getMerchantsList'
    }),
    updateCouponConfirm() {
      this.$refs.discountForm.validate(valid => {
        if (valid) this.updateCoupon(this.couponForEdit)
        else console.log('updateCoupon err')
      })
    },
    // 点击全选时候执行的方法
    handleCheckAllChange(val) {
      val ? this.merchantList.forEach(merchant => {
        this.couponForEdit.merchants.push(merchant.id)
      }) : this.couponForEdit.merchants.splice(0)
      this.isIndeterminate = false
    },
    // 选择商铺时执行的方法
    handleCheckMerchantChange(val) {
      this.checkAll = val.length === this.merchantList.length
      this.isIndeterminate = val.length > 0 && val.length < this.merchantList.length
    }
  },
  mounted() {
    this.getCouponTypeList()
    this.getMerchantsList()
    this.editCoupon(this.$route.params.id)
  }
}
</script>