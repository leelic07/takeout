import * as service from '../base/service'

export default {
  getFinanceList: pagination => service.get('/report/page', pagination).then(res => res).catch(err => err),
  exportExcel: datetime => service.get('/report/export', datetime).then(res => res).catch(err => err)
}
