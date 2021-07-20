<template>
<div class="template-page project-description intro">
  <header class="intro-header">
  </header>
  <div class="main-content">
    <h1 class="title">{{ content.title }}</h1>
    <div class="content two-col">
      <div class="inner-content-left">
        <div v-html="content.description"></div>
      </div>

      <div class="inner-content-right">
        <div class="data">
          <div class="section-1">
            <img src="../assets/mooring-point.svg" alt="mooring point logo">
            <div class="num"><span>{{ content.data.mooringPointd }}</span></div>
            <h3>SINGLE POINT MOORING BUOY SYSTEMS</h3>
          </div>
          <div class="section-2">
            <div class="depths"><span class="small">{{ content.data.depths }}</span>ft.</div>
            <div class="location"><span class="small">{{ content.data.location }}</span>nm off the coast of San Jose Island</div>
          </div>
          <div class="section-3">
            <div class="main">
              <div><span>{{ content.data.miles }}</span>miles</div>
              <h3>{{ content.data.milesDescription }}</h3>
            </div>
            <div class="labels">
              <div v-for="(l, index) in content.data.milesLabels" :key="'label'+index">
                {{ l }}
              </div>
            </div>
          </div>
          <div class="section-4">
            <div class="acres"><span class="small">{{ content.data.harborFacility }}</span>acres</div>
            <h4>Harbor Island Facility</h4>
          </div>
          <div class="section-1">
            <img src="../assets/carry.svg" alt="carry logo">
            <div class="num"><span>{{ content.data.carriersMonths }}</span></div>
            <h3>VERY LARGE CRUDE CARRIERS</h3>
          </div>
          <div class="section-2">
            <div class="loading"><span class="small">{{ content.data.loadingRates }}</span>ft.</div>
            <div class="operations"><span class="small">{{ content.data.simultaneousOperations }}</span>nm off the coast of San Jose Island</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'comments',
  data: () => {
    return {
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    content () {
      //console.log(this.$store.state.data[this.lang].projectDescription)
      return this.$store.state.data[this.lang].projectDescription
    },
  },
  methods: {
    gotolink(link) {
      window.open(link, '_blank')
    }
  },
  mounted() {
    //console.log('visiting ' + this.$route.name)
    this.$store.commit('SET_LASTPAGE', this.$route.name)
  }
}
</script>
<style scoped lang="scss">

.content.two-col {
  display: flex;
  .inner-content-right {
    background-color: #12315F;
    padding: 4rem 0;
    width: 45%;
  }
  .inner-content-left {
    width: 55%;
  }
}

.data {
  h3 {
    font-weight: 300;
    font-size: 1.2em;
    color: rgba(255, 255, 255, .7);
  }
  span {
    font-size: 3.5rem;
    font-weight: 700;
    color: #fff;
    &.small {
      font-size: 2.5rem;
    }
  }

  &>div {
    margin-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 4rem;
    padding-right: 4rem;
    &:last-child {
      border: none;
    }
    &:first-child {
      margin-top: 0;
    }
  }

  .section-1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      position: relative;
      z-index: 100;
    }
    .num {
      border: 1px #fff solid;
      min-width: 100px;
      min-height: 100px;
      border-radius: 100px;
      line-height: 1em;
      display: flex;
      align-items: center;
      justify-content: center;

      position: relative;
      z-index: 1000;
      left: -10px;
    }
    h3 {
      max-width: 50%;
      margin-left: 1em;
    }
  }

  .section-2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px rgba(255, 255, 255, .7) solid;
    &> div {
      max-width: 50%;
      color: rgba(255, 255, 255, .7);
      font-weight: 300;
      position: relative;
    }

    span {
      margin-right: 10px;
    }

    .location, .operations {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .location::before {
      content: 'LOCATION';
      font-size: .8rem;
      position: absolute;
      color: #98C3E1;
      font-weight: 700;
      top: -1.1em;
    }
    .depths::before {
      content: 'DEPTHS';
      font-size: .8rem;
      position: absolute;
      color: #98C3E1;
      font-weight: 700;
      top: -1.1em;
    }
    .loading::before {
      content: 'LOADING RATES';
      font-size: .8rem;
      width: 200px;
      position: absolute;
      color: #98C3E1;
      font-weight: 700;
      top: -1.1em;
    }
  }

  .section-3 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px rgba(255, 255, 255, .7) solid;

    div {
      color: rgba(255, 255, 255, .7);
      font-weight: 300;
    }

    .main {
      display: flex;
      flex-direction: column;
      width: 65%;
      h3 {
        margin: 0;
      }
    }

    .labels {
      width: 20%;
      position: relative;
      div {
        color: #fff;
        font-size: 1.2em;
        margin: 10px 0;
      }
      &:before {
        content: url(../assets/graffa.svg);
        height: 100%;
        width: 20px;
        position: absolute;
        left: -50%;
      }
    }

    span {
      margin-right: 10px;
    }
  }

  .section-4 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: 1px rgba(255, 255, 255, .7) solid;

    div {
      color: rgba(255, 255, 255, .7);
      font-weight: 300;
    }

    .acres {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
    }
    h4 {
      color: #fff;
      font-weight: 300;
    }
  }
}

