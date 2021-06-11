import Vue from 'vue'
import Router from 'vue-router'

//routing
import App from '@/App'
import Home from '@/views/Home'
import ProjectDescription from '@/views/ProjectDescription'
import Playground from '@/views/Playground'

Vue.use(Router)

export default new Router ({
    routes:[
        {
            path:'/',
            name:'App',
            component:Playground,
        },
        {
            path:'/:lang/:title',
            name:'Home',
            component:Home,
        },
        {
            path:'/:lang/:title',
            name:'project-description',
            component:ProjectDescription,
        },
        {
            path: '/playground',
            name: 'playground',
            component: Playground
        }
    ]
})