<template>
    <nav ref="menu" :class="[{show: isActive}]">

        <div class="btn" @click="isActive = !isActive">
        </div>

        <ul @click="isActive = !isActive" role="navigation" aria-label="main menu">

            <li role="none" aria-hidden>
                <router-link role="menuitem" tabindex="0"
                    aria-labelledby="menulabel1"
                    :to="{name: 'ProxyRouter',  params: { 
                    lang: this.lang, 
                    pagetitle: (this.lang=='es' ? 'localization' : 'location') 
                    }}">
                    <span class="icon map"></span><span id="menulabel1" class="label">{{content.menu.menuLabel1}}</span>
                </router-link>
            </li>
            
            <li role="none" aria-hidden>
                <router-link role="menuitem" tabindex="-1"
                    aria-labelledby="menulabel2"
                    :to="{name: 'ProxyRouter',  params: { 
                    lang: this.lang, 
                    pagetitle: (this.lang=='es' ? 'descripcion-de-proyecto' : 'project-description') 
                    }}" >
                        <span class="icon description"></span><span id="menulabel2" class="label">{{content.menu.menuLabel2}}</span>
                    </router-link>
            </li>
            
            <li role="none">
                <router-link role="menuitem" tabindex="-1"
                    aria-label="deepwater port act license"
                    :to="{name: 'ProxyRouter',  params: { 
                    lang: this.lang, 
                    pagetitle: (this.lang=='es' ? 'ley-licencia-dwp' : 'dwp-act-license') 
                    }}">
                        <span class="icon license"></span><span id="menulabel3" class="label">{{content.menu.menuLabel4}}</span>
                    </router-link>
            </li>
            
            <li role="none">
                <router-link role="menuitem" tabindex="-1"
                    aria-labelledby="menulabel4"
                    :to="{name: 'ProxyRouter',  params: { 
                    lang: this.lang, 
                    pagetitle: (this.lang=='es' ? 'proceso-nepa' : 'nepa-process') 
                    }}" >
                        <span class="icon process"></span><span id="menulabel4" class="label">{{content.menu.menuLabel3}}</span>
                    </router-link>
            </li>
            
            
            <li role="none">
                <router-link role="menuitem" tabindex="-1"
                    aria-labelledby="menulabel5"
                    :to="{name: 'ProxyRouter',  params: { 
                    lang: this.lang, 
                    pagetitle: (this.lang=='es' ? 'cronograma-de-proceso-nepa' : 'nepa-process-schedule') 
                    }}" >
                        <span class="icon schedule"></span><span id="menulabel5" class="label">{{content.menu.menuLabel5}}</span>
                    </router-link>
            </li>
            
            <li role="none">
                <router-link role="menuitem" tabindex="-1"
                    aria-labelledby="menulabel6"
                    :to="{name: 'ProxyRouter',  params: { 
                    lang: this.lang, 
                    pagetitle: (this.lang=='es' ? 'actulizationes' : 'updates') 
                    }}" >
                        <span class="icon updates"></span><span id="menulabel6" class="label">{{content.menu.menuLabel6}}</span>
                    </router-link>
            </li>
            
            <!--<router-link  :to="'/' + lang+ '/' +'contacts'" >-->
            
            <li role="none">
                <router-link role="menuitem" tabindex="-1"
                    aria-labelledby="menulabel7"
                    :to="{name: 'ProxyRouter',  params: { 
                    lang: this.lang, 
                    pagetitle: (this.lang=='es' ? 'comentarios' : 'comments') 
                    }}">
                        <span class="icon opinion"></span><span id="menulabel7" class="label">{{content.menu.menuLabel7}}</span>
                </router-link>
            </li>
            
            <li role="none">
                <router-link role="menuitem" tabindex="-1"
                aria-labelledby="menulabel8"
                :to="{name: 'ProxyRouter',  params: { 
                lang: this.lang, 
                pagetitle: (this.lang=='es' ? 'contactos' : 'contacts') 
                }}">
                    <span class="icon contacts"></span><span id="menulabel8" class="label">{{content.menu.menuLabel8}}</span>
                </router-link>
            </li>
            
        </ul>
        <!--<div class="lang-switch">
            <p>
                <a
                  @click="changeLang('es')"
                  :class="this.$route.params.lang == 'es' ? 'active' : ''"
                >
                    Es
                </a> / 
                <a
                  @click="changeLang('en')"
                  :class="this.$route.params.lang == 'en' ? 'active' : ''"
                >
                    En
                </a>
            </p>
        </div>-->
    </nav>
</template>

<script>
    export default {
        name: 'navigation',
        data() {
            return {
                isActive: null,
                componentsRoute: {
                    "en": {
                        "location": "localization",
                        "project-description": "descripcion-de-proyecto",
                        "nepa-process-schedule": "cronograma-de-proceso-nepa",
                        "nepa-process": "proceso-nepa",
                        "dwp-act-license": "ley-licencia-dwp",
                        "updates": "actulizationes",
                        "comments": "comentarios",
                        "contacts": "contactos",
                    },
                    "es": {
                        "localization": "location",
                        "descripcion-de-proyecto": "project-description",
                        "cronograma-de-proceso-nepa": "nepa-process-schedule",
                        "proceso-nepa": "nepa-process",
                        "ley-licencia-dwp" : "dwp-act-license",
                        "actulizationes": "updates",
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
        },
        methods: {
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
        }
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

    &:hover {
        background: rgba(255, 255, 255, 0.096);
    }

    p {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.253);
    }

    a {
        color: rgba(255, 255, 255, 0.63);
    }

    p a.active {
        font-weight: 600;
        color: #fff;
    }

    a:hover {
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
            background-image: url("../assets/icon-menu-license-01.svg");
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
        }
    }



}

//animations
@media (min-width: 1024px) {
    nav {
        &:hover {
            transition: 0.3s ease;
            width: 400px;
        }

        li:hover {
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
        &:hover {
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

    nav li .icon {
        height: 54px;
    }

    .lang-switch {
        position: relative;
        background: rgba(255, 255, 255, 0.048);
        margin-top: 8px;
    }
}
</style>