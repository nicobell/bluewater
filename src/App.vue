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

	},
	watch: {
		/*
		$route(to,from){
			console.log('watch route change');
			if(this.$route.params.lang == "en"){
				this.lang = "en"
			} else {
				this.lang = "it"
			}
		}
		*/
	}, 
}
</script>

<style>
</style>
