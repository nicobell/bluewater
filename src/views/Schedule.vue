<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">Nepa Process Schedule</h1>
      <div class="content two-col">
        <div class="inner-content">
            <div class="image-container">
              <div class="hotspot hotspot-1"></div>
              <div class="hotspot hotspot-2"></div>
              <img src="../assets/timeline.png" alt="">
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'nepa-process-schedule',
   data:()=>{
    return{
      lang:"",
      data:null,
    }
  },
  props:{
    langData: String
  },
  mounted() {
    console.log('visiting ' + this.$route.name)
    this.$store.commit('SET_LASTPAGE', this.$route.name)
  }
}
</script>

<style scoped lang="scss">

.image-container {
  width: 100%;
  position: relative;
  .hotspot {
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: red;
    top: 25%;
    left: 16%;
  }
  .hotspot-2 {
    top: 65%;
    left: 46%;
  }
}

img {
  width: 100%;
}
</style>
