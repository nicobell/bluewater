<template>
    <main role="main" class="template-page project-description intro">

        <div class="intro-header"></div>

        <div class="main-content">
            <h1 class="title">{{content.title}}</h1>

            <div class="content two-col isDesktop" ref="container" >
                <div class="inner-content-left">
                    <ul class="menu">
                        <li v-for="(d, index) in content.stepProcess" 
                            :key="'label'+index">
                            <button :class="{'item-menu': true, 'active-section': isActive==index+1}" 
                                @click="openSection(index+1)"
                                :tabindex="isActive==index+1 ? '0' : '-1'"
                                :aria-controls="'section' + (index+1)" aria-expanded="false"
                                :id="'btn'+(index+1)">
                                
                                <span class="num"> 0{{index+1}} </span>
                                <span>{{d.label}}</span>
                            </button>
                        </li>
                    </ul>
                </div>

                <div class="inner-content-right">
                    <div class="item-content" :id="'section' + selectedStep.id" role="region" :aria-labelledby="'btn'+selectedStep.id" tabindex="0">
                        <h2 :id="'region'+selectedStep.id" tabindex="0">{{ selectedStep.title }}</h2>
                        <p v-html="selectedStep.description" tabindex="0"></p>
                        <div v-for="(b, index) in selectedStep.body" :key="'element' + index" :class="['body', b.titleClass]" tabindex="0">
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
    </main>
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
            document.getElementById('btn'+this.isActive).setAttribute('aria-expanded', 'false');
            this.isActive = id
            document.getElementById('btn'+id).setAttribute('aria-expanded', 'true');
            setTimeout(() => {
                document.getElementById('section'+id).focus();    
            }, 100);
            
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
        document.getElementsByClassName('main-content')[0].focus();
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
