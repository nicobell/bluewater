<template>
<div class="template-page project-description intro">
    <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">Updates</h1>
      <div class="content">
          <div class="inner-content">
              <div class="item-update">
                  <p class="date">
                      May 24, 2021
                  </p>
                  <p class="text">
                      Public Notice on Availability of the DEIS for the Bluewater Project
                  </p>
              </div>
              <div class="item-update">
                  <p class="date">
                      December 24, 2021
                  </p>
                  <p class="text">
                      Public Notice on Availability of the DEIS for the Bluewater Project
                  </p>
              </div>
              <div class="item-update">
                  <p class="date">
                      May 24, 2021
                  </p>
                  <p class="text">
                      Public Notice on Availability of the DEIS for the Bluewater Project
                  </p>
              </div>
              <div class="item-update">
                  <p class="date">
                      May 24, 2021
                  </p>
                  <p class="text">
                      Public Notice on Availability of the DEIS for the Bluewater Project
                  </p>
              </div>
              <div class="item-update">
                  <p class="date">
                      May 24, 2021
                  </p>
                  <p class="text">
                      Public Notice on Availability of the DEIS for the Bluewater Project
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
      lang:"",
      data:null,
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
        width: 14%;
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
