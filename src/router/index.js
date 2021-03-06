import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Circles from '@/components/Circles'
import List from '@/components/List'
import EditList from '@/components/EditList'
import Story from '@/components/Story'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      props: true
    },{
      path: '/circles',
      name: 'Circles',
      component: Circles
    },{
      path: '/lists/:listId',
      name: 'List',
      component: List,
      props: true
    },{
      path: '/lists/:listId/edit',
      name: 'EditList',
      component: EditList,
      props: true
    },{
      path: '/stories/:storyId',
      name: 'Story',
      component: Story,
      props: true
    }
  ]
})
