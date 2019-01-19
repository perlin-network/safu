import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
        },
        {
            path: "/file",
            name: 'file_dispute',
            component: () => import(/* webpackChunkName: "about" */ './views/FileDispute.vue')
        },
        {
            path: "/report",
            name: 'report',
            component: () => import(/* webpackChunkName: "about" */ './views/ViewReport.vue')
        }
    ]
})
