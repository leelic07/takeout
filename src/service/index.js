import user from './modules/user'
import shop from './modules/shop'
import order from './modules/order'
import goods from './modules/goods'
import activity from './modules/activity'
import upload from './modules/upload'
import member from './modules/member'
import customer from './modules/customer'
import data from './modules/data'
import finance from './modules/finance'
import system from './modules/system'

export default {
  ...user,
  ...shop,
  ...order,
  ...goods,
  ...activity,
  ...upload,
  ...member,
  ...customer,
  ...data,
  ...finance,
  ...system
}
