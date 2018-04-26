<template>
    <el-row class="goods-upload-container">
        <el-col class="goods-upload-box" :span="14" :offset="5">
            <el-card>
                <el-form :model="shopForEdit" ref="shopForm" :rules="rule" size="large">
                    <el-col class="shop-message">
                        <el-tag>基本信息</el-tag>
                    </el-col>
                    <el-form-item label="店铺编号" label-width="120px" prop="code">
                        <el-input v-model="shopForEdit.code" auto-complete="off" placeholder="请填写店铺编号"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺名称" label-width="120px" prop="name">
                        <el-input v-model="shopForEdit.name" auto-complete="off" placeholder="请填写店铺名称"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺类型" label-width="120px" prop="typeId">
                        <!-- <el-radio-group v-model="shopForEdit.typeId">
                            <el-radio label="1">普通</el-radio>
                            <el-radio label="2">超级</el-radio>
                        </el-radio-group> -->
                        <el-select v-model="shopForEdit.typeId" placeholder="请选择店铺类型">
                            <el-option v-for="item in shopTypeList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="店铺经度" label-width="120px" prop="lat">
                        <el-input v-model="shopForEdit.lat" auto-complete="off" placeholder="请填写店铺经度"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺维度" label-width="120px" prop="lng">
                        <el-input v-model="shopForEdit.lng" auto-complete="off" placeholder="请填写店铺维度"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="120px" prop="tel">
                        <el-input v-model="shopForEdit.tel" auto-complete="off" placeholder="请填写联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址" label-width="120px" prop="address">
                        <el-input v-model="shopForEdit.address" auto-complete="off" placeholder="请填店铺地址"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人姓名" label-width="120px" prop="managerName">
                        <el-input v-model="shopForEdit.managerName" auto-complete="off" placeholder="请填写负责人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人手机号" label-width="120px" prop="managerPhone">
                        <el-input v-model="shopForEdit.managerPhone" auto-complete="off" placeholder="请填写负责人手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺介绍" label-width="120px" prop="description">
                        <el-input v-model="shopForEdit.description" auto-complete="off" placeholder="请填写店铺介绍"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺图片" placeholder="请填写地址" label-width="120px">
                        <el-upload class="upload-demo" :action="$_baseURL + $_uploadURL" :with-credentials="true" :on-remove="handleRemove" :on-success="handleSuccess" :on-exceed="handleExceed" :file-list="fileList" list-type="picture" :limit="5" show-file-list>
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最少一张图片，最多只能上传五张图片</div>
                        </el-upload>
                    </el-form-item>
                    <el-col class="shop-message">
                        <el-tag>营业信息</el-tag>
                    </el-col>
                    <el-form-item label="店铺状态" label-width="120px" prop="isOnline">
                        <el-radio-group v-model="shopForEdit.isOnline">
                            <el-radio label="1">上线</el-radio>
                            <el-radio label="0">下线</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="店铺公告" label-width="120px" prop="notice">
                        <el-input type="textarea" placeholder="请填写店铺公告" v-model="shopForEdit.notice"></el-input>
                    </el-form-item>
                    <el-form-item label="营业时间" label-width="120px" prop="time">
                        <el-time-picker is-range v-model="shopForEdit.time" range-separator="——" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>
                    <el-col class="shop-message">
                        <el-tag>配送信息</el-tag>
                    </el-col>
                    <el-form-item label="起送价" label-width="120px" prop="startingPrice">
                        <el-input v-model="shopForEdit.startingPrice" auto-complete="off" placeholder="请填写起送价"></el-input>
                    </el-form-item>
                    <el-form-item label="满多少免配送费" label-width="120px" prop="fullFreeDistribution">
                        <el-input v-model="shopForEdit.fullFreeDistribution" auto-complete="off" placeholder="请填写满多少免配送费"></el-input>
                    </el-form-item>
                    <el-form-item label="配送费" label-width="120px" prop="distributionFee">
                        <el-input v-model="shopForEdit.distributionFee" auto-complete="off" placeholder="请填写配送费"></el-input>
                    </el-form-item>
                    <el-form-item label="配送范围" label-width="120px">
                        <el-input v-model="shopForEdit.distributionScope" auto-complete="off" placeholder="请填写配送范围"></el-input>
                    </el-form-item>
                    <!-- <el-col class="shop-message">
                        <el-tag>登录信息</el-tag>
                    </el-col>
                    <el-form-item label="商户登录账户" label-width="120px" prop="accountName">
                        <el-input v-model="shopForEdit.accountName" auto-complete="off" placeholder="请填写配送范围"></el-input>
                    </el-form-item>
                    <el-form-item label="商户登录密码" label-width="120px" prop="accountPassword">
                        <el-input type="password" v-model="shopForEdit.accountPassword" auto-complete="off" placeholder="请填写配送范围"></el-input>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="updateShopConfirm">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <!--添加商品属性弹出框-->
            <el-dialog class="property-dialog" title="收货地址" :visible.sync="dialogFormVisible">
                <el-row v-for="(pro,index) in propertyForm" :key="index">
                    <el-col>
                        <el-col :span="2">
                            <label for="">属性名</label>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="pro.name" auto-complete="off" placeholder="请填写属性名"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="2">
                            <div class="property-button add-properties" @click="addPropertyForm">+</div>
                            <div class="property-button decede-properties" @click="decedePropertyForm(index)" v-if="propertyForm.length > 1">-</div>
                        </el-col>
                    </el-col>
                    <el-col v-for="(ps,ind) in pro.properties" :key="ind" label="">
                        <el-col :span="2">
                            <label for="">属性值</label>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="ps.value" auto-complete="off" placeholder="请填写属性值"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <label for="">价格</label>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="ps.price" auto-complete="off" placeholder="请填写价格"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <div class="property-button add-properties" @click="addProperties(index)">+</div>
                            <div class="property-button decede-properties" @click="decedeProperties(index,ind)" v-if="propertyForm[index].properties.length > 1">-</div>
                        </el-col>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false" size="small">确 定</el-button>
                </div>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
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
        code: [{ required: true, message: '商户编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '商户名称不能为空', trigger: 'blur' }],
        typeId: [{ required: true, message: '商户类型不能为空', trigger: 'blur' }],
        lat: [{ required: true, message: '店铺经度不能为空', trigger: 'blur' }],
        lng: [{ required: true, message: '店铺维度不能为空', trigger: 'blur' }],
        tel: [{ required: true, message: '店铺联系电话不能为空', trigger: 'blur' }],
        address: [{ required: true, message: '店铺地址不能为空', trigger: 'blur' }],
        managerName: [{ required: true, message: '负责人姓名不能为空', trigger: 'blur' }],
        managerPhone: [{ required: true, message: '负责人电话不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '店铺介绍不能为空', trigger: 'blur' }],
        notice: [{ required: true, message: '店铺公告不能为空', trigger: 'blur' }],
        datetime: [{ required: true, message: '店铺营业时间不能为空', trigger: 'blur' }],
        startingPrice: [{ required: true, message: '起送价不能为空', trigger: 'blur' }],
        fullFreeDistribution: [{ required: true, message: '满多少免配送费不能为空', trigger: 'blur' }],
        distributionFee: [{ required: true, message: '配送费不能为空', trigger: 'blur' }],
        accountName: [{ required: true, message: '商户登录账户不能为空', trigger: 'blur' }],
        accountPassword: [{ required: true, message: '商户登录密码不能为空', trigger: 'blur' }],
        isOnline: [{ required: true, message: '店铺状态不能为空', trigger: 'blur' }],
        time: [{ required: true, message: '营业时间不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    shopForEdit(newValue) {
      this.fileList = newValue.pictures
    }
  },
  computed: {
    ...mapGetters([
      'shopTypeList',
      'shopForEdit'
    ])
  },
  methods: {
    ...mapActions({
      updateShop: 'updateShop',
      getShopTypeList: 'getShopTypeList',
      getShopForEdit: 'getShopForEdit'
    }),
    handleRemove(file) {
      this.fileListTemp.forEach((f, index, arr) => {
        if (f.url === file.url) {
          this.shopForEdit.pictures.splice(index, 1)
          arr.splice(index, 1)
        }
      })
    },
    // 上传图片成功执行的方法
    handleSuccess(res, file) {
      this.fileListTemp.push(file)
      this.shopForEdit.pictures.push({ url: res.path })
    },
    // 图片上传超过限制执行的方法
    handleExceed() {
      this.$message({
        type: 'warning',
        message: '最多只能上传5张图片'
      })
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
    // 保存新增商户信息
    updateShopConfirm() {
      this.$refs.shopForm.validate(valid => {
        if (valid) this.updateShop(this.shopForEdit)
        else return
      })
    }
  },
  mounted() {
    this.getShopTypeList()
    this.getShopForEdit(this.$route.params.id)
  }
}
</script>
