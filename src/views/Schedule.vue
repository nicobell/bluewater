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
          <div class="button-container">
            <button @click="toggleSpalla">X</button>
          </div>

            <div class="text-container" v-for="(a, index) in content.items" :key="'accordion'+index">
              <a @click="openAccordion(index)">{{ a.title }}{{openLabel(index)}}</a>
              <hr>
              <div :class="{'open': openAcc==index}">
                <div v-for="(item, ind) in a.content"
                class="accordion"
                  :key="'update'+ind">
                  <p>{{ item.date }}</p>
                  <p>{{ item.description }}</p>
                </div>
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
   data: () => {
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
        'right: ' + (this.showSpalla ? '0' : '-35%') + ';' +
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
  //height: 75vh;
}

.spalla {
  position: absolute;
  background: #fff;
  right: -35%;
  opacity: .5;
  width: 33%;
  height: 97%;
  bottom: 0;
  visibility: hidden;
  z-index: 1000;
  //padding: 0 40px;
  transition: 500ms all ease-in-out;

  .button-container {
    position: relative;
  }

  button {
    position: absolute;

    background: #0079c1;
    border-radius: 0;
    color: #fff;
    width: 50px;
    height: 50px;
    left: -20px;
    top: -15px;
  }

  a {
    width: 100%;
    display: block;
    cursor: pointer;
    margin-top: 20px;
    font-weight: 700;
    font-size: 1.2rem;
  }

  > div {
    padding: 0 40px;
  }

}

.text-container {
  height: fit-content;
  max-height: 80%;
  > div:not(.open) {
    .accordion {
      display: none;
    }
  }

  > div.open {
    max-height: 400px;
    overflow: auto;
    position: relative;
    height: fit-content;

    .accordion {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;

      p {
        display: inline-block;
        line-height: 1.5rem;
        margin: 20px 0;
      }

      p:last-child {
        width: 68%;
        color: #1C2332;
      }
      p:first-child {
        width: 30%;
        color: #1C2332;
        font-weight: 700;
      }
    }
  }

}
@media (max-width: 1200px) {
  .main-content {
    overflow: visible;
  }
  .spalla {
    width: 50%;
    right: 0;
    position: absolute;
    height: 80vh;
    bottom: -10vh;
    
    .button-container {
      button {
        left: 10px;
        top: 10px;
      }
    }

    .text-container:not(:last-child) {
      padding-top: 50px;
    }
    .text-container > div.open {
      max-height: 400px;
    }

    .text-container .open .accordion {
      flex-direction: column;
      margin-bottom: 20px;

      p {
        width: 90% !important;
        margin: 0;
      }
    }
  }
}

@media (max-width: 992px) {
  .spalla {
    width: 100%;
    right: 0;
    
    .button-container {
      button {
        left: 10px;
        top: 10px;
      }
    }

    .text-container:not(:last-child) {
      padding-top: 50px;
    }
    .text-container > div.open {
      max-height: 320px;
    }

    .text-container .open .accordion {
      flex-direction: column;
      margin-bottom: 20px;

      p {
        width: 90% !important;
        margin: 0;
      }
    }
  }
}

@media (max-width: 768px) {
   .main-content {
    overflow: visible;
  }
  .spalla {
    width: 100%;
    right: 0;
    bottom: -40vh;
    position: absolute;
    height: 90vh;

    .button-container {
      button {
        left: 10px;
        top: 10px;
      }
    }

    .text-container:not(:last-child) {
      padding-top: 50px;
    }

    .text-container > div.open {
      max-height: 320px;
    }
  }
}

</style>
