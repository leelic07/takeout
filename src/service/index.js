import user from './modules/user'
import shop from './modules/shop'
import order from './modules/order'
import goods from './modules/goods'
import activity from './modules/activity'

export default {
  ...user,
  ...shop,
  ...order,
  ...goods,
  ...activity
}
