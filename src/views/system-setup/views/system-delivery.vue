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
                        <el-button type="primary" size="medium" @click="saveShopConfirm">保存</el-button>
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
      saveShop: 'saveShop',
      getShopTypeList: 'getShopTypeList'
    }),
    handleRemove(file) {
      this.fileListTemp.forEach((f, index, arr) => {
        if (f.url === file.url) {
          this.deliveryForm.pictures.splice(index, 1)
          arr.splice(index, 1)
        }
      })
    },
    // 上传图片成功执行的方法
    handleSuccess(res, file) {
      this.fileListTemp.push(file)
      this.deliveryForm.pictures.push({ url: this.$baseURL + res.path })
    },
    // 图片上传超过限制执行的方法
    handleExceed() {
      this.$message({
        type: 'warning',
        message: '最多只能上传5张图片'
      })
    },
    // 保存新增商户信息
    saveShopConfirm() {
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
