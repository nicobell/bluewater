<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">Nepa Process Schedule</h1>
      <div class="content two-col">

        <div class="view-more">
          <button @click="toggleSpalla">VIEW <br> MORE</button>
        </div>

        <div class="inner-content">
            <div class="image-container">
              <div class="hotspot hotspot-1"></div>
              <div class="hotspot hotspot-2"></div>
              <img src="../assets/timeline.png" alt="">
            </div>
        </div>

        <div class="spalla" :style="spallaStyle">
          <button @click="toggleSpalla">X</button>
          <div>
            <div>
              <a @click="openAccordion(1)">KEY DATES THROUGH FINAL EIS AND APPLICATION PUBLIC HEARINGS {{openLabel(1)}}</a>
              <hr>
              <p :class="{'accordion-1': true, 'open': this.openAcc==1}">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut quam repellat, assumenda, itaque velit, nostrum aliquid porro quisquam eum explicabo molestias enim nesciunt veritatis obcaecati nam earum eius soluta in!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia corrupti aliquam suscipit exercitationem rem porro reprehenderit rerum officiis cum, eum laborum iusto expedita sequi commodi accusantium libero natus eaque nihil.
              </p>
            </div>
            <div>
              <a @click="openAccordion(2)">FUTURE ACTION {{openLabel(2)}}</a>
              <hr>
              <p :class="{'accordion-1': true, 'open': this.openAcc==2}">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptas pariatur, ipsa ea ab voluptatem consectetur in! Nisi voluptatibus cum quasi repellat. Quas fuga aliquid neque error deserunt, eum dolorem?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae commodi deserunt consectetur iure placeat neque non rem. Omnis quo, quaerat ab dicta qui eaque asperiores architecto, mollitia quasi in neque?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum repellendus hic quia suscipit neque necessitatibus rerum iste, nihil tenetur id aliquam! Repellat, culpa impedit earum id fuga quod dicta voluptate.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti natus qui quisquam a obcaecati. Omnis veniam praesentium nesciunt optio nisi soluta. Architecto labore voluptatibus molestias cum totam in quasi dolores.
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
    return{
      lang:"",
      data: null,
      showSpalla: false,
      openAcc1: false,
      openAcc2: false,
      openAcc: 0
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
        this.openAcc = 0
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
        return '^'
      else
        return 'v'
    }
  },
  computed: {
    spallaStyle() {
      return 'visibility: ' + (this.showSpalla ? 'visible' : 'hidden') + ';' +
        'right: ' + (this.showSpalla ? '10px' : '-35%') + ';' +
        'opacity: ' + (this.showSpalla ? '1' : '0.5') + ';'
    }
  },
  mounted() {
    console.log('visiting ' + this.$route.name)
    this.$store.commit('SET_LASTPAGE', this.$route.name)
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

.accordion-1, .accordion-2 {
  display: none;
  &.open {
    display: block;
  }
}
</style>
