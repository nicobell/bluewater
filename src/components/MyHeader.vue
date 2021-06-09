<template>
  <header>
    <div class="loghi">
      <img src="" alt="">
      <img src="" alt="">
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
  background: red;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  .meeting-banner {
    background-color: orange;
  }
}
</style>
