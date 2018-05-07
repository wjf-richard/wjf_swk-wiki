// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router' // 开发模式
// import router from './router/back' // 打包后台
// import router from './router/front' // 打包前台

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入富文本工具
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 引入参考项的富文本
import quillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(BootstrapVue)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(quillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
