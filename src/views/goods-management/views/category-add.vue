<template>
    <el-row class="goods-upload-container">
        <el-col class="goods-upload-box" :span="14" :offset="5">
            <el-card>
                <el-form :model="memberMessage" ref="categoryForm" :rules="rule" size="large">
                    <el-form-item label="分类编号" label-width="120px" prop="categoryNumber">
                        <el-input v-model="memberMessage.categoryNumber" auto-complete="off" placeholder="请填写商品编号"></el-input>
                    </el-form-item>
                    <el-form-item label="分类名称" label-width="120px" prop="name">
                        <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="samll">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
  export default {
    data() {
      return {
        memberMessage: {},
        fileList2: [],
        rule: {
          categoryNumber: [{ required: true, message: '分类编号不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }]
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      }
    }
  }
</script>
