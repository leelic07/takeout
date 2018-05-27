<template>
    <el-select v-if="type === '1'" v-model="pagination.merchantId" placeholder="请选择店铺" @change="merchantChange">
        <el-option value="" label="全部店铺"></el-option>
        <el-option v-for="(merchant,index) in merchantList" :key="index" :value="merchant.id" :label="merchant.name"></el-option>
    </el-select>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    merchantId
  }
}
</script>
