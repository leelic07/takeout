<template>
    <el-row class="goods-upload-container">
        <el-col class="goods-upload-box" :span="14" :offset="5">
            <el-card>
                <el-form label-position="right" :model="memberMessage" ref="goodsForm" :rules="rule" size="large">
                    <el-col class="shop-message">
                        <el-tag>基本信息</el-tag>
                    </el-col>
                    <el-form-item label="用户名" label-width="120px" prop="goodsNumber">
                        <el-input v-model="memberMessage.goodsNumber" auto-complete="off" placeholder="请填写用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户手机号码" label-width="120px" prop="name">
                        <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写用户手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺" label-width="120px" prop="unit">
                        <el-input v-model="memberMessage.unit" auto-complete="off" placeholder="请填写店铺名称"></el-input>
                    </el-form-item>
                    <el-form-item label="登录时间" label-width="120px" prop="unit">
                        <el-input v-model="memberMessage.unit" auto-complete="off" placeholder="请填写登录时间"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" label-width="120px" prop="unit">
                        <el-radio-group v-model="memberMessage.type">
                            <el-radio label="0">普通</el-radio>
                            <el-radio label="1">超级</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="modifyPassword">修改密码</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <!--修改密码弹出框-->
        <el-dialog class="modify-box" title="修改密码" :visible.sync="dialogFormVisible">
            <el-form label-position="right" :model="userForm" size="small">
                <el-form-item label="旧密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.old_password" auto-complete="off" placeholder="请填写旧密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.old_password" auto-complete="off" placeholder="请填写新密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.repeat_password" auto-complete="off" placeholder="请重复新密码" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
  export default {
    data() {
      return {
        memberMessage: {
          checkList: []
        },
        fileList2: [],
        dialogFormVisible: false,
        propertyForm: [{
          name: '',
          properties: [{
            value: '',
            price: ''
          }]
        }],
        userForm: {},
        formLabelWidth: '90px',
        rule: {
          goodsNumber: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
          unit: [{ required: true, message: '商品单位不能为空', trigger: 'blur' }],
          price: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }],
          goodsStatus: [{ required: true, message: '库存状态不能为空', trigger: 'blur' }],
          quantity: [{ required: true, message: '商品库存不能为空', trigger: 'blur' }],
          orderStatus: [{ required: true, message: '商品状态不能为空', trigger: 'blur' }],
          checkList: [{ required: true, message: '商品店铺不能为空', trigger: 'blur' }]
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      // 添加属性名
      addPropertyForm() {
        this.propertyForm.push({
          name: '',
          properties: [{
            value: '',
            price: ''
          }]
        })
      },
      // 减少属性名
      decedePropertyForm(index) {
        this.propertyForm.length > 1 && this.propertyForm.splice(index, 1)
      },
      // 添加属性值
      addProperties(index) {
        this.propertyForm[index].properties.push({
          value: '',
          price: ''
        })
      },
      // 减少属性值
      decedeProperties(index, i) {
        this.propertyForm[index].properties.length > 1 && this.propertyForm[index].properties.splice(i, 1)
      },
      // 点击修改密码
      modifyPassword() {
        this.dialogFormVisible = true
      }
    }
  }
</script>
