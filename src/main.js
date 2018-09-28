import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.directive('rainbow', {
  bind (el, binding, vnode) {
    el.style.backgroundColor = 'rgba(' + (Math.random() * 256) + ', ' + (Math.random() * 256) + ', ' + (Math.random() * 256) + ', 0.3)'
  }
})

Vue.directive('border', {
  bind (el, binding, vnode) {
    el.style.borderRadius = (Math.random() * 20) + 'px ' + (Math.random() * 20) + 'px ' + (Math.random() * 20) + 'px ' + (Math.random() * 20) + 'px/' + (Math.random() * 20) + 'px ' + (Math.random() * 20) + 'px ' + (Math.random() * 10) + 'px ' + (Math.random() * 20) + 'px'
  }
})
Vue.directive('focus', {
  // Когда привязанный элемент вставлен в DOM...
  inserted (el) {
    // Переключаем фокус на элемент
    el.focus()
  }
})
