<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
        <h1 class="title">{{content.title}}</h1>
        <div class="content two-col isDesktop active-section-1" ref="container" >
            <div class="inner-content-left">
                <div class="menu">

                    <div class="item-menu" @click="openSection(index+1)" v-for="(d, index) in content.stepProcess" :key="'label'+index">
                        <div class="num"> 0{{index+1}} </div>
                        <h2>{{d.title}}</h2>
                    </div>

                </div>
            </div>

            <div class="inner-content-right">
                <div :class="['item-content', 'item-content-'+(index+1)]" v-for="(d, index) in content.stepProcess" :key="'title'+index">
                    <h1> {{ d.title }} </h1>
                    <p v-html="d.description"></p>
                </div>
            </div>

        </div>
        <div class="content two-col isMobile">
            <div class="inner-content">

                <div class="accordion-item" @click="e => e.target.classList.toggle('active')"
                    v-for="(d, index) in content.stepProcess" :key="'accordion'+index">
                    <div>
                        <h2>{{index+1}}. {{d.title}}</h2><span class="accordion-icon"></span>
                    </div>
                    <div>
                        <p v-html="d.description"></p>
                    </div>
                </div>

            </div>
        </div>
        </div>
  </div>
</template>
<script>

export default {
    name: 'nepa-process',
    props:{
        langData: String
    },
    data:()=>{
        return{
            isActive: true
        }
    },
    methods:{
        openSection(id){
            this.$refs.container.className = 'content two-col isDesktop';
            this.$refs.container.classList.add("active-section-"+id)
        },
    },
    computed: {
        lang () {
            return this.$store.state.lang
        },
        content () {
            console.log(this.$store.state.data[this.lang].nepaProcess)
            return this.$store.state.data[this.lang].nepaProcess
        }
    },
    mounted() {
        console.log('visiting ' + this.$route.name)
        this.$store.commit('SET_LASTPAGE', this.$route.name)
    }
}
</script>

<style scoped lang="scss">
.inner-content-left {
    min-width: 240px;
}
.inner-content-right {
    border-left: 1px solid #70707036;
}

.item-menu {
    cursor: pointer;
}
.item-content {
    display: none;
}

.content h1 {
    color:#175B8F;
    font-size: 1.5rem;
    font-weight: 400;
}

.menu {
    .item-menu {
        display: flex;
        padding: 20px 0px;
        position: relative;
        &:before {
         background-color: #175b8f31;
            width: 2px;
            height: 23px;
            left: 26px;
            top: 80px;
            position: absolute;
            content: "";
        }
        &:last-child:before {
            display: none;
        }
    }
    .item-menu:hover {
        .num { 
            background-color: #175b8f31;
            transition: 0.3s ease;
            color:#175B8F;
            border: 2px solid #175b8f00;
        }
    }
    h2 {
        color: #9AABD1;
        font-size: 1.125rem;
        font-weight: 400;
        margin: 10px 20px ;
    }
    .num {
        transition: 0.3s ease;
        color:#175B8F;
        border: 2px solid #175b8f31;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        border-radius: 50px;
        align-items: center;
        font-size: 1rem;
        font-weight: 600;
    }
}

.active-section-2 .item-menu:nth-child(2),
.active-section-3 .item-menu:nth-child(3),
.active-section-4 .item-menu:nth-child(4),
.active-section-1 .item-menu:nth-child(1) {
    .num {
        background-color: #175B8F;
        color: #fff;
    }
    h2 {
        color: #175B8F;
    }
}


.active-section-1 .item-content:nth-child(1) {display: block;}
.active-section-2 .item-content:nth-child(2) {display: block;}
.active-section-3 .item-content:nth-child(3) {display: block;}
.active-section-4 .item-content:nth-child(4) {display: block;}




.accordion-item {
    padding: 30px 50px;
    border-radius: 7px;
    margin-bottom: 10px;
    background-color: #D2E9F7;
    *{
        pointer-events: none;
    }
    >div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    h2 {
        font-size: 1.5rem;
        font-weight: 400;
        margin: 10px 20px ;
        color: #175B8F;
        margin-left: 0px;
    }
    p{
        display: none;
    }
    .accordion-icon{
        background-color: #fff;
        color:#175B8F;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        border-radius: 50px;
        align-items: center;
        font-weight: 600;
        &:after {
            content: "+";
            font-size: 1.5rem;
        }
    }
}
.accordion-item.active{
    p{
        display: block;
    }
    .accordion-icon{
        &:after {
            content: "-";
        }
    }
}
@media(max-width:1024px){
    .content.isMobile{
        padding: 0;
    }
}
@media(max-width:768px){
    .accordion-item {
        padding: 30px 30px;
        h2 {
            font-size: 1.25rem;
        }
    }
}
</style>
