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
            component: App,
            redirect: '/en/',
        },
        {
            path:'/:lang/:pagetitle',
            name:'home-page',
            component:Home,
        },
        {
            path:'/:lang/:pagetitle',
            name:'project-description',
            component:ProjectDescription,
        },
        {
            path:'/:lang/:pagetitle',
            name:'nepa-process',
            component:NepaProcess,
        },
        {
            path:'/:lang/:pagetitle',
            name:'nepa-process-schedule',
            component:Schedule,
        },
        {
            path:'/:lang/:pagetitle',
            name:'updates',
            component:updates,
        },
        {
            path:'/:lang/:pagetitle',
            name:'comments',
            component:Comments,
        },
        {
            path:'/:lang/:pagetitle',
            name:'contacts',
            component:Contacts,
        },
        
    ]
})