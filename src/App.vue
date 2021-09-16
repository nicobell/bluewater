<template>
  <div id="app">
	<div :class="{'is-mobile': isMobile, 'obscure': spallaState}" v-if="this.dataLoaded">
		<my-header></my-header>
		<Navigation></Navigation>
		<router-view ></router-view>
	</div>
  </div>
</template>
<script>
import Navigation from './components/Navigation.vue';
import MyHeader from './components/MyHeader.vue';
import path from 'path';

export default {
	name: 'App',
	components: {
    	MyHeader,
		Navigation
  	},
	computed: {
		langDefault() {
			return this.$store.getters.langDefault
		},
		spallaState() {
			return this.$store.state.obscure
		}
	},
	data: () => {
		return {
			dataLoaded: false,
			isMobile:null,
		}
  	},
	methods:{
		checkIfMobile(){
			if(window.innerWidth<1024){
				this.isMobile=true
			} else {
				this.isMobile=false
			}
		},
		fetchData(){
			console.log(path.join(__dirname, 'data.json'))
			fetch(path.join(__dirname, 'data.json'))
				.then(response=>{
					return response.json()
				})
				.then(json=>{
					this.$store.commit('SET_DATA', json)
					this.dataLoaded = true
					// Add Dynamic Routing
					this.$router.addRoute({
						path: '/',
						redirect: this.langDefault
					})
				})
				.catch(function(error) {  
					console.log('Request failed', error)  
				});
		},
	},
	mounted(){
		this.checkIfMobile()
		this.fetchData()
		document.getElementById('app').addEventListener("keydown", e => {
			//console.log(e.keyCode)
			if(e.keyCode===78) {
				document.getElementById('navigazione').focus({preventScroll: true})
			}
		})
		//this.$router.push('/')
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
	position: relative;
}

/*.obscure::before {
	content: '';
	background: rgba(0, 0, 0, .5);
	width: 100vw;
	height: calc(110vh +  84px);
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 10;
}*/

@import "https://js.arcgis.com/4.19/esri/themes/light/main.css";

</style>
