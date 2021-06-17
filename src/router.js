import Vue from 'vue'
import VueRouter from 'vue-router'
import { fetchRoutes } from './libs/drupalClient'

Vue.use(VueRouter)

export function router() {
  return fetchRoutes().then(data => {
    console.log(data)

    var fetchedRoutes = data.routes
    fetchedRoutes.forEach(f => {
      f.component = () => import(/* webpackChunkName: "drupal-custom-component" */ './views/' + f.name + '.vue')
    })

    //route default per pagine/routes non esistenti 404
    fetchedRoutes.push({
      path: '*',
      name: 'default',
      component: () => import('./views/Default.vue')
    })

    return new VueRouter({
      scrollBehavior() {
        return { x: 0, y: 0 };
      },
      mode: 'history',
      base: process.env.BASE_URL,
      routes: fetchedRoutes
    })
  })
}
