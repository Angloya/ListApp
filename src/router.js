import Vue from 'vue'
import Router from 'vue-router'
import listApp from './views/ListApp.vue'
import listDragColumn from './views/listDrag.vue'
import authUser from './views/authUser.vue'
import Profile from './views/profile.vue'
const Signup = () => import('@/components/user/Signup')
const Signin = () => import('@/components/user/Signin')

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
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/authUser',
      name: 'authUser',
      component: authUser
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