@media (max-width: 1200px) {
  .data {
    .section-1 {
      position: relative;
      h3 {
        max-width: 100%;
        position: absolute;
        top: 100px;
        margin-left: 0;
      }
    }

    .section-2 {
      flex-direction: column;
      &>div {
        max-width: 100%;
        margin-top: 40px;
      }
    }

    .section-3 {
      flex-direction: column;
      .main {
        width: 100%;
      }
      .labels {
        width: 100%;
        margin-top: 40px;
        &>div {
          margin: 10px auto;
          width: fit-content;
        }
        &::before {
          left: calc(50% - 10px);
          top: -60%;
          transform: rotateZ(90deg) translateX(-50%);
        }
      }


    }
  }
}

@media (max-width: 1024px) {  
  .main-content .content.two-col{
    display: flex;
    .inner-content-right {
      width: auto;
      max-width: unset;
    }
    .inner-content-left {
      width: auto;
    }

    .data {
      .section-1 {
        position: relative;
        h3 {
          max-width: 50%;
          position: relative;
          top: 0;
          margin-left: unset;
        }
      }

      .section-2 {
        flex-direction: row;
        &>div {
          max-width: 50%;
          margin-top: 0;
        }
      }

      .section-3 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px rgba(255, 255, 255, .7) solid;

        div {
          color: rgba(255, 255, 255, .7);
          font-weight: 300;
        }

        .main {
          display: flex;
          flex-direction: column;
          width: 65%;
          h3 {
            margin: 0;
          }
        }

        .labels {
          width: 20%;
          position: relative;
          div {
            color: #fff;
            font-size: 1.2em;
            margin: 10px 0;
          }
          &:before {
            content: url(../assets/graffa.svg);
            height: 100%;
            width: 20px;
            transform: rotateZ(0deg) translateX(0);
            position: absolute;
            top: 0;
            left: -50%;
          }
        }

        span {
          margin-right: 10px;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .main-content .content.two-col .data {
    .section-1 {
      position: relative;
      h3 {
        max-width: 100%;
        position: absolute;
        top: 100px;
        margin-left: 0;
      }
    }

    .section-2 {
      flex-direction: column;
      &>div {
        max-width: 100%;
        margin-top: 40px;
      }
    }

    .section-3 {
      flex-direction: column;
      .main {
        width: 100%;
      }
      .labels {
        width: 100%;
        margin-top: 40px;
        &>div {
          margin: 10px auto;
          width: fit-content;
        }
        &::before {
          left: calc(50% - 10px);
          top: -60%;
          transform: rotateZ(90deg) translateX(-50%);
        }
      }


    }
  }
}

</style>

