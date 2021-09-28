<template>
    <main :class="['template-page schedule intro',{spallaOpen :showSpalla}]" role="main" tabindex="-1" aria-describedby="help">
        <div id="help" class="tohide">press 'N' to return to navigation</div>
        
        <div class="overlay-spalla" @click="toggleSpalla"></div>

        <div class="intro-header"></div>

        <div class="main-content" id="contenuto" aria-labelledby="title1" tabindex="0">
            <h1 class="title" id="title1"><span class="tohide">page title: </span>{{ content.title }}</h1>

            <section class="content two-col">
                <div class="inner-content">
                    

                    <!--<div class="view-more">-->
                    <button class="view-more" id="view-more" @click="toggleSpalla" tabindex="0">{{ lang=='es' ? 'VER MÁS' : 'VIEW MORE' }}</button>
                    <!--</div>-->

                    <div class="image-container" tabindex="0">
                        <img :src="sourceimage" alt="schedule image" aria-describedby="hiddendescription">
                        <article class="tohide" id="hiddendescription" tabindex="-1">
                            {{ content.imageDescription }}
                        </article>
                    </div>
                </div>
            </section>
        </div>
        
        <div :class="['spalla', {open: showSpalla}]" id="spalla">
            <div class="button-container">
                <button id="close-spalla" @click="toggleSpalla" tabindex="-1" aria-label="close view more section"></button>
            </div>
            <div :class="{'accordions': true, 'space': openAcc==0}">
                <article :class="{'open': openAcc==index, 'closed': openAcc!=index, 'text-container': true}"
                    v-for="(a, index) in content.items" :key="'accordion'+index">
                    <button :class="{'open': openAcc==index}" :id="'accordion'+index"
                        @click="openAccordion(index)"
                        tabindex="0" :aria-expanded="openAcc==index ? true : false" :aria-controls="'inner'+index"
                    >{{ a.title }}</button>
                    <div :class="{'open': openAcc==index, 'closed': openAcc!=index}" :id="'inner'+index"
                        tabindex="-1" :aria-labelledby="'accordion'+index">
                        <p v-for="(item, ind) in a.content" class="accordion" :key="'update'+ind">
                            <strong>{{ item.date }} - </strong>{{ item.description }}
                        </p>
                    </div>
                </article>
            </div>
        </div>

        <div>
            <button class="tohide" id="back-to-nav" @click="backtonav()" tabindex="0" aria-label="back to navbar">
                back to navbar
            </button>
        </div>

    </main>
</template>

<script>
    export default {
        name: 'nepa-process-schedule',
        data: () => {
            return {
                data: null,
                showSpalla: false,
                openAcc: -1
            }
        },
        props: {
            langData: String
        },
        methods: {
            toggleSpalla() {
                this.showSpalla = !this.showSpalla
                if (this.showSpalla) {
                    setTimeout(() => {  
                        document.getElementById('close-spalla').setAttribute('tabindex', 0)
                        document.getElementById('close-spalla').focus({preventScroll: true})

                        document.getElementById('contenuto').setAttribute('tabindex', '-1')
                        document.getElementById('view-more').setAttribute('tabindex', '-1')
                        document.getElementById('hiddendescription').setAttribute('tabindex', '-1')

                        document.getElementById('spalla').addEventListener('keydown', e => {
                            if(e.keyCode==27) { 
                                document.getElementById('close-spalla').setAttribute('tabindex', '-1')
                                document.getElementById('view-more').focus({preventScroll: true})
                                this.$store.commit('SET_OBSCURE', false)
                                this.showSpalla = false
                            }
                        })
                    }, 100);
                        
                    this.$store.commit('SET_OBSCURE', true)
                } else {
                    document.getElementById('contenuto').setAttribute('tabindex', 0)
                    document.getElementById('view-more').setAttribute('tabindex', 0)
                    document.getElementById('hiddendescription').setAttribute('tabindex', 0)

                    document.getElementById('spalla').setAttribute('tabindex', '-1')
                    document.getElementById('close-spalla').setAttribute('tabindex', '-1')
                    document.getElementById('view-more').focus({preventScroll: true})
                    this.$store.commit('SET_OBSCURE', false)
                }
            },
            openAccordion(index) {
                if (this.openAcc == index)
                    this.openAcc = -1
                else
                    this.openAcc = index
            },
            backtonav() {
                //console.log(document.getElementById('navigazione'))
                if(this.showSpalla)
                    this.toggleSpalla()
                document.getElementById('navigazione').focus();
                
            }
        },
        computed: {
            sourceimage() {
                return this.lang=='es' ? 
                    "/BW_timeline_v.2_5ra_spagnolo.png" :
                    "/BW_timeline_v.2_5ra.png"
            },
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
                this.$store.commit('SET_OBSCURE', false);
                this.showSpalla = false;
            }
        }
    }
</script>

<style scoped lang="scss">
.button-container {
    position: relative;
    button {
        background-image: url(../assets/close-button-dark.svg);
        content: '';
        position: fixed;
        background-position: center center;
        background-size: contain;
        cursor: pointer;
        display: block;
        width: 70px;
        height: 70px;
        z-index: 99;
        transform: translate(-110px, -81px);
        border-radius: 0;
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

button.view-more {
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

    > button {
        width: 100%;
        position: relative;
        font-size: 1.25rem;  
        display: block;
        margin-bottom: 5px;
        background-color: transparent;
        border-radius: 0;
        color: #125D91;
        padding: 0;
        padding-bottom: 10px;
        border-bottom: #7070702a solid 1px;

        &::after {
            content: url(../assets/dropdown.svg);
            width: 1em;
            display: inline-block;
            position: absolute;
            right: 5%;
            bottom: 10px;
            transform: rotateZ(0deg);
            transition: all .3s;
        }

        &.open::after {
            display: inline-block;
            bottom: 5px;
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
            color: #12315F;
            font-size: .95em;
            line-height: 1.8rem;
            margin: 15px 0;
        }
    }

}


  @media (max-width: 992px) {
    .button-container div {
      content: url(../assets/close-button-dark.svg);
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

@media (max-width: 480px) {
    .button-container {
        position: relative;
        button {
            position: fixed;
            transform: translate(0, 0);
        }
    }
    .spalla .accordions {
        padding-top: 80px;
    }
}
</style>