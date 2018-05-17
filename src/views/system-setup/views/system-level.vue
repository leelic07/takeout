<template>
  <el-row class="goods-upload-container">
    <el-col class="goods-upload-box" :span="15" :offset="5">
      <el-col :span="20">
        <el-card>
          <el-col v-for="(level, index) in levelList" :key="index">
            <el-tag>{{index}}级：{{level.name}}</el-tag>
            <el-form :model="levelForm" :rules="rule" ref="levelForm" size="large">
              <el-form-item label="会员等级名称" label-width="120px" prop="name">
                <el-input v-model="level.name" auto-complete="off" placeholder="请填写会员等级名称"></el-input>
                <!-- <div class="property-button decede-properties decede-standard" @click="decedeLevel(index)" v-if="levelList.length > 1">-</div> -->
              </el-form-item>
              <el-form-item label="起始积分" label-width="120px" prop="startScore">
                <el-input v-model="level.startScore" placeholder="请填写最低积分">
                  <template slot="append">分</template>
                </el-input>
              </el-form-item>
              <el-form-item label="升级积分" label-width="120px" prop="endScore">
                <el-input v-model="level.endScore" placeholder="请填写升级积分">
                  <template slot="append">分</template>
                </el-input>
              </el-form-item>
              <el-row class="split-line"></el-row>
              <el-form-item label="" v-if="index === levelList.length - 1">
                <el-button type="primary" size="medium" @click="saveLevelConfirm">保存</el-button>
                <!-- <el-button type="success" size="medium" @click="addLevel">新增</el-button> -->
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
      levelList: [{
        id: 1,
        name: '青铜会员',
        startScore: 0,
        endScore: 1000
      }, {
        id: 2,
        name: '白银会员',
        startScore: 1000,
        endScore: 2000
      }, {
        id: 3,
        name: '黄金会员',
        startScore: 2000,
        endScore: 3000
      }, {
        id: 4,
        name: '钻石会员',
        startScore: 3000,
        endScore: '无上限'
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
