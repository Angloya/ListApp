import Vue from 'vue'
import Router from 'vue-router'
import listApp from './views/ListApp.vue'
import listDragColumn from './views/listDragColumn.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'listDragColumn',
      component: listDragColumn
    },
    {
      path: '/list',
      name: 'list',
      component: listApp
    }
  ]
})
