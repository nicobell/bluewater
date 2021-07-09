<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">{{ content.title }}</h1>
      <div class="content two-col">

        <div class="view-more">
          <button @click="toggleSpalla">VIEW <br> MORE</button>
        </div>

        <div class="inner-content">
            <div class="image-container">
              <!--<div class="hotspot hotspot-1"></div>
              <div class="hotspot hotspot-2"></div>-->
              <img src="../assets/timeline.png" alt="">
            </div>
        </div>

        <div class="spalla" :style="spallaStyle">
          <button @click="toggleSpalla">X</button>
          <div>
            <div v-for="(a, index) in content.items" :key="'accordion'+index">
              <a @click="openAccordion(index)">{{ a.title }}{{openLabel(index)}}</a>
              <hr>
              <p :class="{'accordion' : true, 'open': openAcc==index}" v-html="a.description">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'nepa-process-schedule',
   data:()=>{
    return {
      data: null,
      showSpalla: false,
      openAcc1: false,
      openAcc2: false,
      openAcc: -1
    }
  },
  props:{
    langData: String
  },
  methods: {
    toggleSpalla() {
      this.showSpalla = !this.showSpalla
    },
    openAccordion(index) {
      if(this.openAcc == index)
        this.openAcc = -1
      else
        this.openAcc = index
    },
    accordionStyle(index) {
      if(index==1 && this.openAcc1)
        return 'display: block;'
      if(index==2 && this.openAcc2)
        return 'display: block;'
    },
    openLabel(index) {
      if(this.openAcc == index)
        return ' ^'
      else
        return ' v'
    }
  },
  computed: {
    spallaStyle() {
      return 'visibility: ' + (this.showSpalla ? 'visible' : 'hidden') + ';' +
        'right: ' + (this.showSpalla ? '10px' : '-35%') + ';' +
        'opacity: ' + (this.showSpalla ? '1' : '0.5') + ';'
    },
    lang () {
      return this.$store.state.lang
    },
    content () {
      return this.$store.state.data[this.lang].schedule
    }
  },
  mounted() {
    console.log('visiting ' + this.$route.name)
    this.$store.commit('SET_LASTPAGE', this.$route.name)
    console.log(this.content)
  }
}
</script>

<style scoped lang="scss">

.image-container {
  width: 100%;
  position: relative;
  .hotspot {
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: red;
    top: 25%;
    left: 16%;
  }
  .hotspot-2 {
    top: 65%;
    left: 46%;
  }
}

img {
  width: 100%;
}

.view-more {
  position: absolute;
  right: 0;
  top: 180px;
  display: flex;
  flex-direction: row;
  width: 150px;

  button {
    border-radius: 0;
    background: #1C2332;
    color: #fff;
    font-weight: 300;
    font-size: .9em;
    width: 100%;
    z-index: 10;
  }
}

.main-content {
  overflow: hidden;
}

.spalla {
  position: absolute;
  background: #fff;
  right: -35%;
  opacity: .5;
  height: calc(100vh - 100px);
  width: 27%;
  bottom: 0;
  visibility: hidden;
  z-index: 1000;
  padding: 0 40px;

  transition: 500ms all ease-in-out;

  button {
    background: #0079c1;
    border-radius: 0;
    color: #fff;
    width: 50px;
    height: 50px;
    left: -55px;
    top: -15px;
  }

  a {
    width: 100%;
    display: block;
    cursor: pointer;
    margin-top: 20px;
  }
}

.accordion {
  display: none;
  &.open {
    display: block;
  }
}
</style>
