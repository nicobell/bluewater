<template>
    <nav ref="menu" :class="[{show: isActive}]">
        <div class="btn" @click="isActive = !isActive">
        </div>
        <ul @click="isActive = !isActive">
            <li>
                <span class="icon map"></span><router-link to="/">Location</router-link>
            </li>
            <li>
                <span class="icon description"></span><router-link to="/project-description">Project description</router-link>           
            </li>
            <li>
                <span class="icon process"></span> <router-link to="/nepa-process">Nepa process</router-link> 
            </li>
            <li>
                <span class="icon schedule"></span><router-link to="/nepa-process-schedule">Schedule</router-link>
            </li>
            <li>
                <span class="icon updates"></span><router-link to="/">Updates</router-link>
            </li>
            <li>
                <span class="icon opinion"></span><router-link to="/comments">Your Opinion</router-link>            
            </li>
            <li>
                <span class="icon contacts"></span><router-link to="/">contacts</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'navigation',
  data(){
      return{
          isActive:null
      }
  },
  props: {
    msg: String
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    nav{
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
            margin:0;
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
            a {
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
            a {
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
    nav{
        &:hover {
            transition: 0.3s ease;
            width: 400px;
        }
        li:hover {
            background-color: lighten(#1C2332,10%);
            &:before {
                transform: translateX(0px);
                transition: 0.3s ease;
            }
            a {
                color: #fff;
                transition-delay: color 0.3s;
            }
        }
        //nav
        &:hover {
            a {
                opacity: 1;
                transform: translateY(0);
                transition: 0.3s ease;
               
            }
            @for $i from 1 to 10 {
                li:nth-child(#{$i}) a { transition-delay: $i * 0.02s; }
            }
        }

    }

}



@media (max-width: 1024px) {
    nav{
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
        
        li {
            &:first-child {
                margin-top: 60px;
            }
            a {
                opacity: 1;
                transform: none;
            }
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
            background-position:center ;
            background-repeat: no-repeat;
            background-image: url("../assets/icon-hamburger.svg");
        }
    }

}

@media (max-width: 768px) {
    nav{
        top: 65px;
        .btn {
            top: 65px;
        }
        a {
            display: block;
            height: 100%;
            padding: 20px 0px 20px 20px;
        }
    }
}
</style>
