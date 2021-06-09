<template>
  <header>
    <div class="container">
      <div class="loghi">
        <router-link to="/"><img src="../assets/logo-ma.png" width="270" height="37" alt="logo-ma"></router-link>
        <img src="../assets/logo-uscg.png" width="43" height="41" alt="logo-uscg">
      </div>
      <div>
        <ul class="lang-switch" >
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
    display: flex;
    align-items: stretch;
    justify-content: space-between;
  }
  .loghi {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    margin-left: 2rem;
  }
  .meeting-banner {
    padding: 10px 10px 10px 40px;
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
</style>
