<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box"
      :span="14"
      :offset="5">
      <el-card>
        <el-form :model="merchantTypeForEdit"
          ref="merchantTypeForm"
          :rules="rule"
          size="large">
          <el-form-item label="类型名称"
            label-width="120px"
            prop="name">
            <el-input v-model="merchantTypeForEdit.name"
              auto-complete="off"
              placeholder="请填写类型名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              size="medium"
              @click="updateMerchantTypeConfirm">更新</el-button>
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
      rule: {
        name: [{ required: true, message: '类型名称不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    updateMerchantTypeResult(newValue) {
      this.$router.push({
        path: '/shop/type-list'
      })
    }
  },
  computed: {
    ...mapGetters([
      'merchantTypeForEdit',
      'updateMerchantTypeResult'
    ])
  },
  methods: {
    ...mapActions({
      updateMerchantType: 'updateMerchantType',
      editMerchantType: 'editMerchantType'
    }),
    // 点击保存添加分类商品执行的方法
    updateMerchantTypeConfirm() {
      this.$refs.merchantTypeForm.validate(valid => {
        if (valid) this.updateMerchantType(this.merchantTypeForEdit)
        else console.log('updateMerchantType err')
      })
    }
  },
  mounted() {
    this.editMerchantType(this.$route.params.id)
  }
}
</script>
