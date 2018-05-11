<template>
    <el-row class="member-management-container">
        <!--搜索框-->
        <el-row>
            <el-col :span="5">
                <el-input placeholder="请输入手机号码" v-model="pagination.phone"></el-input>
            </el-col>
            <el-col :span="5" class="member-select">
                <el-input placeholder="请输入微信昵称" v-model="pagination.name"></el-input>
            </el-col>
            <el-button type="primary" icon="el-icon-search" @click="getUsersPage(pagination)">搜索</el-button>
        </el-row>
        <!--会员信息列表-->
        <el-row class="order-statics">
            <el-table :data="userList" stripe border style="width: 100%">
                <el-table-column prop="userNo" label="会员编号"></el-table-column>
                <el-table-column prop="userName" label="微信昵称"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="props">
                        {{ props.row.userSex | gender}}
                    </template>
                </el-table-column>
                <el-table-column prop="birthday" label="生日"></el-table-column>
                <el-table-column prop="userPhone" label="手机号码"></el-table-column>
                <el-table-column label="地址">
                    <template slot-scope="props">
                        <el-popover placement="bottom" title="地址" width="200" trigger="click" :content="props.row.address">
                            <el-button slot="reference" type="text">查看</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="userScore" label="积分"></el-table-column>
                <el-table-column label="注册时间">
                    <template slot-scope="props">
                        {{props.row.createdAt | Date}}
                    </template>
                </el-table-column>
                <el-table-column label="会员类型">
                    <template slot-scope="props">
                        <el-tag :closable="false" :type="props.row.gradeType">{{props.row.grade | grade}}</el-tag>
                        <!-- <el-tag v-else-if="scope.row.orderStatus === '黄金会员'" type="warning" :closable="false">{{scope.row.orderStatus}}</el-tag>
                        <el-tag v-else-if="scope.row.orderStatus === '白银会员'" type="info" :closable="false">{{scope.row.orderStatus}}</el-tag> -->
                    </template>
                </el-table-column>
                <el-table-column label="订单数">
                    <template slot-scope="props">
                        <el-button type="text" @click="showOrdersByUserId(props.row.id)">{{props.row.orderCount}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="totalPrice" label="消费额"></el-table-column>
                <el-table-column label="操作" width="140">
                    <template slot-scope="props">
                        <el-button type="success" size="mini" @click="showMemberEdit(props.row.id)">查看</el-button>
                        <el-button type="primary" size="mini" @click="sendCoupon(props.row.id)">送券</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!--分页组件-->
        <pagination :total="userTotal" :page="pagination.page" :rows="pagination.rows"></pagination>
        <!--查看会员详情信息-->
        <el-dialog class="member-detail" title="会员详情" :visible.sync="dialogDetailVisible">
            <el-row :gutter="10">
                <el-col :span="10">
                    <img src="../../../assets/demo_images/000247589.jpg" alt="">
                </el-col>
                <el-col :span="14">
                    <el-col :span="11">
                        <label for="">姓名：</label>
                        <span>{{userForEdit.loginName}}</span>
                    </el-col>
                    <el-col :span="11">
                        <label for="">性别：</label>
                        <span>{{userForEdit.userSex | gender}}</span>
                    </el-col>
                </el-col>
                <el-col :span="14">
                    <el-col>
                        <label for="">电话：</label>
                        <span>{{userForEdit.userPhone}}</span>
                    </el-col>
                    <el-col>
                        <label for="">地址：</label>
                        <span>{{userForEdit.userAddress}}</span>
                    </el-col>
                    <el-col>
                        <label for="">注册时间：</label>
                        <span>{{userForEdit.createdAt | Date}}</span>
                    </el-col>
                    <el-col>
                        <label for="">备注：</label>
                        <span>{{userForEdit.remark}}</span>
                    </el-col>
                </el-col>
            </el-row>
        </el-dialog>
        <!--会员送券对话框-->
        <el-dialog class="member-editor" title="会员送券" :visible.sync="dialogFormVisible">
            <el-form :model="userForEdit" size="mini" :rules="rule" ref="couponFrom">
                <el-form-item label="选择优惠券" label-width="120px" prop="couponId">
                    <el-select v-model="userForEdit.couponId" placeholder="请选择会优惠券">
                        <el-option v-for="item in backCouponList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="sendCouponConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      orderNumber: '', // 订单号
      datetime: [], // 日期时间
      pagination: {// 分页信息
        page: 1,
        rows: 10,
        phone: '',
        name: ''
      },
      dialogDetailVisible: false,
      dialogFormVisible: false,
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
      rule: {
        couponId: [{ required: true, message: '请选择优惠券', trigger: 'blur' }]
      },
      imageUrl: '' // 上传头像的图片路径
    }
  },
  watch: {
    sendCouponResult() {
      this.dialogFormVisible = false
    }
  },
  computed: {
    ...mapGetters([
      'userList',
      'userTotal',
      'userForEdit',
      'backCouponList',
      'sendCouponResult'
    ])
  },
  components: {
    Pagination
  },
  methods: {
    ...mapActions({
      getUsersPage: 'getUsersPage',
      editUser: 'editUser',
      getBackCouponList: 'getBackCouponList',
      sendCouponToUser: 'sendCouponToUser'
    }),
    // 点击详情执行的方法
    showMemberEdit(id) {
      this.dialogDetailVisible = true
      this.editUser(id)
    },
    // 点击送券执行的方法
    sendCoupon(id) {
      this.dialogFormVisible = true
      this.editUser(id)
      this.getBackCouponList()
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
    },
    showOrdersByUserId(id) {
      this.$router.push({
        path: `/order/records/${id}`
      })
    },
    sendCouponConfirm() {
      this.$refs.couponFrom.validate(valid => {
        if (valid) this.sendCouponToUser(this.userForEdit)
        else console.log('sendCoupon err')
      })
    }
  },
  mounted() {
    this.getUsersPage(this.pagination)
  }
}
</script>
