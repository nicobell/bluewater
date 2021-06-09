<template>
  <div class="template-page">
      <h1>project description</h1>
  </div>
</template>

<script>


export default {
  name: 'project-description',
  components: {
     Header
  },
  data: function() {
      return {
          jsonApi:"/public/data.json",
      }
  },
  mounted(){
    fetch(this.jsonApi, {method: "GET", mode: 'cors'})
      .then(response=>{
        return response.json()
      })
      .then(json=>{
        console.log('asd',json);
      })
      .catch(function(error) {  
        console.log('Request failed', error)  
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
