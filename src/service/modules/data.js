import * as service from '../base/service'

export default {
  getBusinessList: pagination => service.get('/data_report/businessPage', pagination).then(res => res).catch(err => err),
  getAccessList: pagination => service.get('/data_report/accessPage', pagination).then(res => res).catch(err => err),
  getSalesList: pagination => service.get('/data_report/salesPage', pagination).then(res => res).catch(err => err)
}
