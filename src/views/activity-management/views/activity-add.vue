<template>
  <el-row class="activity-add-container">
    <el-col :span="14"
      :offset="5">
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
        <el-form v-show="typeForm.type === '1'"
          :label-position="labelPosition"
          :model="activityForm"
          ref="activityForm"
          :rules="activityRules"
          label-width="80px">
          <el-form-item label="活动名称"
            prop="name">
            <el-input v-model="activityForm.name"
              placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="满"
            prop="fullMoney">
            <el-input v-model="activityForm.fullMoney"
              placeholder="请输入满的金额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="减"
            prop="reduceMoney">
            <el-input v-model="activityForm.reduceMoney"
              placeholder="请输入减的金额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动开始时间"
            label-width="110px"
            prop="startDate">
            <el-date-picker v-model="activityForm.startDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动结束时间"
            label-width="110px"
            prop="endDate">
            <el-date-picker v-model="activityForm.endDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动参与店铺"
            label-width="110px"
            prop="merchants">
            <el-checkbox :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange(checkAll,'acitivity')">全选</el-checkbox>
            <el-checkbox-group v-model="activityForm.merchants"
              @change="handleCheckMerchantChange">
              <el-checkbox v-for="(merchant,index) in merchantList"
                :label="merchant.id"
                :key="index">{{merchant.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea"
              v-model="activityForm.description"
              placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              size="medium"
              @click="publishActivity">发布活动</el-button>
          </el-form-item>
        </el-form>
        <!--优惠券-->
        <el-form v-show="typeForm.type !== '1'"
          :label-position="labelPosition"
          :model="discountForm"
          ref="discountForm"
          :rules="discountRules"
          label-width="80px">
          <el-form-item label="优惠券名称"
            label-width="100px"
            prop="name">
            <el-input v-model="discountForm.name"
              placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="优惠券金额"
            label-width="100px"
            prop="couponMoney">
            <el-input v-model="discountForm.couponMoney"
              placeholder="请输入优惠券金额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="有效日期"
            prop="effectiveTime">
            <el-select v-model="discountForm.effectiveTime"
              placeholder="请选择有效日期">
              <el-option v-for="(month, index) in effectiveDate"
                :key="index"
                :label="month.label"
                :value="month.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="优惠券图片"
                        label-width="120px"
                        prop="pictures">
                        <upload-img :pictures="discountForm.pictures"
                            :limit="limit"
                            @handleRemove="handleRemove"
                            @handleSuccess="handleSuccess">
                        </upload-img>
                    </el-form-item> -->
          <el-form-item label="活动参与店铺"
            label-width="110px"
            prop="merchants">
            <el-checkbox :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange(checkAll,'discount')">全选</el-checkbox>
            <el-checkbox-group v-model="discountForm.merchants"
              @change="handleCheckMerchantChange">
              <el-checkbox v-for="(merchant,index) in merchantList"
                :label="merchant.id"
                :key="index">{{merchant.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="优惠券类型"
            label-width="100px"
            prop="couponSendType">
            <el-select v-model="discountForm.couponSendType"
              placeholder="请选择优惠券类型">
              <el-option v-for="(type,index) in couponSendTypes"
                :key="index"
                :value="type.id"
                :label="type.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="满多少送券"
            label-width="100px"
            v-if="isEnoughSend"
            prop="fullMoney">
            <el-input v-model="discountForm.fullMoney"
              placeholder="请输入满的金额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="最低消费金额"
            label-width="110px"
            prop="spendMoney">
            <el-input v-model="discountForm.spendMoney"
              placeholder="请输入满的金额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea"
              v-model="discountForm.description"
              placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              size="medium"
              @click="publishCoupon">发布活动</el-button>
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
        merchants: [],
        pictures: [],
        effectiveTime: ''
      },
      activityForm: {
        merchants: []
      },
      fileList: [],
      fileListTemp: [],
      limit: 0,
      labelPosition: 'left',
      activityRules: {
        name: [{ required: true, message: '活动名称不能为空', trigger: 'blur' }],
        fullMoney: [{ required: true, message: '满金额不能为空', trigger: 'blur' }],
        reduceMoney: [{ required: true, message: '减金额不能为空', trigger: 'blur' }],
        startDate: [{ required: true, message: '活动开始时间不能为空', trigger: 'blur' }],
        endDate: [{ required: true, message: '活动结束时间不能为空', trigger: 'blur' }],
        merchants: [{ required: true, message: '参与店铺不能为空', trigger: 'blur' }]
      },
      discountRules: {
        name: [{ required: true, message: '优惠券名称不能为空', trigger: 'blur' }],
        couponMoney: [{ required: true, message: '优惠券金额不能为空', trigger: 'blur' }],
        spendMoney: [{ required: true, message: '最低消费金额不能为空', trigger: 'blur' }],
        couponSendType: [{ required: true, message: '优惠券类型不能为空', trigger: 'blur' }],
        startDate: [{ required: true, message: '优惠券开始时间不能为空', trigger: 'blur' }],
        endDate: [{ required: true, message: '优惠券结束时间不能为空', trigger: 'blur' }],
        merchants: [{ required: true, message: '参与店铺不能为空', trigger: 'blur' }],
        pictures: [{ required: true, message: '优惠券图片不能为空', trigger: 'blur' }],
        fullMoney: [{ required: true, message: '满多少送券不能为空', trigger: 'blur' }],
        effectiveTime: [{ required: true, message: '有效日期不能为空', trigger: 'blur' }]
      },
      isEnoughSend: false,
      isIndeterminate: true,
      checkAll: false
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
      'merchantList',
      'effectiveDate'
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
        else console.log('saveActivity err')
      })
    },
    publishCoupon() {
      this.$refs.discountForm.validate(valid => {
        if (valid) this.saveCoupon(this.discountForm)
        else console.log('saveCoupon err')
      })
    },
    // 点击全选时候执行的方法
    handleCheckAllChange(val, type) {
      type === 'discount' ? val ? this.merchantList.forEach(merchant => {
        this.discountForm.merchants.push(merchant.id)
      }) : this.discountForm.merchants.splice(0) : val ? this.merchantList.forEach(merchant => {
        this.activityForm.merchants.push(merchant.id)
      }) : this.activityForm.merchants.splice(0)
      this.isIndeterminate = false
    },
    // 选择商铺时执行的方法
    handleCheckMerchantChange(val) {
      this.checkAll = val.length === this.merchantList.length
      this.isIndeterminate = val.length > 0 && val.length < this.merchantList.length
    },
    handleRemove(index) {
      this.discountForm.pictures.splice(index, 1)
    },
    handleSuccess(url) {
      this.discountForm.pictures.push({
        name: url.substring(url.lastIndexOf('/' + 1)),
        url: url
      })
    }
  },
  mounted() {
    this.getCouponTypeList()
    this.getMerchantsList()
  }
}
</script>