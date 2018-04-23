<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="14" :offset="5">
      <el-col :span="20">
        <el-card>
          <el-form :model="propertyForEdit" ref="categoryForm" :rules="rule" size="large">
            <!-- <el-row v-for="(standard,index) in standardForm" :key="index"> -->
              <el-form-item label="规格名称" label-width="120px">
                <el-input v-model="propertyForEdit.name" auto-complete="off" placeholder="请填写规格名称"></el-input>
                <!-- <div class="property-button add-properties add-standard" @click="addStandard()" v-if="standardForm.length === index + 1">+</div> -->
                <!-- <div class="property-button decede-properties decede-standard" @click="decedeStandardForm(index)" v-if="standardForm.length > 1">-</div> -->
              </el-form-item>
              <el-form-item v-for="(param,ind) in propertyForEdit.subPropertys" :key="ind" label="规格参数" label-width="120px">
                <el-input v-model="param.name" auto-complete="off" placeholder="请填写规格参数"></el-input>
                <!-- <div class="property-button add-properties add-standard" @click="addParams(index)" v-if="standardForm[index].subPropertys.length === ind + 1">+</div>
                <div class="property-button decede-properties decede-standard" @click="decedeParams(index,ind)" v-if="standardForm[index].subPropertys.length > 1">-</div> -->
              </el-form-item>
              <el-row class="split-line"></el-row>
            <!-- </el-row> -->
            <el-form-item label="">
              <el-button type="primary" size="medium" @click="saveStandardConfirm">更新</el-button>
              <!-- <el-button type="success" size="medium" @click="addStandard">新增</el-button> -->
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      standardForm: [{
        name: '',
        subPropertys: [{
          name: ''
        }]
      }],
      fileList2: [],
      rule: {
        name: [{ required: true, message: '规格名称不能为空', trigger: 'blur' }],
        value: [{ required: true, message: '规格参数不能为空', trigger: 'blur' }]
      },
      categoryForm: {
        name: '',
        value: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'propertyForEdit'
    ])
  },
  methods: {
    ...mapActions({
      saveStandard: 'saveStandard',
      editProperty: 'editProperty'
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
        subPropertys: [{
          name: ''
        }]
      })
    },
    addParams(index) {
      this.standardForm[index].subPropertys.push({ name: '' })
    },
    decedeParams(index, ind) {
      this.standardForm[index].subPropertys.splice(ind, 1)
    },
    saveStandardConfirm() {
      this.$refs['categoryForm'].validate(valid => {
        if (valid) this.saveStandard(this.standardForm)
        else console.log('saveStandard err')
      })
    }
  },
  mounted() {
    this.editProperty(this.$route.params.id)
  }
}
</script>
