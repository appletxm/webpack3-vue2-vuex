import Vue from 'vue'
import VueRouter from 'vue-router'

// import home from 'pages/home'
// import help from 'pages/help'
// import about from 'pages/about'

let routes, router

// const Home = resolve => {
//   require.ensure(['pages/home'], () => {
//     resolve(require('pages/home'))
//   })
// }
// const Help = resolve => {
//   require.ensure(['pages/help'], () => {
//     resolve(require('pages/help'))
//   })
// }
// const About = resolve => {
//   require.ensure(['pages/about'], () => {
//     resolve(require('pages/about'))
//   })
// }

const Home = () => import(/* webpackChunkName: "Home" */ 'pages/home')
const Help = () => import(/* webpackChunkName: "Help" */ 'pages/help')
const About = () => import(/* webpackChunkName: "About" */ 'pages/about')

Vue.use(VueRouter)

routes = [
  { path: '/', component: Home },
  { path: '/#/', component: Home },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/help', component: Help }
]

router = new VueRouter({routes})

export default router
