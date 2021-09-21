<template>
    <main class="template-page intro" role="main" tabindex="-1" aria-describedby="help">
        <div id="help" class="tohide">press 'N' to return to navigation</div>

        <div class="intro-header"></div>
    
        <div class="main-content" id="contenuto" aria-labelledby="title1" tabindex="0">
            <h1 class="title" id="title1"><span class="tohide">page title: </span>{{ content.title }}</h1>

            <div class="content two-col">
                <section class="inner-content-left" tabindex="0" aria-labelledby="sectiontitle">
                    <div tabindex="-1" class="important">
                        <p tabindex="1" class="heading" role="heading" v-html="content.alertMessage"></p>
                    </div>
                    <h2 id="sectiontitle">{{ content.secondTitle }}</h2>
                    <article v-for="(c, index) in content.body" :key="'body'+index"
                        :aria-labelledby="'bodytitle'+index">
                        <h3 :id="'bodytitle'+index" tabindex="-1">{{ c.title }}</h3>
                        <p v-html="c.content"></p>
                        <button v-if="index==0" class="main-button icon-left">Submit Your Comment</button>
                    </article>
                </section>

                <section class="inner-content-right" tabindex="0" aria-labelledby="sidecolumntitle">
                    <h2 id="sidecolumntitle" tabindex="-1">{{ content.sidebarTitle }}</h2>
                    <article v-for="(card, index) in content.cards" :key="'card'+index" 
                        class="card" :aria-labelledby="'insidetitle'+index">
                        <h3 :id="'insidetitle'+index" tabindex="-1">{{ card.title }}</h3>
                        <p v-html="card.description"></p>
                        <a :href="card.link" class="button outline icon-left" :aria-label="card.label">{{ card.button }}</a>
                    </article>

                    <!--<form action="">
                        <h2>Need help, contact us</h2>
                        <div>
                            <div>
                                <label for="">Name</label>
                                <input type="text" placeholder="Name" name="name" required/>
                            </div>
                            <div>
                                <label for="">Email</label>
                                <input type="text" placeholder="Email" name="email" required/>
                            </div>
                            <div>
                                <label for="">Message</label>
                                <textarea  type="text" placeholder="Message" name="message"  required/>
                            </div>
                            <div class="checkbox-container">
                                <input type="checkbox" class="form-check-input" id="agree"  required>
                                <label class="form-check-label" for="agree">I agree to the <span>Terms</span> and <span>Privacy Policy</span></label>
                            </div>
                            <div class="button-container">
                                <button class="cta cta-outline">Submit</button>
                            </div>
                            <p class="response">response</p>
                        </div>    
                    </form>-->

                    <article class="needhelp" aria-labelledby="needhelp">
                        <h3 id="needhelp">Need help, contact us.</h3>
                        <div>
                            <div>
                                <span>Telephone Number</span>
                                <p>no number yet</p>
                            </div>
                        </div>
                    </article>

                </section>
            </div>

            <div>
                <button class="tohide" id="back-to-nav" @click="backtonav()" tabindex="0" aria-label="back to navbar">
                back navbar
                </button>
            </div>

        </div>
    </main>
</template>

<script>
export default {
    name: 'comments',
    data: () => {
            return {
            }
    },
    computed: {
        lang() {
            return this.$store.state.lang
        },
        content () {
            //console.log(this.$store.state.data[this.lang].comments)
            return this.$store.state.data[this.lang].comments
        },
    },
    methods: {
        gotolink(link) {
            window.open(link, '_blank')
        },
        backtonav() {
            console.log(document.getElementById('navigazione'))
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
.content.two-col{
    display: flex;
    .inner-content-right {
        background-color: #12315F;
        width: 30%;
    }
    .inner-content-left {
        width: 70%;
    }
}

.important {
    background-color: #D2E9F7;
    padding: 20px 20px 20px 90px;
    border-radius: 10px;
    p.heading {
        color: #125D91;
        font-weight: 400;
        font-size: 1.125rem;
        position: relative;
        &:before{
            content: "";
            top: 50%;
            left: -70px;
            width: 49px;
            position: absolute;
            height: 49px;
            transform: translateY(-50%);
            background-image: url("../assets/icon-important.svg");
        }
        ::v-deep span {
            font-weight: 700;
        }
    }
}

h2 {
    font-size: 24px;
    font-weight: 300;
    text-transform: uppercase;
}
h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 10px;
}

.inner-content-right > h2,
.inner-content-right > article h2 {
    color: #7896C4;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1rem;
}



.card {
    background-color: #1A3C6E;
    padding: 40px 30px;
    border-radius: 10px;
    margin-bottom: 2rem;
   
    h3 {
        font-size: 1.5625rem;
        font-weight: 300;
        color: #FFFFFF;
        margin:  0;
    }
    p {
        color: #B1BFD5;
    }
    ::v-deep span {
        color: #FFFFFF;
        font-weight: 600;
    }
}

.needhelp {
    margin-top: 4rem;
    h3 {
        font-size: 1.5625rem;
        font-weight: 300;
        color: #FFFFFF;
    }
    span {
        font-size: 0.875rem;
        font-weight: 600;
        margin: 9px 0px;
        color: #FFFFFF;
    }
    p {
        margin-top: 0;
        color: #125D91;
    }
}

form{
    margin-top: 6rem;
    h2 {
        font-size: 1.5625rem;
        font-weight: 300;
        color: #FFFFFF;
    }
    label {
        font-size: 0.875rem;
        font-weight: 600;
        margin: 9px 0px;
        color: #FFFFFF;
    }
    textarea,
    input {
        border: 1px solid #ffffff33;
        padding: 15px 10px;
        border-radius: 5px;
        font-size: 1rem;
        background: #ffffff05;
        margin-bottom: 15px;
        color: #fff;
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: rgba(255, 255, 255,0.3);
        }
    div {
        div {
            display: flex;
            flex-direction: column;
        }
    }
    .checkbox-container {
        flex-direction: row;
        align-items: center;
        label,
        input {
            margin: 5px;
        }
    }
    .button-container {
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        margin-top: 2rem;
        button{
            padding: 17px;
            width: 200px;
            &:hover {
                background-color: #1d70ac;
                transition: 0.2s ease;
            }
        }
    }
}

@media (max-width: 1500px) {  
    .main-content .content.two-col {
        .inner-content-left {
                width: 60%;
        }
        .inner-content-right {
                width: 40%;
        }
    }
}

@media (max-width: 1024px) {  
    .main-content .content.two-col{
        display: flex;
        .inner-content-right {
            width: auto;
            max-width: unset;
        }
        .inner-content-left {
            width: auto;
        }
    }
}

</style>
