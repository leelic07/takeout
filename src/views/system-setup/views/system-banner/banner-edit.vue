<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="14" :offset="5">
      <el-card>
        <el-form label-position="right" :model="adForEdit" ref="bannerForm" :rules="rule" size="large">
          <el-form-item label="活动名称" label-width="120px" prop="name">
            <el-input v-model="adForEdit.name" placeholder="请输入广告名称"></el-input>
          </el-form-item>
          <el-form-item label="跳转地址" label-width="120px" prop="url">
            <el-input v-model="adForEdit.url" placeholder="请输入广告跳转地址"></el-input>
          </el-form-item>
          <el-form-item label="小程序轮播图" label-width="120px" prop="imageUrl">
            <upload-img :pictures="adForEdit.pictures" :limit="limit" @handleRemove="handleRemove" @handleSuccess="handleSuccess">
            </upload-img>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="updateBannerConfirm">保存</el-button>
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
    const validateImage = (rule, value, callback) => {
      if (value === '') callback(new Error('广告图片不能为空'))
      else callback()
    }
    return {
      fileList: [],
      limit: 1,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      rule: {
        name: [{ required: true, message: '活动名称不能为空', trigger: 'blur' }],
        url: [{ required: true, message: '活动地址不能为空', trigger: 'blur' }],
        imageUrl: [{ validator: validateImage, trigger: 'blur' }]
      }
    }
  },
  watch: {
    adForEdit(newValue) {
      this.adForEdit.pictures = [newValue.imageUrl]
    }
  },
  computed: {
    ...mapGetters([
      'adForEdit',
      'updateAdResult'
    ])
  },
  methods: {
    ...mapActions({
      editBanner: 'editBanner',
      updateBanner: 'updateBanner'
    }),
    handleRemove(index) {
      this.adForEdit.imageUrl = ''
      this.adForEdit.pictures.splice(index, 1)
    },
    handleSuccess(url) {
      this.adForEdit.pictures.push(url)
      this.adForEdit.imageUrl = url
      console.log('picture', this.adForEdit.pictures)
    },
    // 保存新增商户信息
    updateBannerConfirm() {
      this.$refs.bannerForm.validate(valid => {
        if (valid) {
          this.updateBanner(this.adForEdit)
        } else console.log('update bannerForm err')
      })
    }
  },
  mounted() {
    this.editBanner(this.$route.params.id)
  }
}
</script>
