<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="14" :offset="5">
      <el-col :span="20">
        <el-card>
          <!-- <el-col v-for="(level, index) in levelList" :key="index"> -->
          <el-form :model="levelForm" :rules="rule" ref="levelForm" size="large">
            <el-form-item label="会员等级名称" label-width="120px" prop="name">
              <el-input v-model="levelForm.name" auto-complete="off" placeholder="请填写会员等级名称"></el-input>
              <div class="property-button decede-properties decede-standard" @click="decedeLevel(index)" v-if="levelList.length > 1">-</div>
            </el-form-item>
            <el-form-item label="起始积分" label-width="120px" prop="startScore">
              <el-input v-model="levelForm.startScore" placeholder="请填写最低积分">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <el-form-item label="升级积分" label-width="120px" prop="endScore">
              <el-input v-model="levelForm.endScore" placeholder="请填写升级积分">
                <template slot="append">分</template>
              </el-input>
            </el-form-item>
            <el-row class="split-line"></el-row>
            <!-- <el-form-item label="" v-if="index === levelList.length - 1"> -->
            <el-form-item label="">
              <el-button type="primary" size="medium" @click="saveLevelConfirm">保存</el-button>
              <!-- <el-button type="success" size="medium" @click="addLevel">新增</el-button> -->
            </el-form-item>
          </el-form>
          <!-- </el-col> -->
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      levelList: [{
        name: '',
        startScore: '',
        endScore: ''
      }],
      levelForm: {
        name: '',
        startScore: '',
        endScore: ''
      },
      fileList2: [],
      rule: {
        name: [{ required: true, message: '会员等级名称不能为空', trigger: 'blur' }],
        startScore: [
          { required: true, message: '起始不能为空', trigger: 'blur' },
          { pattern: '^\\d+(\\.\\d+)?$', message: '请输入有效数字', trigger: 'blur' }
        ],
        endScore: [
          { required: true, message: '升级积分不能为空', trigger: 'blur' },
          { pattern: '^\\d+(\\.\\d+)?$', message: '请输入有效数字', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    userRanksResult() {
      this.levelForm = {
        name: '',
        startScore: '',
        endScore: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userRanksResult'
    ])
  },
  methods: {
    ...mapActions({
      saveUserRanks: 'saveUserRanks'
    }),
    decedeLevel(index) {
      this.levelList.splice(index, 1)
    },
    // 点击新增执行的方法
    addLevel() {
      this.levelList.push({
        name: '',
        startScore: '',
        endScore: ''
      })
    },
    saveLevelConfirm() {
      this.$refs.levelForm.validate(valid => {
        if (valid) this.saveUserRanks(this.levelForm)
        else console.log('save levelForm err')
      })
    }
  }
}
</script>
