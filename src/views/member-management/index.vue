<template>
    <el-row class="member-management-container">
        <!--搜索框-->
        <el-row>
            <el-col :span="5">
                <el-input placeholder="请输入会员号" v-model="orderNumber"></el-input>
            </el-col>
            <el-col :span="5" class="member-select">
                <el-select v-model="value" placeholder="请选择会员等级">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-date-picker v-model="datetime" type="daterange" range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-row>
        <!--会员信息列表-->
        <el-row class="order-statics">
            <el-table :data="orderList" stripe border style="width: 100%">
                <el-table-column prop="orderNumber" label="会员号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="orderTime" label="注册时间" width="180"></el-table-column>
                <el-table-column label="会员等级">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.orderStatus === '钻石会员'" :closable="false">{{scope.row.orderStatus}}</el-tag>
                        <el-tag v-else-if="scope.row.orderStatus === '黄金会员'" type="warning" :closable="false">{{scope.row.orderStatus}}</el-tag>
                        <el-tag v-else-if="scope.row.orderStatus === '白银会员'" type="info" :closable="false">{{scope.row.orderStatus}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="210">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="showMemberDetail(scope.row)">详情</el-button>
                        <el-button type="primary" size="mini" @click="editMember(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deleteMember(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!--分页组件-->
        <pagination :total="orderList.length" :page="pagination.page" :rows="pagination.rows"></pagination>
        <!--查看会员详情信息-->
        <el-dialog class="member-detail" title="会员详情" :visible.sync="dialogDetailVisible">
            <el-row :gutter="10">
                <el-col :span="10">
                    <img src="../../assets/demo_images/000247589.jpg" alt="">
                </el-col>
                <el-col :span="14">
                    <el-col :span="11">
                        <label for="">姓名：</label>
                        <span>{{memberMessage.name}}</span>
                    </el-col>
                    <el-col :span="11">
                        <label for="">性别：</label>
                        <span>{{memberMessage.gender}}</span>
                    </el-col>
                </el-col>
                <el-col :span="14">
                    <el-col>
                        <label for="">电话：</label>
                        <span>{{memberMessage.phone}}</span>
                    </el-col>
                    <el-col>
                        <label for="">地址：</label>
                        <span>{{memberMessage.address}}</span>
                    </el-col>
                    <el-col>
                        <label for="">注册时间：</label>
                        <span>{{memberMessage.orderTime}}</span>
                    </el-col>
                    <el-col>
                        <label for="">备注：</label>
                        <span>{{memberMessage.remarks}}</span>
                    </el-col>
                </el-col>
            </el-row>
        </el-dialog>
        <!--编辑会员信息对话框-->
        <el-dialog class="member-editor" title="编辑会员" :visible.sync="dialogFormVisible">
            <el-form :model="memberMessage" size="mini">
                <el-form-item label="姓名" label-width="120px">
                    <el-input v-model="memberMessage.name" auto-complete="off" placeholder="请填写姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="120px">
                    <el-input v-model="memberMessage.gender" auto-complete="off" placeholder="请填写性别"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="120px">
                    <el-input v-model="memberMessage.phone" auto-complete="off" placeholder="请填写电话"></el-input>
                </el-form-item>
                <el-form-item label="会员等级" label-width="120px">
                    <el-select v-model="memberMessage.orderStatus" placeholder="请选择会员等级">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" label-width="120px">
                    <el-input type="textarea" v-model="memberMessage.address" auto-complete="off" placeholder="请填写地址"></el-input>
                </el-form-item>
                <el-form-item label="备注" label-width="120px">
                    <el-input type="textarea" v-model="memberMessage.remarks" auto-complete="off" placeholder="请填写备注"></el-input>
                </el-form-item>
                <el-form-item label="头像" placeholder="请填写地址" label-width="120px">
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
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '钻石会员',
        gender: '男',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '黄金会员',
        gender: '男',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '白银会员',
        gender: '女',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '白银会员',
        gender: '男',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '黄金会员',
        gender: '女',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '黄金会员',
        gender: '女',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '钻石会员',
        gender: '男',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '白银会员',
        gender: '女',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '钻石会员',
        gender: '男',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '白银会员',
        gender: '女',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '钻石会员',
        gender: '男',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '钻石会员',
        gender: '女',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }, {
        orderNumber: 1234567890,
        name: '小明',
        phone: 13453245678,
        address: '长沙市天心区',
        orderTime: '2018-3-29 00:00:01',
        orderStatus: '钻石会员',
        gender: '男',
        remarks: '我是一名信誉良好的会员',
        imageUrl: ''
      }], // 订单统计列表
      orderNumber: '', // 订单号
      datetime: [], // 日期时间
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
      memberMessage: {}, // 会员详情信息
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
      this.$confirm('确定删除该会员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(err => console.log(err))
    }
  }
}
</script>
