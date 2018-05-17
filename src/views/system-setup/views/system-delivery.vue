<template>
    <el-row class="goods-upload-container">
        <el-col class="goods-upload-box" :span="13" :offset="5">
            <el-card>
                <el-form :model="deliveryForm" ref="deliveryForm" :rules="rule" size="large">
                    <el-form-item label="当前配送时间" label-width="120px" prop="deliveryTime">
                      <el-input v-model="deliveryForm.deliveryTime" :disabled="true">
                        <tempalte slot="append">分钟</tempalte>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="配送时间" label-width="120px" prop="newDeliveryTime">
                        <el-input v-model="deliveryForm.newDeliveryTime" placeholder="请填写配送时间">
                            <template slot="append">分钟</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="saveDeliveryTime">保存</el-button>
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
      deliveryForm: {
        deliveryTime: '',
        newDeliveryTime: ''
      },
      formLabelWidth: '80px',
      rule: {
        deliveryTime: [
          { required: true, message: '配送时间不能为空', trigger: 'blur' },
          { pattern: '^\\d+(\\.\\d+)?$', message: '请输入有效数字', trigger: 'blur' }
        ],
        newDeliveryTime: [
          { required: true, message: '配送时间不能为空', trigger: 'blur' },
          { pattern: '^\\d+(\\.\\d+)?$', message: '请输入有效数字', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    deliveryTimeResult() {
      this.deliveryForm = {
        deliveryTime: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'deliveryTimeResult'
    ])
  },
  methods: {
    ...mapActions({
      updateDeliveryTime: 'updateDeliveryTime'
    }),
    // 保存新增商户信息
    saveDeliveryTime() {
      this.$refs.deliveryForm.validate(valid => {
        if (valid) this.updateDeliveryTime(this.deliveryForm)
        else console.log('update deliveryForm err')
      })
    }
  },
  mounted() {
    this.getShopTypeList()
  }
}
</script>
