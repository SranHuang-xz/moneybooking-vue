import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Money from '../views/Money.vue'
import Labels from '../views/Labels.vue'
import Statistics from '../views/Statistics.vue'
import NotFound from '../views/NotFound.vue'
import EditLabel from '../views/EditLabel.vue'
import AddLabel from '../views/AddLabel.vue'
import Report from '../views/Report.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    name: 'Money',
    component: Money
  },
  {
    path: '/labels',
    name: 'Labels',
    component: Labels
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/labels/edit/:id',
    name: 'editLabel',
    component: EditLabel
  },
  {
    path: '/labels/add',
    name: 'addLabels',
    component: AddLabel
  },
  {
    path: '/report',
    name: 'report',
    component: Report
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
