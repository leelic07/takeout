<template>
  <el-select v-if="type === '1'" v-model="pagination.merchantId" placeholder="请选择店铺" @change="merchantChange">
    <el-option value="" label="全部店铺"></el-option>
    <el-option v-for="(merchant,index) in merchantList" :key="index" :value="merchant.id" :label="merchant.name"></el-option>
  </el-select>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    pagination: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'merchantList'
    ]),
    type() {
      return sessionStorage['type']
    }
  },
  methods: {
    ...mapActions([
      'getMerchantsList'
    ]),
    merchantChange(merchantId) {
      this.$emit('merchantChange', merchantId)
    }
  },
  mounted() {
    this.merchantList.length === 0 && this.getMerchantsList()
  }
}
</script>
