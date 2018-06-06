import date from './modules/date'
import gender from './modules/gender'
import grade from './modules/grade'
import coupon from './modules/coupon'
import goods from './modules/goods'
import order from './modules/order'
import merchant from './modules/merchant'

export default {
  ...date,
  ...gender,
  ...grade,
  ...coupon,
  ...goods,
  ...order,
  ...merchant
}
