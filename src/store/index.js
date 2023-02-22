import { createStore } from 'vuex'
import list from './modules/list'

export default createStore({
  modules: {
    list,
  }
})
