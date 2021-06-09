<template>
  <header>
    <div class="loghi">
      <img src="../assets/logo-ma.png" width="270" height="37" alt="logo-ma">
      <img src="../assets/logo-uscg.png" width="43" height="41" alt="logo-uscg">
    </div>
    <div>
      <ul class="lang-switch" @click="changeLang">
        <li>It</li>
        <li>En</li>
      </ul>
    </div>
    <div class="meeting-banner">
      <div>
        <h2>Public meeting</h2>
        <p>April 19, 2021 | 3.00 PM</p>
      </div>
      <div>
        <button>Register now</button>
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
  methods:{
    changeLang() {
      if(this.$route.params.lang == "it"){
        this.$router.push(`/en/`)
        console.log('switched en');
      } else {
        this.$router.push(`/it/`)
        console.log('switched it');
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
  box-shadow: 0px 10px 10px 0px #000;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 84px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  .loghi {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    margin-left: 2rem;
  }
  .meeting-banner {
    padding: 10px 10px 10px 60px;
    background-color: #EEB23A;
    border-radius: 40px 0px 0px 40px;
  }
}
</style>
