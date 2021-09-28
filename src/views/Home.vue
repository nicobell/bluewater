<template>
  <div class="template-page intro" >
    <section id="contenuto" tabindex="0" aria-labelledby="maintitle">
      <h1 id="maintitle" tabindex="-1">{{ content.intro.title }}</h1>
      <p>{{ content.intro.description }}</p>
      <router-link :to="'/' + lang + '/' +'location'">
        <button class="outline icon-left">
          {{ content.intro.buttonLabel }}
        </button>
      </router-link>
    </section>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'home',
  data:()=>{
    return {
    }
  },
  computed: {
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
    this.$store.commit('SET_LANG', this.$route.params.lang)
  }
}
</script>

<style scoped lang="scss">
  section {
    display: block;
  }
  .intro {
    background: url("../assets/bg-intro.jpg") center no-repeat;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;

    &>div, &>section{
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
      &>section {
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
    .intro > section {
        padding: 0 1rem;
        width: calc(100% - 2rem);
    }
  }
</style>
