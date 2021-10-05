<template>
    <nav ref="menu" :class="[{show: isActive}]" id="navigazione" role="navigation" tabindex="-1" aria-label="main menu">

        <div class="btn" @click="isActive = !isActive">
        </div>

        <ul @click="isActive = !isActive" tabindex="-1">
            <li role="none" aria-hidden>
                <button class="tohide" id="skipbutton" role="menuitem" tabindex="0" @click="skip()">
                    skip to main content
                </button>
            </li>

            <li role="none" aria-hidden>
                <router-link id="menuitem1" role="menuitem" tabindex="0"
                    aria-labelledby="menulabel1" :aria-current="this.$route.params.pagetitle=='location' ? 'page' : null"
                    :to="{
                        name: 'ProxyRouter',  
                        params: { 
                            lang: this.lang, 
                            tabtitle: (this.lang=='es' ? 'Ubicacion' : 'Location') ,
                            pagetitle: (this.lang=='es' ? 'ubicacion' : 'location') 
                        }
                    }">
                    <span class="icon map"></span><span id="menulabel1" class="label">{{content.menu.menuLabel1}}</span>
                </router-link>
            </li>
            
            <li role="none" aria-hidden>
                <router-link id="menuitem2" role="menuitem" tabindex="0"
                    aria-labelledby="menulabel2" :aria-current="this.$route.params.pagetitle=='project-description' ? 'page' : null"
                    :to="{
                        name: 'ProxyRouter',  
                        params: { 
                            lang: this.lang, 
                            tabtitle: (this.lang=='es' ? 'Descripcion del Proyecto' : 'Project Description') ,
                            pagetitle: (this.lang=='es' ? 'descripcion-de-proyecto' : 'project-description') 
                        }
                    }">
                        <span class="icon description"></span><span id="menulabel2" class="label">{{content.menu.menuLabel2}}</span>
                    </router-link>
            </li>
            
            <li role="none">
                <router-link id="menuitem3" role="menuitem" tabindex="0"
                    aria-label="deepwater port act license" :aria-current="this.$route.params.pagetitle=='dwp-act-license' ? 'page' : null"
                    :to="{
                        name: 'ProxyRouter',  
                        params: { 
                            lang: this.lang, 
                            tabtitle: (this.lang=='es' ? 'Acta y Licencia DWP' : 'DWP Act & License'),
                            pagetitle: (this.lang=='es' ? 'acta-licencia-dwp' : 'dwp-act-license') 
                        }
                    }">
                        <span class="icon license"></span><span id="menulabel3" class="label">{{content.menu.menuLabel4}}</span>
                    </router-link>
            </li>
            
            <li role="none">
                <router-link id="menuitem4" role="menuitem" tabindex="0"
                    aria-labelledby="menulabel4" :aria-current="this.$route.params.pagetitle=='nepa-process' ? 'page' : null"
                    :to="{
                        name: 'ProxyRouter',  
                        params: { 
                            lang: this.lang, 
                            tabtitle: (this.lang=='es' ? 'Proceso NEPA' : 'NEPA Process'),
                            pagetitle: (this.lang=='es' ? 'proceso-nepa' : 'nepa-process') 
                        }
                    }">
                        <span class="icon process"></span><span id="menulabel4" class="label">{{content.menu.menuLabel3}}</span>
                    </router-link>
            </li>
            
            
            <li role="none">
                <router-link id="menuitem5" role="menuitem" tabindex="0"
                    aria-labelledby="menulabel5" :aria-current="this.$route.params.pagetitle=='nepa-process-schedule' ? 'page' : null"
                    :to="{
                        name: 'ProxyRouter',  
                        params: { 
                            lang: this.lang, 
                            tabtitle: (this.lang=='es' ? 'Calendario' : 'Schedule') ,
                            pagetitle: (this.lang=='es' ? 'calendario-proceso-nepa' : 'nepa-process-schedule') 
                        }
                    }">
                        <span class="icon schedule"></span><span id="menulabel5" class="label">{{content.menu.menuLabel5}}</span>
                    </router-link>
            </li>
            
            <li role="none">
                <router-link id="menuitem6" role="menuitem" tabindex="0"
                    aria-labelledby="menulabel6" :aria-current="this.$route.params.pagetitle=='updates' ? 'page' : null"
                    :to="{
                        name: 'ProxyRouter',
                        params: { 
                            lang: this.lang, 
                            tabtitle: (this.lang=='es' ? 'Actualizaciones' : 'Updates'),
                            pagetitle: (this.lang=='es' ? 'actualizaciones' : 'updates') 
                        }
                    }">
                        <span class="icon updates"></span><span id="menulabel6" class="label">{{content.menu.menuLabel6}}</span>
                    </router-link>
            </li>
            
            <!--<router-link  :to="'/' + lang+ '/' +'contacts'" >-->
            
            <li role="none">
                <router-link id="menuitem7" role="menuitem" tabindex="0"
                    aria-labelledby="menulabel7" :aria-current="this.$route.params.pagetitle=='comments' ? 'page' : null"
                    :to="{
                        name: 'ProxyRouter',  
                        params: { 
                            lang: this.lang, 
                            tabtitle: (this.lang=='es' ? 'Comentarios' : 'Comments') ,
                            pagetitle: (this.lang=='es' ? 'comentarios' : 'comments') 
                        }
                    }">
                        <span class="icon opinion"></span><span id="menulabel7" class="label">{{content.menu.menuLabel7}}</span>
                </router-link>
            </li>
            
            <li role="none">
                <router-link id="menuitem8" role="menuitem" tabindex="0"
                aria-labelledby="menulabel8" :aria-current="this.$route.params.pagetitle=='contacts' ? 'page' : null"
                :to="{
                    name: 'ProxyRouter',  
                    params: { 
                        lang: this.lang, 
                        tabtitle: (this.lang=='es' ? 'Contactos' : 'Contacts') ,
                        pagetitle: (this.lang=='es' ? 'contactos' : 'contacts') 
                    }
                }">
                    <span class="icon contacts"></span><span id="menulabel8" class="label">{{content.menu.menuLabel8}}</span>
                </router-link>
            </li>
            

            <div role="menuitem" class="lang-switch" id="menuitem9" tabindex="-1" aria-label="change language">
                <p>
                    <button id="lang1" aria-label="change language to spanish" tabindex="0"
                    @click="changeLang('es')"
                    :class="[this.$route.params.lang == 'es' ? 'active' : '', 'language']"
                    >
                        Es
                    </button> /
                    <button id="lang2" aria-label="change language to english" tabindex="0"
                    @click="changeLang('en')"
                    :class="[this.$route.params.lang == 'en' ? 'active' : '', 'language']"
                    >
                        En
                    </button>
                </p>
            </div>
        </ul>
        
    </nav>
