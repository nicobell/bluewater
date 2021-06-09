<template>
    <nav>
        <ul>
            <li>
                Location            
            </li>
            <li>
                Project description            
            </li>
            <li>
                Nepa process 
            </li>
            <li>
                Schedule        
            </li>
            <li>
                Updates            
            </li>
            <li>
                Your Opinion            
            </li>
            <li>
                contacts        
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
        background-color: blue;
        left: 0;
        height: 100%;
        width: 50px;
    }
</style>
