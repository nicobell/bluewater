<template>
  <div class="template-page intro">
    lang {{langData}}
  </div>
</template>

<script>

export default {
  name: 'intro',
  data:()=>{
    return{
      lang:"",
      data:null,
    }
  },
  props:{
    langData: String
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.template-page {
  padding: 350px;
}
</style>
