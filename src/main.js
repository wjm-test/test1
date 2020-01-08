import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import BaiduMap from 'vue-baidu-map'
import { BmlMarkerClusterer } from 'vue-baidu-map'
Vue.component('bml-marker-cluster', BmlMarkerClusterer)
import Meta from 'vue-meta'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import '@/assets/iconfont/iconfont.css'
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters
// import Echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import Axios from 'axios'
import htmlToPdf from '@/utils/htmlToPdf'
Vue.use(htmlToPdf)
Vue.use(Antd)

import VueBus from 'vue-bus';
Vue.use(VueBus);

/**
     * If you don't want to use mock-server
     * you want to use MockJs for mock api
     * you can execute: mockXHR()
     *
     * Currently MockJs will be used in the production environment,
     * please remove it before going online! ! !
     */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'A460a5a1dd4afbdfa0ba1f51f6069dd2'
})

// Vue.prototype.$echarts = Echarts

Vue.prototype.$http = Axios

Vue.use(Meta)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
