<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box"
      :span="14"
      :offset="5">
      <el-card class="user-box">
        <el-form label-position="right"
          :model="manager"
          ref="goodsForm"
          size="large">
          <el-col class="shop-message">
            <el-tag>基本信息</el-tag>
          </el-col>
          <el-form-item label="用户名："
            label-width="120px">
            <span>{{manager.name}}</span>
          </el-form-item>
          <el-form-item label="用户手机号码："
            label-width="120px">
            <span>{{manager.merchants ? manager.merchants.tel : ''}}</span>
          </el-form-item>
          <el-form-item label="店铺："
            label-width="120px">
            <span>{{manager.merchants ? manager.merchants.name : ''}}</span>
          </el-form-item>
          <el-form-item label="登录时间："
            label-width="120px">
            <span>{{manager.lastTime | Date}}</span>
          </el-form-item>
          <el-form-item label="类型："
            label-width="120px">
            <el-radio-group v-model="manager.type">
              <el-radio label="0"
                :disabled="manager.type === '1'">普通</el-radio>
              <el-radio label="1"
                :disabled="manager.type === '0'">超级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              size="medium"
              @click="modifyPassword">修改密码</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <!--修改密码弹出框-->
    <el-dialog class="modify-box"
      title="修改密码"
      :visible.sync="dialogFormVisible">
      <el-form ref="userForm"
        label-position="right"
        :model="userForm"
        :rules="userRule"
        size="small">
        <el-form-item label="旧密码"
          :label-width="formLabelWidth"
          prop="old_password">
          <el-input v-model="userForm.old_password"
            auto-complete="off"
            placeholder="请填写旧密码"
            type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
          :label-width="formLabelWidth"
          prop="new_password">
          <el-input v-model="userForm.new_password"
            auto-complete="off"
            placeholder="请填写新密码"
            type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码"
          :label-width="formLabelWidth"
          prop="repeat_password">
          <el-input v-model="userForm.repeat_password"
            auto-complete="off"
            placeholder="请重复新密码"
            type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false"
          size="small">取 消</el-button>
        <el-button type="primary"
          size="small"
          @click="resetPassword">保 存</el-button>
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
        formLabelWidth: '120px',
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
        userRule: {
          old_password: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
          new_password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
            { min: 5, message: '密码长度不能小于5', trigger: 'blur' }
          ],
          repeat_password: [
            { validator: validatePassword, trigger: 'blur' },
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { min: 5, message: '密码长度不能小于5', trigger: 'blur' }
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
        getUserById: 'getUserById'
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
      this.getUserById(sessionStorage.getItem('userId'))
    }
  }
</script>
