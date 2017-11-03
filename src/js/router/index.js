import Vue from 'vue'
import VueRouter from 'vue-router'

// import home from './pages/home'
// import help from './pages/help'
// import about from './pages/about'
import configAxios from './utils/axioDecorate'

let routes, router

const home = () => import(/* webpackChunkName: "page-home" */ './pages/home')
const help = () => import(/* webpackChunkName: "page-help" */ './pages/help')
const about = () => import(/* webpackChunkName: "page-about" */ './pages/about')

configAxios.decorate('/api')

Vue.use(VueRouter)

routes = [
  { path: '/', component: home },
  { path: '/#/', component: home },
  { path: '/home', component: home },
  { path: '/about', component: about },
  { path: '/help', component: help }
]

router = new VueRouter({routes})

export default router
