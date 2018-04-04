<template>
    <el-row class="goods-upload-container">
        <el-col class="goods-upload-box" :span="14" :offset="5">
            <el-card>
                <el-form :model="memberMessage" ref="goodsForm" :rules="rule" size="large">
                    <el-col class="shop-message">
                        <el-tag>基本信息</el-tag>
                    </el-col>
                    <el-form-item label="店铺编号" label-width="120px" prop="goodsNumber">
                        <el-input v-model="memberMessage.goodsNumber" auto-complete="off" placeholder="请填写商品编号"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺名称" label-width="120px" prop="name">
                        <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写店铺名称"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺类型" label-width="120px" prop="unit">
                        <el-input v-model="memberMessage.unit" auto-complete="off" placeholder="请填写店铺类型"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺经度" label-width="120px" prop="unit">
                        <el-input v-model="memberMessage.unit" auto-complete="off" placeholder="请填写店铺经度"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺维度" label-width="120px" prop="unit">
                        <el-input v-model="memberMessage.unit" auto-complete="off" placeholder="请填写店铺维度"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="120px" prop="price">
                        <el-input v-model="memberMessage.price" auto-complete="off" placeholder="请填写联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址" label-width="120px">
                        <el-select v-model="memberMessage.category" placeholder="请选择店铺地址">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责人姓名" label-width="120px">
                        <el-input v-model="memberMessage.tag" auto-complete="off" placeholder="请填写负责人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人手机号" label-width="120px">
                        <el-input v-model="memberMessage.package" auto-complete="off" placeholder="请填写负责人手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺介绍" label-width="120px" prop="quantity">
                        <el-input v-model="memberMessage.quantity" auto-complete="off" placeholder="请填写店铺介绍"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺图片" placeholder="请填写地址" label-width="120px">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture" :limit="5" show-file-list :auto-upload="false">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最少一张图片，最多只能上传五张图片</div>
                        </el-upload>
                    </el-form-item>
                    <el-col class="shop-message">
                        <el-tag>营业信息</el-tag>
                    </el-col>
                    <el-form-item label="店铺状态" label-width="120px" prop="goodsStatus">
                        <el-radio-group v-model="memberMessage.goodsStatus">
                            <el-radio label="1">上线</el-radio>
                            <el-radio label="2">下线</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="店铺公告" label-width="120px">
                        <el-input type="textarea" placeholder="请填写店铺公告" v-model="memberMessage.publish"></el-input>
                    </el-form-item>
                    <el-form-item label="营业时间" label-width="120px">
                        <el-date-picker v-model="memberMessage.datetime" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-col class="shop-message">
                        <el-tag>配送信息</el-tag>
                    </el-col>
                    <el-form-item label="起送价" label-width="120px">
                        <el-input v-model="memberMessage.quantity" auto-complete="off" placeholder="请填写起送价"></el-input>
                    </el-form-item>
                    <el-form-item label="满多少免配送费" label-width="120px">
                        <el-input v-model="memberMessage.quantity" auto-complete="off" placeholder="请填写满多少免配送费"></el-input>
                    </el-form-item>
                    <el-form-item label="配送费" label-width="120px">
                        <el-input v-model="memberMessage.quantity" auto-complete="off" placeholder="请填写配送费"></el-input>
                    </el-form-item>
                    <el-form-item label="配送范围" label-width="120px">
                        <el-input v-model="memberMessage.quantity" auto-complete="off" placeholder="请填写配送范围"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium">保存</el-button>
                        <el-button type="success" size="medium">上线</el-button>
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
