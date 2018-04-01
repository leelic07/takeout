<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="10" :offset="6">
      <el-form :model="memberMessage" ref="goodsForm" :rules="rule" size="large">
        <el-form-item label="商品编号" label-width="120px" prop="goodsNumber">
          <el-input v-model="memberMessage.goodsNumber" auto-complete="off" placeholder="请填写姓名"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px" prop="name">
          <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写姓名"></el-input>
        </el-form-item>
        <el-form-item label="单位" label-width="120px" prop="unit">
          <el-input v-model="memberMessage.unit" auto-complete="off" placeholder="请填写性别"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="memberMessage.price" auto-complete="off" placeholder="请填写电话"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" label-width="120px">
          <el-select v-model="memberMessage.category" placeholder="请选择会员等级">
            <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="标签" label-width="120px">
          <el-input v-model="memberMessage.tag" auto-complete="off" placeholder="请填写地址"></el-input>
        </el-form-item>
        <el-form-item label="库存状态" label-width="120px" prop="goodsStatus">
          <el-input v-model="memberMessage.goodsStatus" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="库存量" label-width="120px" prop="quantity">
          <el-input v-model="memberMessage.quantity" auto-complete="off" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" label-width="120px" prop="orderStatus">
          <el-select v-model="memberMessage.orderStatus" placeholder="请选择商品状态">
            <el-option value="1" label="在售"></el-option>
            <el-option value="2" label="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" placeholder="请填写地址" label-width="120px">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="memberMessage.imageUrl" :src="memberMessage.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        memberMessage: {},
        rule: {
          goodsNumber: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
          name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
          unit: [{ required: true, message: '商品单位不能为空', trigger: 'blur' }],
          price: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }],
          goodsStatus: [{ required: true, message: '库存状态不能为空', trigger: 'blur' }],
          quantity: [{ required: true, message: '商品库存不能为空', trigger: 'blur' }],
          orderStatus: [{ required: true, message: '商品状态不能为空', trigger: 'blur' }]
        }
      }
    },
    methods: {
      // 图片上传成功执行的方法
      handleAvatarSuccess(file) {
  
      },
      // 图片上传之前执行的方法
      beforeAvatarUpload(file) {
  
      }
    }
  }
</script>
