<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="14" :offset="5">
      <el-card>
        <el-form :model="memberMessage" ref="goodsForm" :rules="rule" size="large">
          <el-form-item label="商品编号" label-width="120px" prop="goodsNumber">
            <el-input v-model="memberMessage.goodsNumber" auto-complete="off" placeholder="请填写商品编号"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" label-width="120px" prop="name">
            <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写商品名称"></el-input>
          </el-form-item>
          <el-form-item label="单位" label-width="120px" prop="unit">
            <el-input v-model="memberMessage.unit" auto-complete="off" placeholder="请填写商品单位(如:盒)"></el-input>
          </el-form-item>
          <el-form-item label="价格" label-width="120px" prop="price">
            <el-input v-model="memberMessage.price" auto-complete="off" placeholder="请填写价格"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" label-width="120px">
            <el-select v-model="memberMessage.category" placeholder="请选择商品分类">
              <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="标签" label-width="120px">
            <el-input v-model="memberMessage.tag" auto-complete="off" placeholder="请填写商品标签"></el-input>
          </el-form-item>
          <el-form-item label="打包费" label-width="120px">
            <el-input v-model="memberMessage.package" auto-complete="off" placeholder="请填写打包费"></el-input>
          </el-form-item>
          <el-form-item label="库存状态" label-width="120px" prop="goodsStatus">
            <el-radio v-model="memberMessage.goodsStatus" label="1">有限</el-radio>
            <el-radio v-model="memberMessage.goodsStatus" label="2">无限</el-radio>
          </el-form-item>
          <el-form-item label="库存量" label-width="120px" prop="quantity">
            <el-input v-model="memberMessage.quantity" auto-complete="off" placeholder="请填写库存量"></el-input>
          </el-form-item>
          <el-form-item label="商品状态" label-width="120px" prop="orderStatus">
            <el-select v-model="memberMessage.orderStatus" placeholder="请选择商品状态">
              <el-option value="1" label="在售"></el-option>
              <el-option value="2" label="下架"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品图片" placeholder="请填写地址" label-width="120px">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture" :limit="5" show-file-list :auto-upload="false">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最少一张图片，最多只能上传五张图片</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品售卖店铺" label-width="120px" prop="checkList">
            <el-checkbox-group v-model="memberMessage.checkList">
              <el-checkbox label="店铺A"></el-checkbox>
              <el-checkbox label="店铺B"></el-checkbox>
              <el-checkbox label="店铺C"></el-checkbox>
              <el-checkbox label="店铺D" disabled></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品属性" label-width="120px">
            <el-button type="primary" size="small" @click="dialogFormVisible = !dialogFormVisible">添加商品属性</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium">保存</el-button>
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
        formLabelWidth: '80px',
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
      }
    }
  }
</script>
