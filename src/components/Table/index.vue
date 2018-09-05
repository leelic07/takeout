<template>
  <el-table :data="data"
    stripe
    border
    fit
    @selection-change="handleSelectionChange">
    <el-row v-for="(col, index) in columns"
      :key="index">
      <el-table-column v-if="!col.slot"
        :type="col.type"
        :index="col.index"
        :label="col.label"
        :width="col.width"
        :prop="col.prop"
        show-overflow-tooltip/>
      <el-table-column v-else
        :type="col.type"
        :label="col.label"
        :width="col.width"
        show-overflow-tooltip>
        <template slot-scope="{row}">
          <slot :name="col.slot"
            :row="row"
            :index="index"
            :text="col.prop ? row[col.prop] : ''">
          </slot>
        </template>
      </el-table-column>
    </el-row>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    columns: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSelectionChange(...args) {
      this.$emit('selection-change', args)
    }
  }
}
</script>
