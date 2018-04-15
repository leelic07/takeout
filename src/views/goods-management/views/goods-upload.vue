<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="14" :offset="5">
      <el-card>
        <el-form :model="goods" ref="goodsForm" :rules="rule" size="large">
          <el-form-item label="商品编号" label-width="120px" prop="code">
            <el-input v-model="goods.code" auto-complete="off" placeholder="请填写商品编号"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" label-width="120px" prop="name">
            <el-input v-model="goods.name" auto-complete="off" placeholder="请填写商品名称"></el-input>
          </el-form-item>
          <el-form-item label="单位" label-width="120px" prop="unit">
            <el-input v-model="goods.unit" auto-complete="off" placeholder="请填写商品单位(如:盒)"></el-input>
          </el-form-item>
          <el-form-item label="价格" label-width="120px" prop="price">
            <el-input v-model="goods.price" auto-complete="off" placeholder="请填写价格"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" label-width="120px" prop="itemType">
            <el-select v-model="goods.itemType" placeholder="请选择商品分类">
              <el-option v-for="item in goodsTypeList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" label-width="120px" prop="label">
            <el-input v-model="goods.label" auto-complete="off" placeholder="请填写商品标签"></el-input>
          </el-form-item>
          <el-form-item label="打包费" label-width="120px">
            <el-input v-model="goods.package" auto-complete="off" placeholder="请填写打包费"></el-input>
          </el-form-item>
          <el-form-item label="库存状态" label-width="120px" prop="stockStatus">
            <el-radio-group v-model="goods.stockStatus">
              <el-radio label="0">有限</el-radio>
              <el-radio label="1">无限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="库存量" label-width="120px" prop="stock">
            <el-input v-model="goods.stock" auto-complete="off" placeholder="请填写库存量"></el-input>
          </el-form-item>
          <el-form-item label="商品状态" label-width="120px" prop="isPuton">
            <el-radio-group v-model="goods.isPuton">
              <el-radio label="1">在售</el-radio>
              <el-radio label="0">下架</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品图片" placeholder="请填写地址" label-width="120px">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="goods.pictures" list-type="picture" :limit="5" show-file-list :auto-upload="false">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最少一张图片，最多只能上传五张图片</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品售卖店铺" label-width="120px" prop="checkList">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="goods.merchants" @change="handleCheckMerchantChange">
              <el-checkbox v-for="(merchant,index) in merchantList" :label="merchant.id" :key="index">{{merchant.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品属性" label-width="120px">
            <el-button type="primary" size="small" @click="dialogFormVisible = !dialogFormVisible">添加商品属性</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="saveGoodsConfirm">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!--添加商品属性弹出框-->
      <el-dialog class="property-dialog" title="商品属性" :visible.sync="dialogFormVisible">
        <el-row v-for="(pro,index) in goods.propertys" :key="index">
          <el-col>
            <el-col :span="2">
              <label for="">属性名</label>
            </el-col>
            <el-col :span="8">
              <el-select v-model="pro.name" placeholder="请选择属性名">
                <el-option v-for="(pro,index) in shopPropertyList" :value="pro.id" :label="pro.name" :key="index"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" :offset="2">
              <div class="property-button add-properties" @click="addPropertyForm">+</div>
              <div class="property-button decede-properties" @click="decedePropertyForm(index)" v-if="goods.propertys.length > 1">-</div>
            </el-col>
          </el-col>
          <el-col v-for="(ps,ind) in pro.properties" :key="ind" label="">
            <el-col :span="3">
              <label for="">属性值：</label>
            </el-col>
            <el-col :span="7">
              <!-- <el-input v-model="ps.value" auto-complete="off" placeholder="请填写属性值"></el-input> -->
              <span>{{ps.value}}</span>
            </el-col>
            <el-col :span="2" :offset="1">
              <label for="">价格</label>
            </el-col>
            <el-col :span="8">
              <el-input v-model="ps.price" auto-complete="off" placeholder="请填写价格"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <div class="property-button add-properties" @click="addProperties(index)">+</div>
              <div class="property-button decede-properties" @click="decedeProperties(index,ind)" v-if="goods.propertys[index].properties.length > 1">-</div>
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
      goods: {
        merchants: [],
        propertys: [{
          name: '',
          properties: [{
            value: 'xxx',
            price: ''
          }]
        }]
      },
      fileList2: [],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      rule: {
        code: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        unit: [{ required: true, message: '商品单位不能为空', trigger: 'blur' }],
        price: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }],
        stockStatus: [{ required: true, message: '库存状态不能为空', trigger: 'blur' }],
        stock: [{ required: true, message: '商品库存不能为空', trigger: 'blur' }],
        itemType: [{ required: true, message: '商品状态不能为空', trigger: 'blur' }],
        label: [{ required: true, message: '标签不能为空', trigger: 'blur' }],
        isPuton: [{ required: true, message: '商品状态不能为空', trigger: 'blur' }],
        checkList: [{ required: true, message: '商品店铺不能为空', trigger: 'blur' }]
      },
      shopPropertyList: [{
        id: 1,
        name: '辣椒'
      }, {
        id: 2,
        name: '冰块'
      }, {
        id: 3,
        name: '甜度'
      }],
      checkAll: false,
      isIndeterminate: true
    }
  },
  computed: {
    ...mapGetters([
      'goodsTypeList',
      'merchantList'
    ])
  },
  methods: {
    ...mapActions({
      getGoodsTypeList: 'getGoodsTypeList',
      saveGoods: 'saveGoods',
      getMerchantsList: 'getMerchantsList'
    }),
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 添加属性名
    addPropertyForm() {
      this.goods.propertys.push({
        name: '',
        properties: [{
          value: 'xxx',
          price: ''
        }]
      })
    },
    // 减少属性名
    decedePropertyForm(index) {
      this.goods.propertys.length > 1 && this.goods.propertys.splice(index, 1)
    },
    // 添加属性值
    addProperties(index) {
      this.goods.propertys[index].properties.push({
        value: 'xxx',
        price: ''
      })
    },
    // 减少属性值
    decedeProperties(index, i) {
      this.goods.propertys[index].properties.length > 1 && this.goods.propertys[index].properties.splice(i, 1)
    },
    // 确定保存商品
    saveGoodsConfirm() {
      this.$refs.goodsForm.validate(valid => {
        if (valid) this.saveGoods(this.goods)
        else console.log('err saveGoods')
      })
    },
    // 点击全选时执行的方法
    handleCheckAllChange(val) {
      val ? this.merchantList.forEach(merchant => {
        this.goods.merchants.push(merchant.id)
      }) : this.goods.merchants.splice(0)
      this.isIndeterminate = false
    },
    // 选择商铺时执行的方法
    handleCheckMerchantChange(val) {
      this.checkAll = val.length === this.merchantList.length
      this.isIndeterminate = val.length > 0 && val.length < this.merchantList.length
    }
  },
  mounted() {
    this.getGoodsTypeList()
    this.getMerchantsList()
  }
}
</script>
