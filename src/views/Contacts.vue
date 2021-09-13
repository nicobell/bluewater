<template>
    <main role="main" class="template-page project-description intro">
        <div class="intro-header"></div>

        <div class="main-content">
            <h1 class="title">{{ content.title }}</h1>
            <div class="content three-col">
                <div v-for="(s, index) in content.sections" :key="'section'+index">
                    <h2>{{ s.title }}</h2>
                    <p>{{ s.subtitle }}</p>
                    <div class="contacts" v-for="(c, index) in s.body" :key="'contact'+index">
                        <div>
                            <h3>{{ c.title }}</h3>
                            <p v-html="c.content"></p>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    </main>
</template>
<script>

export default {
  name: 'contacts',
   data: () => {
    return {
    }
  },
  props:{
    langData: String
  },
  mounted() {
    //console.log('visiting ' + this.$route.name)
    this.$store.commit('SET_LASTPAGE', this.$route.name)

    if(this.lang=='es')
        this.$route.params.pagetitle = 'contactos'
    else if(this.lang=='en')
        this.$route.params.pagetitle = 'contacts'
  },
  computed: {
        lang () {
            return this.$store.state.lang
        },
        content () {
            //console.log(this.$store.state.data[this.lang].contacts)
            return this.$store.state.data[this.lang].contacts
        },
  },
  watch: {
    /*lang()  {
        if(this.lang=='en')
            this.$route.params.pagetitle = 'contacts'
        else if(this.lang=='es')
            this.$route.params.pagetitle = 'contactos'
    }*/
  }
}
</script>

<style scoped lang="scss">
.main-content .content {
    padding: 0px 4rem;
}

.three-col {
    display: flex;
    flex-direction: row;
    &>div{
        width: 33.33%;
        border-left: 1px solid rgb(238, 238, 238);
        padding: 40px 50px 0px 50px;
  
    }
    &>div:first-child{
        border-left: 0px solid rgb(238, 238, 238)
    }
}
p {
    margin: 0px 0px;
}
h2 {
    text-transform: uppercase;
    color: #125D91;
    font-size: 1.625rem;
    font-weight: 300;
    margin-bottom: 0;
}
h3 {
    color: #1C2332;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 5px;
}
.person {
    margin-top: 5px;
    color: #125D91;
    font-weight: 600;
}
.contacts {
    margin-top: 40px;
          &>div{
            margin-bottom: 40px;
        }
}


@media (max-width:1500px){ 
    .main-content .content {
        padding: 0px 1rem;
    }
}

@media (max-width:1200px){ 
    .main-content .content {
        padding: 0px ;
    }
}
@media (max-width:1024px){ 
    .three-col {
        display:block;
        &>div {
            width: auto;
        }
        .contacts {
        margin-top: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #d4d4d4;
            &>div {
                margin-bottom: 36px;
            }
        }
    }
}
@media (max-width:768px){ 
    .three-col > div {
        padding: 40px 15px 0px 15px;
        h2 {
            margin-top: 0px;
        }
        .contacts>div {
            margin-bottom: 33px;
        }
    }
}
</style>
