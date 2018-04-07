import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Circles from '@/components/Circles'
import List from '@/components/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/circles',
      name: 'Circles',
      component: Circles
    },{
      path: '/lists/:listId',
      name: 'List',
      component: List,
      props: true
    }
  ]
})
