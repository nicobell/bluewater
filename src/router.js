import Vue from 'vue'
import Router from 'vue-router'

//routing
import App from '@/App'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router ({
    routes:[
        {
            path:'/',
            name:'App',
            component:App,
            redirect: '/it/'
        },
        {
            path:'/:lang/',
            name:'Home',
            component:Home,
        },
    ]
})