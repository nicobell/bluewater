<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">Nepa process</h1>
      <div class="content two-col isDesktop active-section-1" ref="container" >
        <div class="inner-content-left">
            <div class="menu">
                <div class="item-menu" @click="openSection(1)">
                    <div class="num">
                        01
                    </div>
                    <h2>What is nepa?</h2>
                </div>
                <div class="item-menu" @click="openSection(2)">
                    <div class="num">
                        01
                    </div>
                    <h2>Public scoping</h2>
                </div>
                <div class="item-menu" @click="openSection(3)">
                    <div class="num">
                        02
                    </div>
                    <h2>Prepare draft eis</h2>
                </div>
                <div class="item-menu" @click="openSection(4)">
                    <div class="num">
                        03
                    </div>
                    <h2>Prepare final eis</h2>
                </div>
            </div>
        </div>
        <div class="inner-content-right">
            <div class="item-content item-content-1">
                <h1>
                    What is nepa?
                </h1>
                <p>
                    Bluewater is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure.
                </p>
            </div>
            <div class="item-content item-content-2">
                <h1>
                    What is nepa?
                </h1>
                <p>
                    adsasd is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure.
                </p>
            </div>
            <div class="item-content item-content-3">
                <h1>
                    What is nepa?
                </h1>
                <p>
                    dddddd is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure.
                </p>
            </div>
            <div class="item-content item-content-4">
                <h1>
                    What is nepa?
                </h1>
                <p>
                    Bluewatder is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construction of a deepwater port, approximately 56.18 statute miles of pipeline infrastructure.
                </p>
            </div>
        </div>
      </div>
      <div class="content two-col isMobile"  >
        <div class="inner-content" >
            <div class="accordion-item" @click="e => e.target.classList.toggle('active')">
                <div>
                    <h2>1. What is nepa?</h2><span class="accordion-icon"></span>
                    </div>
                <div>
                    <p>Bluewater is proposing to construct, own, operate, and the eventual decommission a deepwater port terminal in the Gulf of Mexico to export domestically produced crude oil. The proposed project involves the design, engineering, and construct</p>
                </div>
            </div>
            <div class="accordion-item" @click="e => e.target.classList.toggle('active')">
                <div>
                    <h2>2. Public scoping</h2><span class="accordion-icon"></span>
                </div>
                <div>
                    <p>NEPA mandates that local, state, and fede</p>
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

@media(max-width:768px){
    .accordion-item {
        padding: 30px 30px;
        h2 {
            font-size: 1.25rem;
        }
    }
}
</style>