</template>

<script>
    export default {
        name: 'navigation',
        data() {
            return {
                isActive: null,
                tabFocus: 0,
                componentsRoute: {
                    "en": {
                        "location": "ubicacion",
                        "project-description": "descripcion-de-proyecto",
                        "nepa-process-schedule": "calendario-proceso-nepa",
                        "nepa-process": "proceso-nepa",
                        "dwp-act-license": "acta-licencia-dwp",
                        "updates": "actualizaciones",
                        "comments": "comentarios",
                        "contacts": "contactos",
                    },
                    "es": {
                        "ubicacion": "location",
                        "descripcion-de-proyecto": "project-description",
                        "calendario-proceso-nepa": "nepa-process-schedule",
                        "proceso-nepa": "nepa-process",
                        "acta-licencia-dwp" : "dwp-act-license",
                        "actualizaciones": "updates",
                        "comentarios": "comments",
                        "contactos": "contacts",
                    },
                },
            }
        },
        computed:{
            lang () {
              return this.$store.state.lang
            },
            content () {
              return this.$store.state.data[this.lang]
            },
            route() {
                return this.$route
            }
        },
        methods: {
            skip() {
                //console.log(document.getElementById('contenuto'))
                setTimeout(() => {
                    document.getElementById('contenuto').focus({preventScroll: true})    
                }, 100);
            },
            i18nRoute (lang) {
                return this.$store.state.data[lang]['route']
            },
            getKeyByValue(object, value) {
              return Object.keys(object).find(key => object[key] === value);
            },
            changeLang(lang) {
                // stessa lingua
                if (lang === this.$route.params.lang) return
                // cambio lingua
                this.$store.commit('SET_LANG', lang)
                if (this.$route.params.pagetitle) {
                  const keyRout = this.getKeyByValue(this.i18nRoute(this.$route.params.lang), this.$route.params.pagetitle)
                  this.$router.push({ name: 'ProxyRouter', params: { 
                    lang: lang,
                    pagetitle: this.i18nRoute(lang)[keyRout]
                  }})
                } else {
                  this.$router.push({path: `/${lang}`})
                }
            },
        },
        mounted() {
            window.addEventListener("keydown", e => {
                
                //!! CONFLITTO CON CAMPO DI RICERCA !!
                if(e.keyCode===78) {
                    if(document.activeElement.parentNode.getAttribute('role')!='search') {
                        document.getElementById('navigazione').focus({preventScroll: true})
                        this.isActive = true
                    }
                }

                if(e.keyCode===27) {
                    this.isActive = false
                }
            })

            const tabs = document.querySelectorAll('[role="menuitem"]');
            tabs.forEach(t => t.addEventListener('click', () => {
                setTimeout(() => {
                    document.getElementById('contenuto').focus({preventScroll: true})    
                }, 200);
            }))
            const tabList = document.querySelector('#navigazione');

            tabList.addEventListener("keydown", e => {
                //console.log(document.activeElement.getAttribute('id'))
                this.tabFocus = -1
                switch(document.activeElement.getAttribute('id')) {
                    case 'navigazione':
                    case 'skipbutton' :
                        this.tabFocus = 0;
                        break;
                    case 'lang-switch':
                    case 'lang1':
                    case 'lang2':
                        this.tabFocus = tabs.length;
                        break;
                    default:
                        this.tabFocus = document.activeElement.getAttribute('id')[8]
                        break;
                }
                // Move right
                if (e.keyCode === 40 || e.keyCode === 38) {
                    e.preventDefault()
                    //if(this.tabFocus!=0) tabs[this.tabFocus].setAttribute("tabindex", -1);
                    if (e.keyCode === 40) {
                        this.tabFocus++;
                        // If we're at the end, go to the start
                        if (this.tabFocus >= tabs.length) {
                            this.tabFocus = 1;
                        }
                        // Move left
                    } else if (e.keyCode === 38) {
                        e.preventDefault()
                        this.tabFocus--;
                        // If we're at the start, move to the end
                        if (this.tabFocus < 1) {
                            this.tabFocus = tabs.length - 1;
                        }
                    }

                    //document.getElementById('menuitem'+this.tabFocus).focus({preventScroll: true});
                    //tabs[this.tabFocus].setAttribute("tabindex", 0);
                    if(this.tabFocus!=-1)
                        tabs[this.tabFocus].focus();
                }
            });
        },
        watch: {
            route() {
                setTimeout(() => {
                    document.getElementById('contenuto').focus({preventScroll: true})    
                }, 200);
            }
        }
        /*updated() {
            setTimeout(() => {
                document.getElementById('contenuto').focus()    
            }, 50);
        }*/
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lang-switch {
    position: absolute;
    bottom: 0;
    background: rgba(255, 255, 255, 0.048);
    height: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 60px;

    &:hover, &:focus {
        background: rgba(255, 255, 255, 0.096);
    }

    p {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.253);
    }

    button {
        color: rgba(255, 255, 255, 0.63);
    }

    p button.active {
        font-weight: 600;
        color: #fff;
    }

    button:hover, button:focus {
        text-decoration: underline;
    }

}

