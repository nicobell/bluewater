<template>
<div class="template-page project-description intro">"
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
            <img src="../assets/timeline.png" alt="">
          </div>
        </div>
      </div>


      <div class="spalla" :style="spallaStyle">
        <div class="button-container">
          <div @click="toggleSpalla"></div>
        </div>

        <div :class="{'accordions': true, 'space': openAcc==0}">
          <div :class="{'open': openAcc==index, 'closed': openAcc!=index, 'text-container': true}"
            v-for="(a, index) in content.items" :key="'accordion'+index">
            <a @click="openAccordion(index)" :class="{'open': openAcc==index}">{{ a.title }}</a>
            <hr>
            <div :class="{'open': openAcc==index, 'closed': openAcc!=index}">
              <div v-for="(item, ind) in a.content"
              class="accordion"
                :key="'update'+ind">
                <p><strong>{{ item.date }} - </strong>{{ item.description }}</p>
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
      if(this.showSpalla)
        this.$store.commit('SET_OBSCURE', true)
      else 
        this.$store.commit('SET_OBSCURE', false)
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
    },
    route() {
      return this.$route
    }
  },
  mounted() {
    //console.log('visiting ' + this.$route.name)
    this.$store.commit('SET_LASTPAGE', this.$route.name)
    //console.log(this.content)
  },
  watch: {
    route() {
      console.log(this.route)
      this.$store.commit('SET_OBSCURE', false);
      this.showSpalla = false;
    }
  }
}
</script>

<style scoped lang="scss">
.main-content {
  overflow: hidden;

  .content.two-col {
    position: relative;
  }
}

.image-container {
  width: 100%;
  position: relative;
  z-index: 0;
  img {
    width: 100%;
  }
}

.view-more {
  position: absolute;
  right: 0;
  bottom: 160px;
  display: flex;
  flex-direction: row;
  width: 90px;
  //height: 100px;

  button {
    border-radius: 0;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;

    background: #1C2332;
    color: #fff;
    font-weight: 300;
    font-size: .9em;
    width: 100%;
    z-index: 10;
  }
}

.spalla {
  position: absolute;
  width: 33%;
  height: 100%;
  top: 20px;
  z-index: 1000;

  background: #fff;
  visibility: hidden;
  right: -35%;
  opacity: .5;
  transition: 500ms all ease-in-out;

  /*&.obscure {
    &::before {
      content: '';
      background: rgba(0, 0, 0, .5);
      width: 100vw;
      height: 100vh;
      left: -100vw;
      position: absolute;
      z-index: -1;
    }
  }*/

  > div { padding: 0 40px; }

  .button-container {
    position: relative;
    div {
      position: absolute;
      left: -20px;
      top: -15px;

      cursor: pointer;
      display: block;
      content: url(/close-button-dark.svg);
      width: 50px;
      height: 50px;
      //border: 1px #fff solid;
    }
  }

  .accordions {
    height: 75%;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    &.space {
      justify-content: space-between;
    }

    a {
      width: 100%;
      display: block;
      cursor: pointer;
      font-weight: 700;
      font-size: 1.2rem;
    }
  }
}

.text-container {
  margin-bottom: 10px;
  &.closed { height: unset; }
  &.open {
    height: 85%;
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 170px;
      background: linear-gradient(transparent 10%, #fff 80%);
      pointer-events: none;
      bottom: 0;
      position: absolute;
    }
  }

  > a {
    width: 100%;
    position: relative;
    &::after {
      content: url('/dropdown.svg');
      width: 1em;
      display: inline-block;
      position: absolute;
      right: 15px;
      bottom: 0;
      transform: rotateZ(0deg);
      transition: all .3s;
    }
    &.open::after {
      display: inline-block;
      bottom: -5px;
      transform: rotateZ(-180deg);
      transition: all .3s;
    }
  }

  > div.closed {
    display: none;  
    .accordion { 
      display: none;
    }
  }

  /*&:nth-child(2) {
    > div.open {
      &:nth-of-type(1) {
        max-height: calc(90% - 24px);
      }
    }
  }*/

  > div.open {
    overflow: scroll;
    position: relative;
    max-height: calc(100% - 100px);

    //hide scrollbar on all browsers
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    .accordion {
      width: 100%;
      p {
        width: 100%;
        color: #12315F;
        font-size: .95em;
        line-height: 1.8rem;
        margin: 15px 0;
      }
    }
  }

}
@media (max-width: 1200px) {

  .spalla {
    width: 50%;
    height: 100%;
    
    .accordions {
      padding-top: 70px;
      height: 75%;
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
    height: 100%;
    right: 0;
    
    .button-container {
      div {
        left: 10px;
        top: 10px;
      }
    }

    .accordions {
      padding-top: 80px;
    }

    .text-container.open {
      height: 80%;
    }
    .text-container a {
      margin: 15px 0 10px 0;
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
  height: 70vh;
}

.spalla {
    width: 100%;
    height: 100%;
    right: 0;
    
    .button-container {
      div {
        left: 10px;
        top: 10px;
      }
    }

    .accordions {
      padding-top: 80px;
      height: 70%;
    }

    .text-container.open {
      height: 90%;      
    }
  }
}

@media (max-width: 576px) {
.main-content {
  height: 70vh;

  .inner-content {
    height: 70vh;
    .image-container {
      height: 75%;
      overflow-x: scroll;
      overflow-y: hidden;
      img {
        height: 100%;
        width: auto;
      }
    }
  }
}

.spalla .text-container.open {
  > div.open {
    height: 69%;
    max-height: unset;
  }
}

}

</style>
