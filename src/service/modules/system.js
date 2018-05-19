import { post, get } from '../base/service'

export default {
  saveUserRanks: rank => post('/user_ranks/save', rank).then(res => res).catch(err => err),
  updateDeliveryTime: time => get('/merchants/updateDeliveryTime', time).then(res => res).catch(err => err),
  getAdvertisements: ad => get('/advertisements/page', ad).then(res => res).catch(err => err),
  withdrawBanner: banner => post('/advertisements/updateIsPuton', banner).then(res => res).catch(err => err),
  saveAdvertisement: ad => post('/advertisements/save', ad).then(res => res).catch(err => err),
  updateBanner: ad => post('/advertisements/update', ad).then(res => res).catch(err => err),
  editBanner: id => get('/advertisements/edit', id).then(res => res).catch(err => err),
  getUserRanks: () => get('/user_ranks/list').then(res => res).catch(err => err),
  updateUserRanks: rank => post('/user_ranks/batchUpdate', rank).then(res => res).catch(err => err)
}

