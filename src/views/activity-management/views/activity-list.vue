<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="请输入活动名称" v-model="pagination.name"></el-input>
      </el-col>
      <!-- <el-col :span="5" class="member-select">
        <el-select v-model="activityType" placeholder="请选择活动类型">
          <el-option v-for="(activity,index) in activityTypeList" :value="activity.id" :label="activity.name" :key="index"></el-option>
        </el-select>
      </el-col> -->
      <el-button type="primary" icon="el-icon-search" @click="searchActivity">搜索</el-button>
    </el-row>
    <!--满减活动列表-->
    <el-row class="order-statics">
      <el-table :data="activityList" stripe border fit style="width: 100%">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column prop="code" label="活动编号"></el-table-column>
        <el-table-column prop="name" label="活动名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="开始日期" show-overflow-tooltip>
          <template slot-scope="props">
            {{props.row.startDate | Date}}
          </template>
        </el-table-column>
        <el-table-column label="活动结束日期" show-overflow-tooltip>
          <template slot-scope="props">
            {{props.row.endDate | Date}}
          </template>
        </el-table-column>
        <el-table-column prop="participant" label="活动参与人数"></el-table-column>
        <el-table-column prop="activityCount" label="活动核销数"></el-table-column>
        <el-table-column prop="activityMoney" label="活动核销金额"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="showEditActivity(props.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteActivityConfirm(props.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="activityTotal" :page="pagination.page" :rows="pagination.rows" @currentPage="currentPage"></pagination>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      datetime: [], // 日期时间
      pagination: {// 分页信息
        page: 1,
        rows: 10,
        name: ''
      },
      dialogDetailVisible: false,
      activityTypeList: [{
        id: 1,
        name: '满减活动'
      }, {
        id: 2,
        name: '优惠券'
      }]
    }
  },
  watch: {
    activityList() {
    },
    deleteActivityResult() {
      this.getActivityList(this.pagination)
    }
  },
  computed: {
    ...mapGetters([
      'activityList',
      'activityTotal',
      'activityForEdit',
      'deleteActivityResult'
    ])
  },
  components: {
    Pagination
  },
  methods: {
    ...mapActions({
      getActivityList: 'getActivityList',
      editActivity: 'editActivity',
      updateActivity: 'updateActivity',
      deleteActivity: 'deleteActivity'
    }),
    // 点击详情执行的方法
    showMemberDetail(row) {
      this.dialogDetailVisible = true
      this.activityForEdit = row
    },
    // 点击删除执行的方法
    deleteActivityConfirm(id) {
      this.$confirm('确定删除商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteActivity(id)
      }).catch(err => console.log(err))
    },
    showEditActivity(id) {
      this.$router.push({
        path: `/activity/edit/${id}`
      })
    },
    searchActivity() {
      this.getActivityList(this.pagination)
    },
    currentPage(page) {
      this.getActivityList(Object.assign(this.pagination, { page }))
    }
  },
  mounted() {
    this.getActivityList(this.pagination)
  }
}
</script>
