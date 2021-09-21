import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home';
import ProxyRouter from '@/views/ProxyRouter';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes:[
        {
            path: '/:lang',
            name: 'Home',
            component: Home
        },
        {
            path: '/:lang/:pagetitle',
            name: 'ProxyRouter',
            component: ProxyRouter
        }
    ]
})

router.afterEach((to, from, next) => {
    console.log(to)
    Vue.nextTick(() => {
        if(to.params.tabtitle!= undefined)
            document.title = to.params.tabtitle + ' | Bluewater Project';
        else 
            document.title = 'Bluewater Project';
    });
})

export default router