nav {
    position: fixed;
    background-color: #1C2332;
    left: 0;
    height: calc(100% - 84px);
    width: 60px;
    overflow: hidden;
    bottom: 0;
    display: flex;
    align-items: center;
    z-index: 15;
    transition: 0.3s ease;

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
    }

    li {
        color: #fff;
        list-style: none;
        white-space: nowrap;
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        width: 100%;

        &:before {
            content: "";
            position: absolute;
            width: 4px;
            transform: translateX(-4px);
            height: 100%;
            background-color: #fff;
        }

        .label {
            opacity: 0;
            transform: translateY(-30px);
        }

        .icon {
            display: block;
            position: relative;
            min-width: 60px;
            width: 60px;
            height: 60px;
        }

        .icon.map {
            background-image: url("../assets/icon-menu-map.svg");
        }

        .icon.description {
            background-image: url("../assets/icon-menu-description.svg");
        }

        .icon.process {
            background-image: url("../assets/icon-menu-process.svg");
        }

        .icon.license {
            background-image: url("../assets/icon-menu-license.svg");
        }

        .icon.schedule {
            background-image: url("../assets/icon-menu-schedule.svg");
        }

        .icon.updates {
            background-image: url("../assets/icon-menu-updates.svg");
        }

        .icon.opinion {
            background-image: url("../assets/icon-menu-opinion.svg");
        }

        .icon.contacts {
            background-image: url("../assets/icon-menu-contacts.svg");
        }

        .label {
            text-decoration: none;
            color: #B3C5DF;
            padding-left: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;

        }

        a {
            text-decoration: none;
            color: #fff;
            white-space: nowrap;
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            width: 100%;
        }
    }



}

