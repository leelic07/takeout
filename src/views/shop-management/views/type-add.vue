<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box"
      :span="14"
      :offset="5">
      <el-card>
        <el-form :model="merchantType"
          ref="merchantTypeForm"
          :rules="rule"
          size="large">
          <el-form-item label="类型名称"
            label-width="120px"
            prop="name">
            <el-input v-model="merchantType.name"
              auto-complete="off"
              placeholder="请填写类型名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              size="medium"
              @click="saveMerchantTypeConfirm">保存</el-button>
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
      merchantType: {},
      rule: {
        name: [{ required: true, message: '类型名称不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    saveMerchantTypeResult(newValue) {
      this.$router.push({ path: '/shop/type-list' })
    }
  },
  computed: {
    ...mapGetters([
      'saveMerchantTypeResult'
    ])
  },
  methods: {
    ...mapActions({
      saveMerchantType: 'saveMerchantType'
    }),
    // 点击保存添加分类商品执行的方法
    saveMerchantTypeConfirm() {
      this.$refs.merchantTypeForm.validate(valid => {
        if (valid) this.saveMerchantType(this.merchantType)
        else console.log('saveMerchantType err')
      })
    }
  }
}
</script>
