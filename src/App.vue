<template>
  <div id="app" >
	<div :class="[{'is-mobile': isMobile}]">
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
			isMobile:null,
		}
  	},
	watch: {
		langData() {
		this.loadData()
		},
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
				})
				.catch(function(error) {  
					console.log('Request failed', error)  
				});
			},
	},
	mounted(){
	  this.checkIfMobile()
	  this.fetchData()
	},
}
</script>

<style>
</style>
