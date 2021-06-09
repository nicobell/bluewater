<template>
  <div class="template-page intro" >
    <h1 >{{this.data.intro.title}}</h1>
    <h3>{{this.data.intro.description}}</h3>
  </div>
</template>

<script>

export default {
  name: 'home',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.intro {
  background: url("../assets/bg-intro.jpg") center no-repeat;
}
</style>
