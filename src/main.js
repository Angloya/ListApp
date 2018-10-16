import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fb from './firebase/config'
import store from './store'

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      created () {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
          this.$store.dispatch('fetchUserData', user)
        }
      },
      render: h => h(App)
    })
  }
})

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
