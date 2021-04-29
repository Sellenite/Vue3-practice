import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: debug, // 深度检测所有state的数据是否是在mutation里进行修改，否则报错，会有一定的性能损耗，所以在开发环境下验证即可
  plugins: debug ? [createLogger()] : []
})
