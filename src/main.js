import Vue from 'vue'
import App from './App'
import './index.scss'

Vue.config.productionTip = false;

// 处理新版本uni-ui 部分组件找不到的问题
Vue.config.ignoredElements = ['wx-open-launch-weapp', /^uni-/];

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
