import Vue from 'vue'
import App from './App'

<<<<<<< HEAD
Vue.config.productionTip = false;

// 处理新版本uni-ui 部分组件找不到的问题
Vue.config.ignoredElements = ['wx-open-launch-weapp', /^uni-/];
=======
import './index.scss'

Vue.config.productionTip = false
>>>>>>> 80839775cbf0a8b88fd56aa9c49723cb3a05f792

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
