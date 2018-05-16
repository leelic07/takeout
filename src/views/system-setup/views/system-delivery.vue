<template>
    <el-row class="goods-upload-container">
        <el-col class="goods-upload-box" :span="14" :offset="5">
            <el-card>
                <el-form :model="deliveryForm" ref="deliveryForm" :rules="rule" size="large">
                    <el-form-item label="配送时间" label-width="120px" prop="minutes">
                        <el-input v-model="deliveryForm.minutes" placeholder="请填写配送时间">
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
        pictures: []
      },
      fileList: [],
      fileListTemp: [],
      dialogFormVisible: false,
      propertyForm: [{
        name: '',
        properties: [{
          value: '',
          price: ''
        }]
      }],
      formLabelWidth: '80px',
      rule: {
        minutes: [
          { required: true, message: '配送时间不能为空', trigger: 'blur' },
          { pattern: '^\\d+(\\.\\d+)?$', message: '请输入有效数字', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'shopTypeList'
    ])
  },
  methods: {
    ...mapActions({
      updateDeliveryTime: 'updateDeliveryTime'
    }),
    // 保存新增商户信息
    saveDeliveryTime() {
      this.$refs.deliveryForm.validate(valid => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
        } else console.log('deliveryForm err')
      })
    }
  },
  mounted() {
    this.getShopTypeList()
  }
}
</script>
