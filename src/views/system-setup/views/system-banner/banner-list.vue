<template>
  <el-row class="goods-management-container">
    <!--搜索框-->
    <el-row>
      <el-col :span="3" :offset="21">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="addBanner">添加轮播图</el-button>
      </el-col>
    </el-row>
    <!--轮播图信息列表-->
    <el-row class="order-statics">
      <el-table :data="advertisements" stripe border fit style="width: 100%">
        <el-table-column type="index" :index="1" label="序号"></el-table-column>
        <el-table-column prop="name" label="活动名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="props">
            <img :src="props.row.imageUrl" alt="" style="width:50%">
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="上传时间" show-overflow-tooltip>
          <template slot-scope="props">
            {{props.row.createdAt | Date}}
          </template>
        </el-table-column>
        <el-table-column prop="url" label="跳转url"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="showBannerEdit(props.row.id)" v-if="type === '1'">编辑</el-button>
            <el-button type="danger" size="mini" @click="withdrawBannerConfirm(props.row.id)" v-if="props.row.status === 1">下架</el-button>
            <el-button type="success" size="mini" @click="groundBannerConfirm(props.row.id)" v-else>上架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <pagination :total="advertisementsTotal" :page="pagination.page" :rows="pagination.rows" :currentChange="currentChange"></pagination>
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
        rows: 10
      },
      value: '', // 选择会员等级
      dialogDetailVisible: false,
      dialogFormVisible: false,
      dialogWithdrawVisible: false,
      dialogGroundVisible: false,
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
      fileList: [], // 图片上传的数组
      imageUrl: '', // 上传头像的图片路径
      merchantIds: [], // 选中的商铺id的集合
      itemId: '', // 需要下架或者上架的商品id
      checkAll: false,
      isIndeterminate: true,
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  watch: {
    withdrawBannerResult() {
      this.getAdvertisements(this.pagination)
    }
  },
  computed: {
    ...mapGetters([
      'advertisements',
      'advertisementsTotal',
      'withdrawBannerResult'
    ]),
    type() {
      return sessionStorage.getItem('type')
    },
    merchantId() {
      return sessionStorage.getItem('merchantId')
    }
  },
  components: {
    Pagination
  },
  methods: {
    ...mapActions({
      withdrawBanner: 'withdrawBanner',
      getAdvertisements: 'getAdvertisements'
    }),
    // 点击编辑执行的方法
    showBannerEdit(id) {
      this.$router.push({
        path: `/system/edit-banner/${id}`
      })
    },
    // 点击下架执行的方法
    withdrawBannerConfirm(id) {
      this.$confirm('确定下架该广告?', '提示', {
        type: 'warning'
      }).then(() => {
        this.withdrawBanner({
          id,
          status: 0
        })
      }).catch(err => console.log(err))
    },
    // 点击上架执行的方法
    groundBannerConfirm(id) {
      this.$confirm('确定上架该广告?', '提示', {
        type: 'warning'
      }).then(() => {
        this.withdrawBanner({
          id,
          status: 1
        })
      }).catch(err => console.log(err))
    },
    currentChange(page) {
      this.getAdvertisements(Object.assign(this.pagination, { page }))
    },
    addBanner() {
      this.$router.push({
        path: '/system/add-banner'
      })
    }
  },
  mounted() {
    this.getAdvertisements(this.pagination)
  }
}
</script>