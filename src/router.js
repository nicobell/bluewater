import Vue from 'vue'
import Router from 'vue-router'

//routing
import Home from '@/views/Home';
import ProjectDescription from '@/views/ProjectDescription';
import Comments from '@/views/Comments';
import updates from '@/views/Updates';
import NepaProcess from '@/views/NepaProcess';
import Schedule from '@/views/Schedule';
import Contacts from '@/views/Contacts';
import Playground from '@/views/Playground';


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
            path:'/nepa-process',
            name:'nepa-process',
            component:NepaProcess,
        },
        {
            path:'/nepa-process-schedule',
            name:'nepa-process-schedule',
            component:Schedule,
        },
        {
            path:'/updates',
            name:'updates',
            component:updates,
        },
        {
            path:'/comments',
            name:'comments',
            component:Comments,
        },
        {
            path:'/contacts',
            name:'contacts',
            component:Contacts,
        },
        {
            path:'/location',
            name:'location',
            component:Playground,
        },
        
    ]
})