import user from './modules/user'
import shop from './modules/shop'
import order from './modules/order'

export default {
  ...user,
  ...shop,
  ...order
}
