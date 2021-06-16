<template>
  <div class="template-page intro" >
    <div v-if="data">
      <h1>{{ content.intro.title}}</h1>
      <p>The purpose of this site is to inform stakeholders about the project, and to provide the public an opportunity to submit written comments.</p>
      <router-link :to="{name: 'project-description'}"><button class="outline icon-left">
        Vai Al Sito
      </button>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'home',
  data:()=>{
    return{
      data:null,
      isMobile:null,
    }
  },
  computed: {
    lang () {
      return this.$store.state.lang
    },
    content () {
      return this.data[this.lang]
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
          this.data = json
        })
        .catch(function(error) {  
          console.log('Request failed', error)  
        });
      },
    checkIfMobile(){
      if(window.innerWidth<1024){
        this.$store.commit('SET_DEVICE', true)
      }
    }
    },
    mounted(){
      this.loadData()
      this.checkIfMobile()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.intro {
  background: url("../assets/bg-intro.jpg") center no-repeat;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;

  &>div{
    position: absolute;
    transform: translate3d(-50%,-50%,0);
    left: 50%;
    top: 50%;
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h1 {
      font-size: 3.125rem;
      margin-bottom: 10px;
    }
    p{
      font-size: 1.125rem;
      color: #fff;
      font-weight: 400;
      margin-bottom:30px;
    }
    button.icon-left{
      width: 200px;
      color: #fff;
      transition: 0.2s ease;
      a{
        color: #fff;
        text-decoration: none;
      }
      &:hover{
        color: #0b4e83;
        transition: 0.2s ease;
        a{
        color: #0b4e83;
      }
        &:after {
          background-image: url("../assets/arrow-button-hover.svg");
        }
      }
    }
    button.icon-left::after {
      background-image: url("../assets/arrow-button.svg");
      width: 25px;
      height: 24px;
    }
  }
}

@media (max-width: 992px) { 
  .intro {
    padding-bottom: 100px;
    &>div {
      padding: 0 3rem;
      width: calc(100% - 6rem);
      h1 {
        font-size: 30px;
      }
      p {
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }
  }
}
@media (max-width: 480px) { 
  .intro > div {
      padding: 0 1rem;
      width: calc(100% - 2rem);
  }
}

</style>
