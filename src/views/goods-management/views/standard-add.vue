<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="14" :offset="5">
      <el-col :span="20">
        <el-card>
          <el-form :model="{}" ref="categoryForm" :rules="rule" size="large">
            <el-row v-for="(standard,index) in standardForm" :key="index">
              <el-form-item label="规格名称" label-width="120px" prop="categoryNumber">
                <el-input v-model="standardForm[index].name" auto-complete="off" placeholder="请填写规格名称"></el-input>
                <!-- <div class="property-button add-properties add-standard" @click="addStandard()" v-if="standardForm.length === index + 1">+</div> -->
                <div class="property-button decede-properties decede-standard" @click="decedeStandardForm(index)" v-if="standardForm.length > 1">-</div>
              </el-form-item>
              <el-form-item v-for="(param,ind) in standardForm[index].params" :key="ind" label="规格参数" label-width="120px" prop="name">
                <el-input v-model="param.value" auto-complete="off" placeholder="请填写规格参数"></el-input>
                <div class="property-button add-properties add-standard" @click="addParams(index)" v-if="standardForm[index].params.length === ind + 1">+</div>
                <div class="property-button decede-properties decede-standard" @click="decedeParams(index,ind)" v-if="standardForm[index].params.length > 1">-</div>
              </el-form-item>
              <el-row class="split-line"></el-row>
            </el-row>
            <el-form-item label="">
              <el-button type="primary" size="medium" @click="saveStandardConfirm">保存</el-button>
              <el-button type="success" size="medium" @click="addStandard">新增</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      standardForm: [
        {
          name: '',
          params: [{
            value: ''
          }]
        }
      ],
      fileList2: [],
      rule: {
        categoryNumber: [
          { required: true, message: '分类编号不能为空', trigger: 'blur' }
        ],
        name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions({
      saveStandard: 'saveStandard'
    }),
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    decedeStandardForm(index) {
      this.standardForm.splice(index, 1)
    },
    // 点击新增执行的方法
    addStandard() {
      this.standardForm.push({
        name: '',
        params: [{
          value: ''
        }]
      })
    },
    addParams(index) {
      this.standardForm[index].params.push({ value: '' })
    },
    decedeParams(index, ind) {
      this.standardForm[index].params.splice(ind, 1)
    },
    saveStandardConfirm() {
      this.$refs['categoryForm'].validate(valid => {
        if (valid) this.saveStandard(this.standardForm)
        else console.log('saveStandard err')
      })
    }
  }
}
</script>
