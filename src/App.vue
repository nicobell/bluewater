<template>
  <div id="app">
    <my-header></my-header>
	<Navigation></Navigation>
    <router-view></router-view>
  </div>
</template>
<script>
import Navigation from './components/Navigation.vue';
import MyHeader from './components/MyHeader.vue';

export default {
	name: 'home',
	components: {
    	MyHeader,
		Navigation
  	},
	data:()=> {
		return{
		}
  	},
	mounted(){
      if(window.innerWidth<1024){
        this.$store.commit('SET_DEVICE', true)
      } else {
		  this.$store.commit('SET_DEVICE', false)
	  }
	},
}
</script>

<style>
</style>
