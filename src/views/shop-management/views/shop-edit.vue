<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box"
      :span="14"
      :offset="5">
      <el-card>
        <el-form :model="shopForEdit"
          ref="shopForm"
          :rules="rule"
          size="large">
          <el-col class="shop-message">
            <el-tag>基本信息</el-tag>
          </el-col>
          <el-form-item label="店铺编号"
            label-width="120px"
            prop="code">
            <el-input v-model="shopForEdit.code"
              auto-complete="off"
              placeholder="请填写店铺编号"></el-input>
          </el-form-item>
          <el-form-item label="店铺名称"
            label-width="120px"
            prop="name">
            <el-input v-model="shopForEdit.name"
              auto-complete="off"
              placeholder="请填写店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="店铺类型"
            label-width="120px"
            prop="typeId">
            <el-select v-model="shopForEdit.typeId"
              placeholder="请选择店铺类型">
              <el-option v-for="item in shopTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺经度"
            label-width="120px"
            prop="lat">
            <el-input v-model="shopForEdit.lat"
              auto-complete="off"
              placeholder="请填写店铺经度">
              <template slot="append">度</template>
            </el-input>
            <span class="latitude">例如：112.62</span>
          </el-form-item>
          <el-form-item label="店铺纬度"
            label-width="120px"
            prop="lng">
            <el-input v-model="shopForEdit.lng"
              auto-complete="off"
              placeholder="请填写店铺维度">
              <template slot="append">度</template>
            </el-input>
            <span class="latitude">例如：26.90</span>
          </el-form-item>
          <el-form-item label="联系电话"
            label-width="120px"
            prop="tel">
            <el-input v-model="shopForEdit.tel"
              auto-complete="off"
              placeholder="请填写联系电话"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址"
            label-width="120px"
            prop="address">
            <el-input v-model="shopForEdit.address"
              auto-complete="off"
              placeholder="请填店铺地址"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名"
            label-width="120px"
            prop="managerName">
            <el-input v-model="shopForEdit.managerName"
              auto-complete="off"
              placeholder="请填写负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="负责人手机号"
            label-width="120px"
            prop="managerPhone">
            <el-input v-model="shopForEdit.managerPhone"
              auto-complete="off"
              placeholder="请填写负责人手机号"></el-input>
          </el-form-item>
          <el-form-item label="店铺介绍"
            label-width="120px"
            prop="description">
            <el-input v-model="shopForEdit.description"
              auto-complete="off"
              placeholder="请填写店铺介绍"></el-input>
          </el-form-item>
          <el-form-item label="店铺图片"
            placeholder="请填写地址"
            label-width="120px">
            <upload-img :pictures="shopForEdit.pictures"
              :limit="limit"
              @handleRemove="handleRemove"
              @handleSuccess="handleSuccess">
            </upload-img>
          </el-form-item>
          <el-col class="shop-message">
            <el-tag>营业信息</el-tag>
          </el-col>
          <el-form-item label="店铺状态"
            label-width="120px"
            prop="isOnline">
            <el-radio-group v-model="shopForEdit.isOnline">
              <el-radio label="1">上线</el-radio>
              <el-radio label="0">下线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="店铺公告"
            label-width="120px"
            prop="notice">
            <el-input type="textarea"
              placeholder="请填写店铺公告"
              v-model="shopForEdit.notice"></el-input>
          </el-form-item>
          <el-form-item label="营业时间"
            label-width="120px"
            prop="time">
            <el-time-picker is-range
              v-model="shopForEdit.time"
              range-separator="——"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
          <el-col class="shop-message">
            <el-tag>配送信息</el-tag>
          </el-col>
          <el-form-item label="配送状态"
            label-width="120px"
            prop="distributionType">
            <el-radio-group v-model="shopForEdit.distributionType">
              <el-radio :label="0">商家配送</el-radio>
              <el-radio :label="1">闪送配送</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="起送价"
            label-width="120px"
            prop="startingPrice">
            <el-input v-model="shopForEdit.startingPrice"
              auto-complete="off"
              placeholder="请填写起送价">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="满多少免配送费"
            label-width="120px">
            <el-input v-model="shopForEdit.fullFreeDistribution"
              auto-complete="off"
              placeholder="请填写满多少免配送费">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="配送费"
            label-width="120px"
            prop="distributionFee">
            <el-input v-model="shopForEdit.distributionFee"
              auto-complete="off"
              placeholder="请填写配送费">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="配送范围"
            label-width="120px">
            <el-input v-model="shopForEdit.distributionScope"
              auto-complete="off"
              placeholder="请填写配送范围">
              <template slot="append">米</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              size="medium"
              @click="updateShopConfirm">更新</el-button>
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
      fileList: [],
      fileListTemp: [],
      limit: 5,
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
        startingPrice: [
          { required: true, message: '起送价不能为空', trigger: 'blur' },
          { pattern: '^\\d+(\\.\\d+)?$', message: '请输入有效数字', trigger: 'blur' }
        ],
        fullFreeDistribution: [
          { required: true, message: '满多少免配送费不能为空', trigger: 'blur' },
          { pattern: '^\\d+(\\.\\d+)?$', message: '请输入有效数字', trigger: 'blur' }
        ],
        distributionFee: [
          { required: true, message: '配送费不能为空', trigger: 'blur' },
          { pattern: '^\\d+(\\.\\d+)?$', message: '请输入有效数字', trigger: 'blur' }
        ],
        accountName: [{ required: true, message: '商户登录账户不能为空', trigger: 'blur' }],
        accountPassword: [{ required: true, message: '商户登录密码不能为空', trigger: 'blur' }],
        isOnline: [{ required: true, message: '店铺状态不能为空', trigger: 'blur' }],
        time: [{ required: true, message: '营业时间不能为空', trigger: 'blur' }],
        distributionType: [{ required: true, message: '配送状态不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    shopForEdit(newValue) {
      newValue.pictures.forEach(picture => {
        this.fileList.push(picture)
        this.fileListTemp.push(picture)
      })
    },
    updateShopResult() {
      if (this.type === '1') {
        this.$router.push({
          path: '/shop/list'
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'shopTypeList',
      'shopForEdit',
      'updateShopResult'
    ]),
    merchantId() {
      return sessionStorage['merchantId']
    },
    type() {
      return sessionStorage['type']
    }
  },
  methods: {
    ...mapActions({
      updateShop: 'updateShop',
      getShopTypeList: 'getShopTypeList',
      getShopForEdit: 'getShopForEdit'
    }),
    handleRemove(index) {
      this.shopForEdit.pictures.splice(index, 1)
    },
    handleSuccess(url) {
      this.shopForEdit.pictures.push(url)
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
    if (this.$route.params.id !== ':id') this.getShopForEdit(this.$route.params.id)
    else this.getShopForEdit(this.merchantId)
  }
}
</script>
