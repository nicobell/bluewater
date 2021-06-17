<template>
<div class="template-page project-description intro">
    <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">{{content.updates.title}}</h1>
      <div class="content">
          <div class="inner-content">
              <div class="item-update" v-for="(update, index) in content.updates.items" :key="index">
                  <p class="date">
                      {{update.date}}
                  </p>
                  <p class="text">
                        {{update.content}}
                  </p>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'updates',
   data:()=>{
    return{
      data:null,
    }
  },
computed: {
    lang () {
      return this.$store.state.lang
    },
    content () {
      return this.$store.state.data[this.lang]
    }
  },
}
</script>
<style scoped lang="scss">
.item-update{
    display: flex;
    flex-direction: row;
    padding: 2rem 2rem ;
    border-bottom: 1px solid #7070702a;
    align-items: center;
    .date {
        color: #1C6DA6;
        text-align: right;
        width: 16%;
        margin-right: 3rem;
    }
    .text {
        font-size: 1.125rem;
        width: 76%;
    }

}

@media (max-width:1024px){
    .item-update {
        display: block;
        padding: 20px 0px;
        .date {
            margin: 0;
            width: auto;
            text-align: left;
        }
        .text{
            width: auto ;
            margin: 5px 0px;
        }
    }
}


</style>
