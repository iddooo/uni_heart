import Vue from 'vue'
import App from './App'

// #ifdef H5
import jwx from '@/common/jwx'
Vue.prototype.$jwx = jwx
// #endif

Vue.config.productionTip = false

// 全局组件
// import MessageBox from 'components/messageBox/index.js'
// Vue.use(MessageBox)
import MessageBox from './components/MessageBox.vue'
Vue.component('MessageBox',MessageBox)

// 设置全局的数据和全局的方法
import store from './store/index.js'

import commom from 'common/index.js'
Vue.prototype.$common = commom

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
