import Vue from 'vue'
import App from './App'

// #ifdef H5
import jwx from '@/common/jwx'
Vue.prototype.$jwx = jwx
// #endif

Vue.config.productionTip = false

import MessageBox from 'components/messageBox/index.js'
Vue.use(MessageBox)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
