import { post, get } from '../base/service'

export default {
  saveUserRanks: rank => post('/user_ranks/save', rank).then(res => res).catch(err => err),
  updateDeliveryTime: time => get('/merchants/updateDeliveryTime', time).then(res => res).catch(err => err)
}

