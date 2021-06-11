<template>
  <header>
    <div class="container">
      <div class="loghi">
        <router-link to="/"><img src="../assets/logo-ma.png" width="270" height="37" alt="logo-ma"></router-link>
        <img src="../assets/logo-uscg.png" width="43" height="41" alt="logo-uscg">
      </div>
      <div>
        <ul class="lang-switch" @click="changeLang" :class="this.$route.params.lang == 'it' ? 'it' : 'en'">
          <li>It</li>
          <li>En</li>
        </ul>
      </div>
      <div class="meeting-banner">
        <img src="../assets/icon-meeting.svg" width="42" height="42" alt="">
        <div class="text">
          <h2>Public meeting</h2>
          <p>April 19, 2021 | 3.00 PM</p>
        </div>
        <div>
          <button>Register now</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'my-header',
  props: {
    msg: String
  },
  methods: {
    changeLang() {
      if(this.$route.params.lang == "it"){
        this.$router.push(`/en/`)
        console.log(this.$store)
        this.$store.commit('SET_LANG', 'en')
      } else {
        this.$router.push(`/it/`)
        this.$store.commit('SET_LANG', 'it')
      }
		},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  background: #fff;
  position: fixed;
  box-shadow: 0px 10px 15px 0px #0000001f;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 84px;
  &>div{
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
  }
  .loghi {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    margin-left: 2rem;
    img{
      margin-right: 40px;
    }
  }
  .meeting-banner {
    padding: 0px 10px 0px 40px;
    background-color: #EEB23A;
    border-radius: 40px 0px 0px 40px;
    display: flex;
    height: 100%;
    align-items: center;
    .text {
      margin: 0px 40px;
    }
    h2 {
      color: #fff;
      font-size: 1.375rem;
      font-weight: 600;
      margin: 0;
      line-height: 1.6rem;
    }
    p {
      font-size: 0.875rem;
      color: #4E380B;
      margin: 0;
      line-height: 1.6rem;
    }
    button {
      background-color: #fff;
      color: #EEB23A;
      border: 0px;
      border-radius: 50px;
      font-size: 1rem;
      padding: 10px 20px;
      font-weight: 600;
    }
  }
}

@media (max-width: 1024px) {
  header .meeting-banner {
    position: fixed;
    height: 100px;
    bottom: 0%;
    border-radius: 0px;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
}

@media (max-width: 768px) {
  header {
    height: 65px;
    .loghi {
      padding-left: 0rem;
      margin-left: 15px;

      img {
        width: auto;
        max-height: 35px;
      }
    }
    .meeting-banner .text{
      margin: 0px 30px 0px 20px;
    }
  }
}

@media (max-width: 576px) {
  header {
    height: 65px;
    .loghi {
      padding-left: 0rem;
      margin-left: 15px;
      align-items: center;
      img {
        width: auto;
        max-height: 30px;
        margin-right: 30px;
      }
    }
  }
}


@media (max-width: 480px) {
  header {
    .meeting-banner{
      padding: 0px 15px;
      justify-content: space-between;
      width: calc(100% - 30px);
      .text{
        
        margin: 0px ;
        h2 {
          font-size: 1.25rem;
        }
      }
      button {
        padding:  10px 12px;;
      }
      img {
        display: none;
      }
    }
  }
}
</style>
