<template>
  <keep-alive>
    <component v-bind:is="myComponent"></component>
  </keep-alive>
</template>
<script>
export default {
  name: 'master',
  components: {
    'ProjectDescription': () => import('@/views/ProjectDescription'),
    'Comments': () => import('@/views/Comments'),
    'Updates': () => import('@/views/Updates'),
    'Schedule': () => import('@/views/Schedule'),
    'NepaProcess': () => import('@/views/NepaProcess'),
    'DWPActLicense': () => import('@/views/DWPActLicense'),
    'Comments': () => import('@/views/Comments'),
    'Contacts': () => import('@/views/Contacts'),
    'Location': () => import('@/views/Location')
  },
   data:()=>{
    return{
      componentsRoute: {
        'localization': 'Location',
        'location': 'Location',
        'nepa-process-schedule': 'Schedule',
        'cronograma-de-proceso-nepa': 'Schedule',
        'descripcion-de-proyecto' : 'ProjectDescription',
        'project-description': 'ProjectDescription',
        'proceso-nepa' : 'NepaProcess',
        'nepa-process': 'NepaProcess',
        'ley-licencia-dwp': 'DWPActLicense',
        'dwp-act-license': 'DWPActLicense',
        'actulizationes' : 'Updates',
        'updates' : 'Updates',
        'comentarios' : 'Comments',
        'comments' : 'Comments',
        'contactos' : 'Contacts',
        'contacts' : 'Contacts',
      },
    }
  },
  computed: {
    myComponent () {
      return this.componentsRoute[this.$route.params.pagetitle]
    },
  },
  mounted(){
    this.$store.commit('SET_LANG', this.$route.params.lang)
    console.log('FIRE')
	},
  updated() {
    setTimeout(() => {
      if(document.getElementById('contenuto'))
        document.getElementById('contenuto').focus({
          preventScroll: true
        });    
    }, 50);
  }
}
</script>