<template>
<div class="template-page project-description intro">
    <header>
    </header>
    <div class="main-content">
      <h1 class="title">{{ this.data }}</h1>
      <div class="content">
        <p>
          Bluewater is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure. The Bluewater deepwater port would allow for up to two (2) very large crude carriers (VLCCs) or other crude oil carriers to moor at single point mooring (SPM) buoys and connect with the deepwater port via floating connecting crude oil hoses. During single vessel loading operations, the proposed project is capable of loading rates of up to approximately 80,000 barrels per hour (bph) and during simultaneous vessel loading operations, the proposed project is capable of loading rates of 40,000 bph. The facility is expected to service 16 VLCCs per month.Bluewater is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure. The Bluewater deepwater port would allow for up to two (2) very large crude carriers (VLCCs) or other crude oil carriers to moor at single point mooring (SPM) buoys and connect with the deepwater port via floating connecting crude oil hoses. During single vessel loading operations, the proposed project is capable of loading rates of up to approximately 80,000 barrels per hour (bph) and during simultaneous vessel loading operations, the proposed project is capable of loading rates of 40,000 bph. The facility is expected to service 16 VLCCs per month.
        </p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'project-description',
   data:()=>{
    return{
      lang:"",
      data:null,
    }
  },
  props:{
    langData: String
  },
  watch: {
    langData() {
      this.loadData()
    },
  },
  methods:{
    loadData(){			
      fetch("./data.json",)
        .then(response=>{
          return response.json()
        })
        .then(json=>{
          if(this.$route.params.lang=="it"){
            this.data = json.it
          } else {
            this.data = json.en
          }
        })
        .catch(function(error) {  
          console.log('Request failed', error)  
        });
    },
  },
  mounted(){
    this.loadData()
  }
}
</script>

<style scoped lang="scss">
  header {
    z-index: -1;
    width: 100%;
    min-height: 400px;
    background-image: url("../assets/header-bg.jpg")  ;
    background-size: cover;
  } 

  .main-content {
    max-width: 1780px;
    margin-right: 0;
    margin-top: -200px;
    position: relative;
    &:before {
      background-image: url("../assets/shadow-main-content.png");
      width: 141px;
      height: 598px;
      content: "";
      position: absolute;
      top: 20px;
      left: -140px;
    }
    .content {
      padding: 3rem 3rem ;
      background-color: #fff;
    }
  }
</style>
