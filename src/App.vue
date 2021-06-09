<template>
  <div id="app">
    <my-header></my-header>
	<Navigation></Navigation>
    <router-view :langData="lang"></router-view>
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
			lang:""
		}
  	},
	mounted(){
		if(navigator.language || navigator.userLanguage == "en-US") {
			this.lang = "en"
		} else {
			this.lang = "it"
		}
		console.log('The language is: ',this.lang);
	},
	watch: {
		$route(to,from){
			console.log('watch route change');
			if(this.$route.params.lang == "en"){
				this.lang = "en"
			} else {
				this.lang = "it"
			}
		}
	}, 
}
</script>

<style>
</style>
