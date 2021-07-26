<template>
  <div :class="['template-page schedule intro',{spallaOpen :showSpalla}]">
    <div class="overlay-spalla" @click="toggleSpalla">

    </div>
    <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">{{ content.title }}</h1>
      <div class="content two-col">

        <div class="inner-content">
          <div class="view-more">
            <button @click="toggleSpalla">VIEW <br> MORE</button>
          </div>

          <div class="image-container">
            <img src="../assets/timeline.png" alt="">
          </div>
        </div>
      </div>
    </div>
    
      <div :class="['spalla',{open:showSpalla}]">
        <div class="button-container">
          <div @click="toggleSpalla"></div>
        </div>
        <div :class="{'accordions': true, 'space': openAcc==0}">
          <div :class="{'open': openAcc==index, 'closed': openAcc!=index, 'text-container': true}"
            v-for="(a, index) in content.items" :key="'accordion'+index">
            <a @click="openAccordion(index)" :class="{'open': openAcc==index}">{{ a.title }}</a>
            <hr>
            <div :class="{'open': openAcc==index, 'closed': openAcc!=index}">
              <div v-for="(item, ind) in a.content" class="accordion" :key="'update'+ind">
                <p><strong>{{ item.date }} - </strong>{{ item.description }}</p>
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
    props: {
      langData: String
    },
    methods: {
      toggleSpalla() {
        this.showSpalla = !this.showSpalla
        if (this.showSpalla)
          this.$store.commit('SET_OBSCURE', true)
        else
          this.$store.commit('SET_OBSCURE', false)
      },
      openAccordion(index) {
        if (this.openAcc == index)
          this.openAcc = -1
        else
          this.openAcc = index
      },
      accordionStyle(index) {
        if (index == 1 && this.openAcc1)
          return 'display: block;'
        if (index == 2 && this.openAcc2)
          return 'display: block;'
      }
    },
    computed: {
      lang() {
        return this.$store.state.lang
      },
      content() {
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
 .button-container {
    position: relative;
    div {
      content: url(/close-button-dark.svg);
      position: fixed;
      cursor: pointer;
      display: block;
      width: 70px;
      height: 70px;
      z-index: 99;
      transform: translate(-110px, -81px);
    }
  }
.schedule.spallaOpen{
  position: absolute;
  height: 100%;
  overflow: hidden;
  .overlay-spalla{
    display: block;
  }
}
  .overlay-spalla {
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
    z-index: 1;
  }

.spalla{
  position: fixed;
  top: 84px;
  background: #f2f6ff;
  width: 500px;
  z-index: 99;
  overflow-y: scroll;
  display: none;
  height: calc( 100% - 184px);
  padding: 80px 110px 50px 110px;
  &.open{
    right: 0px;
    display: block;
  }
}

.accordions{
  margin-bottom: 90px;
}

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
    button {
      border-radius: 50px;
      background: #1C2332;
      color: #fff;
      font-weight: 300;
      font-size: .9em;
      z-index: 10;
      margin: 1rem 0;
      padding: 13px 30px;

      br {
        display: none;
      }
    }
  }

  .text-container {
    margin: 0px 0px 40px 0px;
    cursor: pointer;

    &.closed {
      height: unset;
    }

    &.open {
      height: 85%;
      position: relative;
    }

    >a {
      width: 90%;
      position: relative;
      font-size: 1.25rem;  
      display: block;
      margin-bottom: 5px;

    

      &::after {
        content: url('/dropdown.svg');
        width: 1em;
        display: inline-block;
        position: absolute;
        right: -10%;
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

    >div.closed {
      display: none;

      .accordion {
        display: none;
      }
    }

    >div.open {
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


  @media (max-width: 992px) {
    .button-container div {
      content: url(/close-button-dark.svg);
      position: fixed;
      top: auto;
      bottom: 40px;
      z-index: 99999;
      transform: none;
      right: 0;
      left: auto;
    }
    .spalla {
      width: 100%;
      padding:0 ;
      height: 100%;
      .accordions{
        padding: 45px 15px 105px 15px;
      }
    }

    .schedule .main-content {
      overflow: visible;
    }
  }

  @media (max-width: 768px) {
    .spalla {
      top: 65px;
    }
    .main-content {
      height: 70vh;
    }

    .image-container {
      height: 50vh;
      overflow-y: hidden;
      overflow-x: scroll;
      margin-bottom: 160px;
      display: block;

      img {
        width: auto;
        height: 100%;
      }
    }
    .schedule.spallaOpen {
      .image-container {
        display: none;
    }
    }
  }
</style>