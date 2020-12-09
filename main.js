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
import Form from './components/Form/Form.vue'
import FormItem from './components/Form/FormItem.vue'
Vue.component('d-form',Form)
Vue.component('d-form-item',FormItem)

// 设置全局的数据和全局的方法
import store from './store/index.js'

import commom from 'common/index.js'
Vue.prototype.$common = commom

// #ifndef MP-WEIXIN
// 调试
import VConsole from 'vconsole'
// if (process.env.NODE_ENV === 'development') {
const vConsole = new VConsole()
// }
// #endif

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
