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
			fetch("./data.json")
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
	},
	mounted(){
	  this.checkIfMobile()
	  this.fetchData()
	  console.log('mounted app');
	},
}
</script>

<style>
</style>
