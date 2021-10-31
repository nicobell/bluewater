<template>
  <keep-alive>
    <component v-bind:is="myComponent" :key="this.$route.fullPath"></component>
  </keep-alive>
</template>
<script>
export default {
  name: 'master',
  components: {
    'ProjectDescription': () => import('@/views/ProjectDescription'),
    'Comments': () => import('@/views/Comments'),
    'GeneralInformation': () => import('@/views/GeneralInformation'),
    'Schedule': () => import('@/views/Schedule'),
    'NepaProcess': () => import('@/views/NepaProcess'),
    'DWPActLicense': () => import('@/views/DWPActLicense'),
    'Comments': () => import('@/views/Comments'),
    'Contacts': () => import('@/views/Contacts'),
    'Location': () => import('@/views/Location')
  },
   data: () => {
    return {
      componentsRoute: {
        'ubicacion': 'Location',
        'location': 'Location',
        'nepa-process-schedule': 'Schedule',
        'calendario-proceso-nepa': 'Schedule',
        'descripcion-de-proyecto' : 'ProjectDescription',
        'project-description': 'ProjectDescription',
        'proceso-nepa' : 'NepaProcess',
        'nepa-process': 'NepaProcess',
        'acta-licencia-dwp': 'DWPActLicense',
        'dwp-act-license': 'DWPActLicense',
        'information-general' : 'GeneralInformation',
        'general-information' : 'GeneralInformation',
        'comentarios' : 'Comments',
        'comments' : 'Comments',
        'contactos' : 'Contacts',
        'contacts' : 'Contacts',
      },
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    myComponent () {
      return this.componentsRoute[this.$route.params.pagetitle]
    },
  },
  mounted(){
    this.$store.commit('SET_LANG', this.$route.params.lang)
    console.log('FIRE')
	},
  updated() {
    /*setTimeout(() => {
      if(document.getElementById('contenuto'))
        document.getElementById('contenuto').focus({
          preventScroll: true
        });    
    }, 50);*/
  }
}
</script>