import '../css/index.less'
import Vue from 'vue'
import router from './router'
import App from './app'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
