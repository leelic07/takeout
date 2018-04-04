<template>
    <el-row class="activity-add-container">
        <el-col :span="14" :offset="5">
            <!--选择满减还是优惠券-->
            <el-card>
                <el-form :model="typeForm">
                    <el-form-item label="活动类型">
                        <el-radio-group v-model="typeForm.type">
                            <el-radio label="1">满减活动</el-radio>
                            <el-radio label="2">优惠券</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-card>
            <!--活动内容-->
            <el-card>
                <el-form v-if="typeForm.type === '1'" :label-position="labelPosition" :model="eventForm" ref="eventForm" :rules="eventRules" label-width="80px">
                    <el-form-item label="活动名称">
                        <el-input v-model="eventForm.name" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="满">
                        <el-input v-model="eventForm.enough" placeholder="请输入满的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="减">
                        <el-input v-model="eventForm.decede" placeholder="请输入减的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="活动开始时间" label-width="100px">
                        <el-date-picker v-model="eventForm.startTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束时间" label-width="100px">
                        <el-date-picker v-model="eventForm.endTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动参与店铺" label-width="100px">
                        <el-checkbox-group v-model="eventForm.checkList">
                            <el-checkbox label="店铺A"></el-checkbox>
                            <el-checkbox label="店铺B"></el-checkbox>
                            <el-checkbox label="店铺C"></el-checkbox>
                            <el-checkbox label="店铺D" disabled></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium">发布活动</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-else :label-position="labelPosition" :model="discountForm" ref="discountForm" :rules="discountRules" label-width="80px">
                    <el-form-item label="优惠券名称" label-width="82px">
                        <el-input v-model="discountForm.name" placeholder="请输入活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="活动开始时间" label-width="100px">
                        <el-date-picker v-model="discountForm.startTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="有效期">
                        <el-input v-model="discountForm.validation" placeholder="请输入满的金额(单位:天)"></el-input>
                    </el-form-item>
                    <el-form-item label="活动参与店铺" label-width="100px">
                        <el-checkbox-group v-model="discountForm.checkList">
                            <el-checkbox label="店铺A"></el-checkbox>
                            <el-checkbox label="店铺B"></el-checkbox>
                            <el-checkbox label="店铺C"></el-checkbox>
                            <el-checkbox label="店铺D" disabled></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="满多少可用" label-width="82px">
                        <el-input v-model="discountForm.enough" placeholder="请输入满的金额(单位:元)"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="discountForm.description" placeholder="请输入描述"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium">发布活动</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
      data() {
        return {
          typeForm: {
            type: '1'
          },
          discountForm: {
            checkList: []
          },
          eventForm: {
            checkList: []
          },
          labelPosition: 'left',
          eventRules: {},
          discountRules: {}
        }
      }
    }
</script>