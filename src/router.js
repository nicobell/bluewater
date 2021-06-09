import Vue from 'vue'
import Router from 'vue-router'

//routing
import App from '@/App'
import Home from '@/views/Home'
import ProjectDescription from '@/views/ProjectDescription'

Vue.use(Router)

export default new Router ({
    routes:[
        {
            path:'/',
            name:'App',
            component:App,
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
    ]
})