<template>
    <main class="template-page intro" role="main">
        <div class="intro-header"></div>

        <div class="main-content" id="contenuto" tabindex="0" aria-labelledby="title1">
            <h1 class="title" id="title1" tabindex="-1"><span class="tohide">page title: </span>{{ content.title }}</h1>
            
            <div class="content">
                <section class="inner-content" tabindex="0" aria-label="updates calendar">
                    <article v-for="(update, index) in content.items" :key="index"
                        class="item-update"
                        aria-hidden="false" :aria-labelledby="'titledate'+index">

                        <p class="date" :id="'date'+index"> {{ update.date }}</p>
                        <div class="text">
                            <h3 :id="'titledate'+index" tabindex="-1" aria-level="2">{{ update.subtitle }}</h3>
                            <p v-if="update.content" v-html="update.content"></p>
                        </div>
                        
                    </article>
                </section>
            </div>

            <div>
                <button class="tohide" id="back-to-nav" @click="backtonav()" tabindex="0" aria-label="back to navbar">
                    back to navbar
                </button>
            </div>

        </div>
    </main>
</template>

<script>
export default {
    name: 'general-information',
    data: () => {
        return {
            data: null,
        }
    },
    computed: {
        lang () {
            return this.$store.state.lang
        },
        content () {
            return this.$store.state.data[this.lang].updates
        }
    },
    methods: {
        backtonav() {
            //console.log(document.getElementById('navigazione'))
            document.getElementById('navigazione').focus();
        }
    },
    mounted() {
        //console.log('visiting ' + this.$route.name)
        this.$store.commit('SET_LASTPAGE', this.$route.name)
    }
}
</script>

<style scoped lang="scss">
.item-update {
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
        h3 {
            color: #1C6DA6;
            font-size: 1.125rem;
            font-weight: 700;
        }
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
        .text {
            width: auto ;
            margin: 5px 0px;
        }
    }
}


</style>
