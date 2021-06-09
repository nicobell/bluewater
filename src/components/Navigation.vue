<template>
    <nav>
        <ul>
            <li>
                <span class="icon"></span><router-link to="/">Location</router-link>
            </li>
            <li>
                <span class="icon"></span><router-link :to="'/' + this.$route.params.lang + '/project-description'">Project description</router-link>            
            </li>
            <li>
                <span class="icon"></span><router-link to="/">Nepa process</router-link> 
            </li>
            <li>
                <span class="icon"></span><router-link to="/">Schedule</router-link>
            </li>
            <li>
                <span class="icon"></span><router-link to="/">Updates</router-link>
            </li>
            <li>
                <span class="icon"></span><router-link to="/">Your Opinion</router-link>            
            </li>
            <li>
                <span class="icon"></span><router-link to="/">contacts</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'navigation',
  props: {
    msg: String
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
                background-image: url("../assets/icon-menu-updates.svg");
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
