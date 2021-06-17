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

html,
body, #app {
	padding: 0;
	margin: 0;
	height: 100%;
	width: 100%;
}
@import "https://js.arcgis.com/4.19/esri/themes/light/main.css";

</style>
