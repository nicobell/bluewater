import Vue from 'vue'
import VueRouter from 'vue-router'

//routing
import App from '@/App';
import Home from '@/views/Home';
import ProjectDescription from '@/views/ProjectDescription';
import Comments from '@/views/Comments';
import Updates from '@/views/Updates';
import NepaProcess from '@/views/NepaProcess';
import Schedule from '@/views/Schedule';
import Contacts from '@/views/Contacts';

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
            name:'location',
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
            component:Updates,
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
// Save the last route name in localStorage
router.afterEach((to) => {
    const lastRouteName = JSON.parse(localStorage.getItem('LS_ROUTE_KEY'))
    // al refresh non c'e' il route id (rid)
    if (to.params.rid == null && to.name !== 'home-page') return

    const myto = {
        "path": to.path,
        "name": to.name,
        "params": to.params
    }
    localStorage.setItem('LS_ROUTE_KEY', JSON.stringify(myto))
})

export default router