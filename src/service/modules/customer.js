import * as service from '../base/service'

export default {
  getFeedbacksList: userId => service.get('/feedbacks/list', userId).then(res => res).catch(err => err),
  getFeedbacksPage: pagination => service.get('/feedbacks/page', pagination).then(res => res).catch(err => err)
}
