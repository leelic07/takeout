<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="15" :offset="5">
      <el-col :span="20">
        <el-card>
          <el-col v-for="(level, index) in userRanks" :key="index" class="level-box">
            <el-tag>{{index + 1}}级</el-tag>
            <el-form :model="level" :rules="rule" ref="levelForm" size="large">
              <el-form-item label="会员等级名称" label-width="120px">
                <el-input v-model="level.name" auto-complete="off" placeholder="请填写会员等级名称"></el-input>
              </el-form-item>
              <el-form-item label="起始积分" label-width="120px">
                <el-input v-model="level.startScore" placeholder="请填写最低积分">
                  <template slot="append">分</template>
                </el-input>
              </el-form-item>
              <el-form-item label="升级积分" label-width="120px">
                <el-input v-model="level.endScore" placeholder="请填写升级积分">
                  <template slot="append">分</template>
                </el-input>
              </el-form-item>
              <el-row class="split-line"></el-row>
              <el-form-item label="" v-if="index === userRanks.length - 1">
                <el-button type="primary" size="medium" @click="updateLevelConfirm">更新</el-button>
              </el-form-item>
            </el-form>
          </el-col>
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
    },
    updateRanksResult() {
      this.getUserRanks()
    }
  },
  computed: {
    ...mapGetters([
      'userRanksResult',
      'userRanks',
      'updateRanksResult'
    ])
  },
  methods: {
    ...mapActions({
      getUserRanks: 'getUserRanks',
      saveUserRanks: 'saveUserRanks',
      updateUserRanks: 'updateUserRanks'
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
    updateLevelConfirm() {
      // this.$refs.levelForm.validate(valid => {
      //   if (valid) this.saveUserRanks(this.levelForm)
      //   else console.log('save levelForm err')
      // })
      this.updateUserRanks(this.userRanks)
    }
  },
  mounted() {
    this.getUserRanks()
  }
}
</script>
