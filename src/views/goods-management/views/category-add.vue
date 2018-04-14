<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="14" :offset="5">
      <el-card>
        <el-form :model="goodsType" ref="goodsTypeForm" :rules="rule" size="large">
          <!-- <el-form-item label="分类编号" label-width="120px" prop="categoryNumber">
                        <el-input v-model="goodsType.categoryNumber" auto-complete="off" placeholder="请填写商品编号"></el-input>
                    </el-form-item> -->
          <el-form-item label="分类名称" label-width="120px" prop="name">
            <el-input v-model="goodsType.name" auto-complete="off" placeholder="请填写商品名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="saveGoodsTypeConfirm">保存</el-button>
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
      goodsType: {},
      fileList2: [],
      rule: {
        categoryNumber: [{ required: true, message: '分类编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    saveGoodsTypeResult(newValue) {
      newValue.code === 200 && this.$router.push({ path: '/goods/category' })
    }
  },
  computed: {
    ...mapGetters([
      'saveGoodsTypeResult'
    ])
  },
  methods: {
    ...mapActions({
      saveGoodsType: 'saveGoodsType'
    }),
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 点击保存添加分类商品执行的方法
    saveGoodsTypeConfirm() {
      this.$refs.goodsTypeForm.validate(valid => {
        if (valid) this.saveGoodsType(this.goodsType)
        else console.log('saveGoodsType err')
      })
    }
  }
}
</script>
