import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/ListApp.vue'
import listAppDrag from './views/listDrag.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: listAppDrag
    }
  ]
})