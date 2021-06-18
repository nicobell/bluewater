<template>
  <div id="app" >
	<div :class="[{'is-mobile': isMobile}]" v-if="this.dataLoaded">
		<my-header></my-header>
		<Navigation></Navigation>
		<router-view ></router-view>
	</div>
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
			fetch("/data.json")
				.then(response=>{
					return response.json()
				})
				.then(json=>{
					this.$store.commit('SET_DATA', json)
					this.data = this.$store.state.data
					this.dataLoaded = true
				})
				.catch(function(error) {  
					console.log('Request failed', error)  
				});
		},
		refreshPage () {
			this.$route.name !== 'home-page' && this.$router.push(JSON.parse(localStorage.getItem('LS_ROUTE_KEY')))
		}
	},
	mounted(){
		this.checkIfMobile()
		this.fetchData()
		console.log('mounted app', );
		this.refreshPage()
	},
}
</script>

<style>
</style>
