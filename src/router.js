import Vue from 'vue'
import Router from 'vue-router'

//routing
import Home from '@/views/Home'
import ProjectDescription from '@/views/ProjectDescription'
import Comments from '@/views/Comments'

Vue.use(Router)

export default new Router ({
    routes:[
        {
            path:'/',
            name:'Home',
            component:Home,
        },
        {
            path:'/project-description',
            name:'project-description',
            component:ProjectDescription,
        },
        {
            path:'/comments',
            name:'comments',
            component:Comments,
        },
    ]
})