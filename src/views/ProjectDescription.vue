<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">{{content.projectDescription.title}}</h1>
      <div class="content two-col">
        <div class="inner-content-left">
          <p>
            Bluewater is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure. The Bluewater deepwater port would allow for up to two (2) very large crude carriers (VLCCs) or other crude oil carriers to moor at single point mooring (SPM) buoys and connect with the deepwater port via floating connecting crude oil hoses. During single vessel loading operations, the proposed project is capable of loading rates of up to approximately 80,000 barrels per hour (bph) and during simultaneous vessel loading operations, the proposed project is capable of loading rates of 40,000 bph. The facility is expected to service 16 VLCCs per month.Bluewater is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure. The Bluewater deepwater port would allow for up to two (2) very large crude carriers (VLCCs) or other crude oil carriers to moor at single point mooring (SPM) buoys and connect with the deepwater port via floating connecting crude oil hoses. During single vessel loading operations, the proposed project is capable of loading rates of up to approximately 80,000 barrels per hour (bph) and during simultaneous vessel loading operations, the proposed project is capable of loading rates of 40,000 bph. The facility is expected to service 16 VLCCs per month.
          </p>
        </div>
        <div class="inner-content-right">
          <p>
            Bluewater is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure. The Bluewater deepwater port would allow for up to two (2) very large crude carriers (VLCCs) or other crude oil carriers to moor at single point mooring (SPM) buoys and connect with the deepwater port via floating connecting crude oil hoses. During single vessel loading operations, the proposed project is capable of loading rates of up to approximately 80,000 barrels per hour (bph) and during simultaneous vessel loading operations, the proposed project is capable of loading rates of 40,000 bph. The facility is expected to service 16 VLCCs per month.Bluewater is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure. The Bluewater deepwater port would allow for up to two (2) very large crude carriers (VLCCs) or other crude oil carriers to moor at single point mooring (SPM) buoys and connect with the deepwater port via floating connecting crude oil hoses. During single vessel loading operations, the proposed project is capable of loading rates of up to approximately 80,000 barrels per hour (bph) and during simultaneous vessel loading operations, the proposed project is capable of loading rates of 40,000 bph. The facility is expected to service 16 VLCCs per month.
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
}
</script>

<style scoped lang="scss">

</style>
