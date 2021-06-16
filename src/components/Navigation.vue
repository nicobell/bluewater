<template>
    <nav ref="menu" :class="[{show: isActive && isMobile}]">
        <div class="btn" @click="isActive = !isActive">
        </div>
        <ul @click="isActive = !isActive">
            <router-link :to="{name: 'Home'}">
                <li>
                    <span class="icon map"></span><span class="label">Location</span>
            </li></router-link>
            <router-link :to="{name:'project-description'}">
                <li>
                    <span class="icon description"></span><span class="label">Project description</span>
           
            </li> </router-link>
            <router-link :to="{name:'nepa-process'}">
                <li>
                    <span class="icon process"></span><span class="label">Nepa process</span>
            </li> </router-link>
            <router-link :to="{name: 'nepa-process-schedule'}">
                <li>
                    <span class="icon schedule"></span><span class="label">Schedule</span>
            </li> </router-link>
            <router-link :to="{name: 'updates'}">
                <li>
                    <span class="icon updates"></span><span class="label">Updates</span>
            </li> </router-link>
            <router-link :to="{name: 'comments'}">
                <li>
                    <span class="icon opinion"></span><span class="label">Your Opinion</span>
            </li> </router-link>
            <router-link :to="{name: 'contacts'}">
                <li>
                    <span class="icon contacts"></span><span class="label">contacts</span>
            </li> </router-link>
        </ul>
        <div class="lang-switch">
            <p @click="changeLang" :class="this.$route.params.lang == 'es' ? 'es' : 'en'">
                <a>Es</a> / <a>En</a>
            </p>
      </div>
    </nav>
</template>

<script>
    export default {
        name: 'navigation',
        data() {
            return {
                isActive: null,
                isMobile:null,
            }
        },
        props: {
            msg: String
        },
        methods: {
            changeLang() {
                console.log('this.$route',);

                if(this.$route.params.lang == "es"){
                    
                    this.$router.push(`/en/`+this.$route.name)
                    console.log(this.$store)
                    this.$store.commit('SET_LANG', 'en')
                } else {
                    this.$router.push(`/es/`+this.$route.name)
                    this.$store.commit('SET_LANG', 'es')
                }
		    },
        },
        mounted(){
            this.isMobile = this.$store.state.isMobile
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
    &:hover{
        background: rgba(255, 255, 255, 0.096);
    }
    
    p{
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.253);
    }
    a {
        color: rgba(255, 255, 255, 0.63);
    }
    p.active a {
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
        a {
            text-decoration: none;
        }

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
           .lang-switch{
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

            &.show {
                height: 100%;

                .btn {
                    background-image: url("../assets/icon-hamburger-close.svg");
                }

            }

            a:first-child {
                li{
                    margin-top: 60px;
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
        nav li .icon{
            height: 54px;
        }
        .lang-switch {
            position: relative;
            background: rgba(255, 255, 255, 0.048);
            margin-top: 8px;
        }
    }
</style>