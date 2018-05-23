<template>
    <el-col :span="24" id="pagination">
        <!--分页组件-->
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="rows" :current-page="page" prev-text="上一页" next-text="下一页" @size-change="sizeChange" @current-change="currentChange">
        </el-pagination>
    </el-col>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    rows: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {}
  },
  methods: {
    // 每页条数发生变化时执行的方法
    sizeChange(rows) {
      this.$emit('sizeChange', rows)
    },
    // 当前页发生变化时执行的方法
    currentChange(page) {
      this.$emit('currentChange', page)
    }
  }
}
</script>