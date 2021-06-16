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
	methods:{
		checkIfMobile(){
			if(window.innerWidth<1024){
				this.$store.commit('SET_DEVICE', true)
			} else {
				this.$store.commit('SET_DEVICE', false)
			}
		},
		fetchData(){
			fetch("./data.json",)
				.then(response=>{
					return response.json()
				})
				.then(json=>{
					this.$store.commit('SET_DATA', json)
				})
				.catch(function(error) {  
					console.log('Request failed', error)  
				});
			},
	},
	mounted(){
	  this.fetchData()
	  this.checkIfMobile()
	},
}
</script>

<style>
</style>
