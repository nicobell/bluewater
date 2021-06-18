<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">{{content.projectDescription.title}}</h1>
      <div class="content two-col">
        <div class="inner-content-left">
          <p>
            {{content.projectDescription.description}}
          </p>
        </div>
        <div class="inner-content-right">
          <p>
            {{content.projectDescription.description}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'project-description',
   data:()=>{
    return{
      data:null,
    }
  },
  computed:{
    lang () {
      return this.$store.state.lang
    },
    content () {
      return this.$store.state.data[this.lang]
    }
  },
  mounted() {
    console.log('visiting ' + this.$route.name)
    this.$store.commit('SET_LASTPAGE', this.$route.name)
  }
}
</script>

<style scoped lang="scss">

</style>
