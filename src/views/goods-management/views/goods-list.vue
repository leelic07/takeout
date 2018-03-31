<template>
    <el-row class="goods-management-container">
        <!--搜索框-->
        <el-row>
            <el-col :span="5">
                <el-input placeholder="请输入商品名称" v-model="orderNumber"></el-input>
            </el-col>
            <el-col :span="5" class="member-select">
                <el-input placeholder="请输入商品编号" v-model="orderNumber"></el-input>
            </el-col>
            <el-date-picker v-model="datetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-row>
        <!--会员信息列表-->
        <el-row class="order-statics">
            <el-table :data="orderList" stripe border fit="true" style="width: 100%">
                <el-table-column type="index" :index="1" label="序号"></el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="goodsNumber" label="编号"></el-table-column>
                <el-table-column prop="unit" label="商品单位"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="category" label="商品分类">
                </el-table-column>
                <el-table-column prop="tag" label="标签"></el-table-column>
                <el-table-column prop="saleQuantity" label="销售量"></el-table-column>
                <el-table-column prop="status" label="库存状态"></el-table-column>
                <el-table-column prop="quantity" label="库存量"></el-table-column>
                <el-table-column prop="goodsStatus" label="商品状态"></el-table-column>
                <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editMember(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deleteMember(scope.row.id)">下架</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!--分页组件-->
        <pagination :total="orderList.length" :page="pagination.page" :rows="pagination.rows"></pagination>
        <!--编辑会员信息对话框-->
        <el-dialog class="member-editor" title="编辑会员" :visible.sync="dialogFormVisible">
            <el-form :model="memberMessage" size="mini">
                <el-form-item label="商品名称" label-width="120px">
                    <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写姓名"></el-input>
                </el-form-item>
                <el-form-item label="单位" label-width="120px">
                    <el-input v-model="memberMessage.unit" auto-complete="off" placeholder="请填写性别"></el-input>
                </el-form-item>
                <el-form-item label="价格" label-width="120px">
                    <el-input v-model="memberMessage.price" auto-complete="off" placeholder="请填写电话"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" label-width="120px">
                    <el-select v-model="memberMessage.orderStatus" placeholder="请选择会员等级">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签" label-width="120px">
                    <el-input v-model="memberMessage.tag" auto-complete="off" placeholder="请填写地址"></el-input>
                </el-form-item>
                <el-form-item label="库存状态" label-width="120px">
                    <el-input v-model="memberMessage.goodsStatus" auto-complete="off" placeholder="请填写备注"></el-input>
                </el-form-item>
                <el-form-item label="库存量" label-width="120px">
                    <el-input v-model="memberMessage.quantity" auto-complete="off" placeholder="请填写备注"></el-input>
                </el-form-item>
                <el-form-item label="商品状态" label-width="120px">
                    <el-select v-model="memberMessage.orderStatus" placeholder="请选择会员等级">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品图片" placeholder="请填写地址" label-width="120px">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="memberMessage.imageUrl" :src="memberMessage.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
import Pagination from '@/components/Pagination/index'

export default {
  data() {
    return {
      orderList: [{
        goodsNumber: 12345678324324,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }, {
        goodsNumber: 12345678,
        name: '扬州炒饭',
        unit: '份',
        tag: '必点,招牌',
        price: 10,
        category: '卤粉',
        saleQuantity: 999,
        status: '有货',
        quantity: 9999,
        goodsStatus: '在售'
      }], // 订单统计列表
      orderNumber: '', // 订单号
      datetime: '', // 日期时间
      pagination: {// 分页信息
        page: 1,
        rows: 10
      },
      options: [{
        value: 1,
        label: '钻石会员'
      }, {
        value: '2',
        label: '黄金会员'
      }, {
        value: '3',
        label: '白银会员'
      }],
      value: '', // 选择会员等级
      dialogDetailVisible: false,
      dialogFormVisible: false,
      memberMessage: {
        imageUrl: ''
      }, // 会员详情信息
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      imageUrl: '' // 上传头像的图片路径
    }
  },
  components: {
    Pagination
  },
  methods: {
    // 点击详情执行的方法
    showMemberDetail(row) {
      this.dialogDetailVisible = true
      this.memberMessage = row
    },
    // 点击编辑执行的方法
    editMember(row) {
      this.dialogFormVisible = true
      this.memberMessage = row
    },
    // 会员头像上传成功执行的方法
    handleAvatarSuccess(file) {
      console.log(file)
    },
    // 会员头像上传之前执行的方法
    beforeAvatarUpload(file) {
      console.log(file)
    },
    // 点击删除执行的方法
    deleteMember(id) {
      this.$confirm('确定下架该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '下架成功!'
        })
      }).catch(err => console.log(err))
    }
  }
}
</script>