//animations
@media (min-width: 1024px) {
    nav {
        &:hover, &:focus-within {
            transition: 0.3s ease;
            width: 400px;
        }

        li:hover, li:focus-within {
            background-color: lighten(#1C2332, 10%);

            &:before {
                transform: translateX(0px);
                transition: 0.3s ease;
            }

            .label {
                color: #fff;
                transition-delay: color 0.3s;
            }
        }

        //nav
        &:hover, &:focus-within {
            .label {
                opacity: 1;
                transform: translateY(0);
                transition: 0.3s ease;

            }

            @for $i from 1 to 10 {
                a:nth-child(#{$i}) .label {
                    transition-delay: $i * 0.02s;
                }
            }
        }

    }


}

@media (max-width: 1024px) {
    .lang-switch {
        position: relative;
        background: rgba(255, 255, 255, 0.048);
        margin-top: 20px;
        width: 100%;
    }

    nav {
        width: 100%;
        height: 0%;
        top: 85px;
        right: 0;
        display: block;
        left: auto;

        ul {
            opacity: 0;
            pointer-events: none;
        }

        &.show {
            height: 100%;
            ul {
                opacity: 1;
                pointer-events: auto;
            }
            .btn {
                background-image: url("../assets/icon-hamburger-close.svg");
            }

        }

        li .label {
            opacity: 1;
            transform: none;
        }

        .btn {
            position: fixed;
            background-color: #1C2332;
            width: 60px;
            height: 60px;
            top: 85px;
            right: 0;
            left: auto;
            background-size: 30px;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url("../assets/icon-hamburger.svg");
            border-bottom-left-radius: 30px;
        }
    }

}

@media (max-width: 768px) {
    nav {
        top: 65px;

        .btn {
            top: 65px;
        }

        .label {
            display: block;
            height: 100%;
            opacity: 1;
            padding: 20px 0px 20px 20px;
        }
    }
}

@media (max-width: 480px) {
    nav .label {
        padding: 14px 0px 14px 0px;
    }

    nav ul {
        margin-top: 40px;
    }

    nav li .icon {
        height: 54px;
    }

    .lang-switch {
        position: relative;
        background: rgba(255, 255, 255, 0.048);
        margin-top: 8px;
    }
}

.language {
    background: transparent;
    color: #fff;
    font-size: .95em;
    padding: 0;
}
</style>