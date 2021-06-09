<template>
    <nav>
        <ul>
            <li>
                <span class="icon map"></span><router-link to="/">Location</router-link>
            </li>
            <li>
                <span class="icon description"></span><router-link to="/project-description">Project description</router-link>           
            </li>
            <li>
                <span class="icon process"></span> <router-link to="/">Nepa process</router-link> 
            </li>
            <li>
                <span class="icon schedule"></span><router-link to="/">Schedule</router-link>
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
        height: 100%;
        width: 60px;
        overflow: hidden;
        display: flex;
        align-items: center;
        z-index: 9;
        transition: 0.3s ease;
        &:hover {
            transition: 0.3s ease;
            width: 400px;
        }
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
                text-transform: uppercase;
            }
        }
        li:hover {
            background-color: lighten(#1C2332,10%);
        }

    }
</style>
