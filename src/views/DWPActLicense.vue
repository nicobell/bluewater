<template>
    <main class="template-page intro" role="main" aria-describedby="help">
        <div id="help" class="tohide">press 'N' to return to navigation</div>
        <div class="intro-header"></div>

        <div class="main-content" id="contenuto" tabindex="0" aria-labelledby="title1">
            <h1 class="title" id="title1"><span class="tohide">page title: </span>{{content.title}}</h1>

            <div class="content two-col isDesktop" ref="container">
                <section class="inner-content-left">
                    <div class="menu" id="menu"
                        role="tablist" tabindex="0" aria-label="internal menu" aria-describedby="instructions">
                        <div class="tohide" tabindex="0" id="instructions">use up and down arrows to select</div>

                        <button v-for="(d, index) in content.stepProcess" :key="'label'+index"
                            :class="{'item-menu': true, 'active-section': isActive==index+1}" :id="'btn'+(index+1)"
                            @click="openSection(index+1)"
                            role="tab" :aria-controls="'section' + (index+1)">
                                <span class="num"> 0{{index+1}} </span>
                                <span >{{d.label}}</span>
                        </button>
                    </div>  
                </section>

                <section class="inner-content-right">
                    <div v-if="isActive!=0" 
                        class="item-content" :id="'section'+isActive" 
                        role="tabpanel" tabindex="0" :aria-labelledby="'region'+isActive" aria-live="polite">
                        <h2 :id="'region'+isActive" role="header" aria-level="2">{{ selectedStep.title }}</h2>

                        <article v-html="selectedStep.description"></article>

                        <article v-for="(b, index) in selectedStep.body" :key="'element' + index"
                            :class="['body', b.titleClass]">
                            <div class="detail" :id="'detail'+index">{{ b.detail }}</div>
                            <h3 class="title" role="header" :aria-level="b.title=='' ? null : '3'" :aria-describedby="'detail'+index">{{ b.title }}</h3>
                            <div v-html="b.description"></div>
                        </article>
                    </div>
                </section>
            </div>

            <div class="content two-col isMobile">
                <div class="inner-content">

                    <div v-for="(d, index) in content.stepProcess" :key="'accordion'+index"
                        class="accordion-item">
                        <div class="clicker" @click="toggle">
                            <h2>{{index+1}}. {{d.label}}</h2><span class="accordion-icon"></span>
                        </div>
                        <div>
                            <div class="hidden-content">
                                <h2>{{ d.title }}</h2>
                                <p v-html="d.description"></p>
                                <div v-for="(b, index) in d.body" :key="'element' + index" 
                                    :class="['body', b.titleClass]">
                                    <div class="detail">{{ b.detail }}</div>
                                    <h4 class="title">{{ b.title }}</h4>
                                    <div v-html="b.description"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <button class="tohide" id="back-to-menu" @click="backtomenu()" tabindex="0" aria-label="back to internal menu">
                    back to menu
                </button>
                <button class="tohide" id="back-to-nav" @click="backtonav()" tabindex="0" aria-label="back to navbar">
                    back navbar
                </button>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'dwp-act-license',
    props:{
        langData: String
    },
    data: () => {
        return {
            isActive: 0 
        }
    },
    methods: {
        backtonav() {
            console.log(document.getElementById('navigazione'))
            document.getElementById('navigazione').focus();
        },
        backtomenu() {
            document.getElementById('menu').focus();
        },
        openSection(id){
            //document.getElementById('btn'+this.isActive).setAttribute('aria-expanded', 'false');
            this.isActive = id
            //document.getElementById('btn'+id).setAttribute('aria-expanded', 'true');
            this.changeTabs(event)
            setTimeout(() => {
                //document.getElementById('section'+id)
                document.getElementById('btn'+id).setAttribute('tabindex', '-1')
                document.querySelectorAll('[role=tab]').forEach(tt => tt.setAttribute('tabindex', -1))
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
        },
        changeTabs(event) {
            const target = event.target;
            
            const parent = target.parentNode;
            const grandparent = parent.parentNode;

            // Remove all current selected tabs
            parent
                .querySelectorAll('[aria-selected="true"]')
                .forEach(t => t.setAttribute("aria-selected", false));

            // Set this tab as selected
            target.setAttribute("aria-selected", true);

            // Hide all tab panels
            grandparent
                .querySelectorAll('[role="tabpanel"]')
                .forEach(p => p.setAttribute("hidden", true));

            // Show the selected panel
            setTimeout(() => {
                grandparent.parentNode
                    .querySelector(`#${target.getAttribute("aria-controls")}`)
                    .removeAttribute("hidden");

                    grandparent.parentNode
                    .querySelector(`#${target.getAttribute("aria-controls")}`)
                    .focus({preventScroll: true});
            }, 100);

            const tabs = document.querySelectorAll('[role="tab"]');
            tabs.forEach(tab => tab.setAttribute("tabindex", -1))
            
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
        //document.getElementsByClassName('main-content')[0].focus({preventScroll: true});

        //window.addEventListener("DOMContentLoaded", () => {
            const tabs = document.querySelectorAll('[role="tab"]');
            const tabList = document.querySelector('[role="tablist"]');

            // Add a click event handler to each tab
            /*tabs.forEach(tab => {
                tab.addEventListener("click", this.changeTabs);
            });*/

            // Enable arrow navigation between tabs in the tab list
            let tabFocus = -1;

            tabList.addEventListener("keydown", e => {
                // Move right
                if (e.keyCode === 40 || e.keyCode === 38) {
                    e.preventDefault()
                    if (e.keyCode === 40) {
                        tabFocus++;
                        // If we're at the end, go to the start
                        if (tabFocus >= tabs.length) {
                        tabFocus = 0;
                        }
                        // Move left
                    } else if (e.keyCode === 38) {
                        tabFocus--;
                        // If we're at the start, move to the end
                        if (tabFocus < 0) {
                        tabFocus = tabs.length - 1;
                        }
                    }

                    tabs[tabFocus].setAttribute("tabindex", -1);
                    tabs[tabFocus].focus({preventScroll: true});
                }
            });
        //});
    },
    watch: {
        route() {
            this.isActive = 0
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
