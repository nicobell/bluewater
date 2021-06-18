import Vue from 'vue'
import VueRouter from 'vue-router'

//routing
import App from '@/App';
import Home from '@/views/Home';
import ProxyRouter from '@/views/ProxyRouter';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes:[
        {
            path:'/:lang',
            name:'app',
            component: App,
            redirect: '/:lang/home-page'
        },
        {
            path:'/:lang/home-page',
            name:'home-page',
            component:Home,

        },
        {
            path:'/:lang/:pagetitle',
            name:'ProxyRouter',
            component:ProxyRouter,
        },
        
    ]
})

export default router