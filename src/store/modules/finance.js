import http from '@/service'
import { parseTime } from '@/utils/index'

export default {
  state: {
    financeList: [],
    financeTotal: 0
  },
  actions: {
    getFinanceList({ commit }, pagination) {
      let startTime = ''
      let endTime = ''
      if (pagination.datetime) {
        startTime = parseTime(pagination.datetime[0])
        endTime = parseTime(pagination.datetime[1])
      }
      http.getFinanceList({ ...pagination, startTime, endTime }).then(res => res.code === 200 && commit('getFinanceList', res)).catch(err => console.log(err))
    },
    exportExcel({ commit }, datetime) {
      let startTime = ''
      let endTime = ''
      if (datetime) {
        startTime = parseTime(datetime[0])
        endTime = parseTime(datetime[1])
      }
      http.exportExcel({ startTime, endTime }).then(res => res.code === 200 && commit('exportExcel', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getFinanceList(state, financeListResult) {
      state.financeList = financeListResult.data.report
      state.financeTotal = financeListResult.data.totalCount
    },
    exportExcel(state, exportExcelResult) {
      console.log(exportExcelResult)
    }
  }
}
