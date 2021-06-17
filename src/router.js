import Vue from 'vue'
import Router from 'vue-router'

//routing
import App from '@/App';
import Home from '@/views/Home';
import ProjectDescription from '@/views/ProjectDescription';
import Comments from '@/views/Comments';
import updates from '@/views/Updates';
import NepaProcess from '@/views/NepaProcess';
import Schedule from '@/views/Schedule';
import Contacts from '@/views/Contacts';


Vue.use(Router)

export default new Router ({
    routes:[
        {
            path:'/',
            name:'app',
            component:App,
            redirect: '/en/',
        },
        {
            path:'/:lang/',
            name:'home-page',
            component:Home,
        },
        {
            path:'/:lang/project-description',
            name:'project-description',
            component:ProjectDescription,
        },
        {
            path:'/:lang/nepa-process',
            name:'nepa-process',
            component:NepaProcess,
        },
        {
            path:'/:lang/nepa-process-schedule',
            name:'nepa-process-schedule',
            component:Schedule,
        },
        {
            path:'/:lang/updates',
            name:'updates',
            component:updates,
        },
        {
            path:'/:lang/comments',
            name:'comments',
            component:Comments,
        },
        {
            path:'/:lang/contacts',
            name:'contacts',
            component:Contacts,
        },
        
    ]
})