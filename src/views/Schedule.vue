<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">Nepa Process Schedule</h1>
      <div class="content two-col">
        <div class="inner-content">
            <img src="../assets/timeline.png" alt="">
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
}
</script>

<style scoped lang="scss">
img {
  width: 100%;
}
</style>
