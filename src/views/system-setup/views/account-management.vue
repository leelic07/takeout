<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="14" :offset="5">
      <el-card class="user-box">
        <el-form label-position="right" :model="manager" ref="goodsForm" :rules="rule" size="large">
          <el-col class="shop-message">
            <el-tag>基本信息</el-tag>
          </el-col>
          <el-form-item label="用户名：" label-width="120px">
            <!-- <el-input v-model="manager.name" auto-complete="off" placeholder="请填写用户名"></el-input> -->
            <span>{{manager.name}}</span>
          </el-form-item>
          <el-form-item label="用户手机号码：" label-width="120px">
            <!-- <el-input v-model="manager.merchants.tel" auto-complete="off" placeholder="请填写用户手机号码"></el-input> -->
            <span>{{manager.merchants.tel}}</span>
          </el-form-item>
          <el-form-item label="店铺：" label-width="120px">
            <!-- <el-input v-model="manager.merchants.name" auto-complete="off" placeholder="请填写店铺名称"></el-input> -->
            <span>{{manager.merchants.name}}</span>
          </el-form-item>
          <el-form-item label="登录时间：" label-width="120px">
            <!-- <el-input v-model="manager.unit" auto-complete="off" placeholder="请填写登录时间"></el-input> -->
          </el-form-item>
          <el-form-item label="类型：" label-width="120px">
            <el-radio-group v-model="manager.type">
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
      <el-form ref="userForm" label-position="right" :model="userForm" :rules="userRule" size="small">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="old_password">
          <el-input v-model="userForm.old_password" auto-complete="off" placeholder="请填写旧密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="new_password">
          <el-input v-model="userForm.new_password" auto-complete="off" placeholder="请填写新密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" :label-width="formLabelWidth" prop="repeat_password">
          <el-input v-model="userForm.repeat_password" auto-complete="off" placeholder="请重复新密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="resetPassword">保 存</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      var validatePassword = (rule, value, callback) => {
        if (this.userForm.repeat_password !== this.userForm.new_password) {
          callback(new Error('确认密码不正确'))
        } else {
          callback()
        }
      }
      return {
        fileList2: [],
        dialogFormVisible: false,
        propertyForm: [{
          name: '',
          properties: [{
            value: '',
            price: ''
          }]
        }],
        userForm: {
          old_password: '',
          new_password: '',
          repeat_password: ''
        },
        formLabelWidth: '120px',
        rule: {
          goodsNumber: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
          unit: [{ required: true, message: '商品单位不能为空', trigger: 'blur' }],
          price: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }],
          goodsStatus: [{ required: true, message: '库存状态不能为空', trigger: 'blur' }],
          quantity: [{ required: true, message: '商品库存不能为空', trigger: 'blur' }],
          orderStatus: [{ required: true, message: '商品状态不能为空', trigger: 'blur' }],
          checkList: [{ required: true, message: '商品店铺不能为空', trigger: 'blur' }]
        },
        userRule: {
          old_password: [{ required: true, message: '旧用户密码不能为空', trigger: 'blur' }],
          new_password: [{ required: true, message: '新用户密码不能为空', trigger: 'blur' }],
          repeat_password: [
            { validator: validatePassword, trigger: 'blur' },
            { required: true, message: '请输入确认密码', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'manager'
      ])
    },
    methods: {
      ...mapActions({
        resetPwd: 'resetPwd',
        getManagerById: 'getManagerById'
      }),
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      // 点击修改密码
      modifyPassword() {
        this.dialogFormVisible = true
      },
      resetPassword() {
        this.$refs.userForm.validate(valid => {
          if (valid) this.resetPwd(this.userForm)
          else return
        })
      }
    },
    mounted() {
      this.getManagerById(sessionStorage.getItem('userId'))
    }
  }
</script>
