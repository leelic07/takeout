<template>
    <el-row class="activity-add-container">
        <el-col :span="14" :offset="5">
            <!--选择满减还是优惠券-->
            <el-card>
                <el-form :model="typeForm">
                    <el-form-item label="活动类型">
                        <el-radio-group v-model="typeForm.type">
                            <el-radio label="1">满减活动</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-card>
            <!--活动内容-->
            <el-card>
                <!--满减活动-->
                <el-form :label-position="labelPosition" :model="activityForEdit" ref="activityForm" :rules="activityRules" label-width="80px">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model="activityForEdit.name" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="满" prop="fullMoney">
                        <el-input v-model="activityForEdit.fullMoney" placeholder="请输入满的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="减" prop="reduceMoney">
                        <el-input v-model="activityForEdit.reduceMoney" placeholder="请输入减的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="活动开始时间" label-width="110px" prop="startDate">
                        <el-date-picker v-model="activityForEdit.startDate" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束时间" label-width="110px" prop="endDate">
                        <el-date-picker v-model="activityForEdit.endDate" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动参与店铺" label-width="100px">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(checkAll)">全选</el-checkbox>
                        <el-checkbox-group v-model="activityForEdit.merchants" @change="handleCheckMerchantChange">
                            <el-checkbox v-for="(merchant,index) in merchantList" :label="merchant.id" :key="index">{{merchant.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="activityForEdit.description" placeholder="请输入描述"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="updateActivityConfirm">更新活动</el-button>
                    </el-form-item>
                </el-form>
                <!--优惠券-->
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
      labelPosition: 'left',
      activityRules: {
        name: [{ required: true, message: '活动名称不能为空', trigger: 'blur' }],
        fullMoney: [{ required: true, message: '满金额不能为空', trigger: 'blur' }],
        reduceMoney: [{ required: true, message: '减金额不能为空', trigger: 'blur' }],
        startDate: [{ required: true, message: '活动开始时间不能为空', trigger: 'blur' }],
        endDate: [{ required: true, message: '活动结束时间不能为空', trigger: 'blur' }]
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
      'activityForEdit'
    ])
  },
  methods: {
    ...mapActions({
      saveActivity: 'saveActivity',
      getMerchantsList: 'getMerchantsList',
      editActivity: 'editActivity',
      updateActivity: 'updateActivity'
    }),
    updateActivityConfirm() {
      this.$refs.activityForm.validate(valid => {
        if (valid) this.updateActivity(this.activityForEdit)
        else console.log('updateActivity err')
      })
    },
    // 点击全选时候执行的方法
    handleCheckAllChange(val) {
      val ? this.merchantList.forEach(merchant => {
        this.activityForEdit.merchants.push(merchant.id)
      }) : this.activityForEdit.merchants.splice(0)
      this.isIndeterminate = false
    },
    // 选择商铺时执行的方法
    handleCheckMerchantChange(val) {
      this.checkAll = val.length === this.merchantList.length
      this.isIndeterminate = val.length > 0 && val.length < this.merchantList.length
    }
  },
  mounted() {
    this.getMerchantsList()
    this.editActivity(this.$route.params.id)
  }
}
</script>