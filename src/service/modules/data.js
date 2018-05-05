import * as service from '../base/service'

export default {
  getBusinessList: pagination => service.get('/data_report/businessPage', pagination).then(res => res).catch(err => err)
}
