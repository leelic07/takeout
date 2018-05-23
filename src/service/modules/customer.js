import { get, post } from '../base/service'

export default {
  getFeedbacksList: userId => get('/feedbacks/list', userId).then(res => res).catch(err => err),
  getFeedbacksPage: pagination => get('/feedbacks/page', pagination).then(res => res).catch(err => err),
  replyFeedbacks: reply => post('/feedbacks/save', reply).then(res => res).catch(err => err)
}
