<template>
    <el-row class="goods-upload-container">
        <el-col class="goods-upload-box" :span="14" :offset="5">
            <el-card>
                <el-form :model="bannerForm" ref="bannerForm" :rules="rule" size="large">
                    <el-form-item label="小程序轮播图" label-width="120px" prop="pictures">
                        <el-upload class="upload-demo" :action="$_baseURL + $_uploadURL" :with-credentials="true" :on-remove="handleRemove" :on-success="handleSuccess" :on-exceed="handleExceed" :file-list="fileList" list-type="picture" :limit="5" show-file-list>
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最少一张图片，最多只能上传五张图片</div>
                        </el-upload>
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
      bannerForm: {
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
        pictures: [{ required: true, message: '图片不能为空', trigger: 'blur' }]
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
          this.bannerForm.pictures.splice(index, 1)
          arr.splice(index, 1)
        }
      })
    },
    // 上传图片成功执行的方法
    handleSuccess(res, file) {
      this.fileListTemp.push(file)
      this.bannerForm.pictures.push({ url: this.$baseURL + res.path })
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
      this.$refs.bannerForm.validate(valid => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '添加图片成功'
          })
        } else console.log('bannerForm err')
      })
    }
  },
  mounted() {
    this.getShopTypeList()
  }
}
</script>
