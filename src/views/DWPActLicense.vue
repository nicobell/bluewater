<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
        <h1 class="title">{{content.title}}</h1>

        <div class="content two-col isDesktop" ref="container" >
            <div class="inner-content-left">
                <div class="menu">
                    <div :class="{'item-menu': true, 'active-section': isActive==index+1}" 
                        @click="openSection(index+1)"
                        v-for="(d, index) in content.stepProcess" 
                        :key="'label'+index">
                        
                        <div class="num"> 0{{index+1}} </div>
                        <h2>{{d.label}}</h2>
                    </div>
                </div>
            </div>

            <div class="inner-content-right">
                <div class="item-content">
                    <h1>{{ selectedStep.title }}</h1>
                    <p v-html="selectedStep.description"></p>
                    <div v-for="(b, index) in selectedStep.body" :key="'element' + index" :class="['body', b.titleClass]">
                        <div class="detail">{{ b.detail }}</div>
                        <h4 class="title">{{ b.title }}</h4>
                        <div v-html="b.description"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content two-col isMobile">
            <div class="inner-content">

                <div class="accordion-item"
                    v-for="(d, index) in content.stepProcess" :key="'accordion'+index">
                    <div class="clicker" @click="toggle">
                        <h2>{{index+1}}. {{d.label}}</h2><span class="accordion-icon"></span>
                    </div>
                    <div>
                        <div class="hidden-content">
                            <h2>{{ d.title }}</h2>
                            <p v-html="d.description"></p>
                            <div v-for="(b, index) in d.body" :key="'element' + index" :class="['body', b.titleClass]">
                                <div class="detail">{{ b.detail }}</div>
                                <h4 class="title">{{ b.title }}</h4>
                                <div v-html="b.description"></div>
                            </div>
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
    name: 'nepa-process',
    props:{
        langData: String
    },
    data: () => {
        return {
            isActive: 1
        }
    },
    methods:{
        openSection(id){
            this.isActive = id
        },
        toggle(e) {
            //console.log(e.target.parentNode)
            if(Array.from(e.target.parentNode.classList).includes('active')) {
                e.target.parentNode.classList.toggle('active')
            } else {
                Array.from(document.getElementsByClassName('accordion-item')).forEach(el => {
                    el.classList.remove('active')
                })
                e.target.parentNode.classList.toggle('active')
            }
            
            e.target.parentNode.scrollIntoView(true);
            window.scrollBy(0, -70);
        }
    },
    computed: {
        lang () {
            return this.$store.state.lang
        },
        content () {
            //console.log(this.$store.state.data[this.lang].dwpAct)
            return this.$store.state.data[this.lang].dwpAct
        },
        selectedStep() {
            return this.content.stepProcess.find(step => step.id == this.isActive)
        },
        route() {
            return this.$route
        }
    },
    mounted() {
        //console.log('visiting ' + this.$route.name)
        this.$store.commit('SET_LASTPAGE', this.$route.name)
    },
    watch: {
        route() {
            this.isActive = 1
            Array.from(document.getElementsByClassName('accordion-item')).forEach(el => {
                //console.log(el, el.classList)
                el.classList.remove('active')
            })
        }
    }
}
</script>

<style scoped lang="scss">

</style>
