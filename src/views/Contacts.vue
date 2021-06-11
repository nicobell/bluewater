<template>
<div class="template-page project-description intro">
  <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">Contacts</h1>
      <div class="content three-col">
          <div>
              <h2>
                  Federal Docket Management Facility’s
              </h2>
              <div class="contacts">
                  <div>
                      <h3>Telephone number</h3>
                      <p>202–372–1451</p>
                      <p>202–372–1451</p>
                  </div>
                  <div>
                      <h3>Fax number</h3>
                      <p>202–372–1451</p>
                  </div>
                  <div>
                      <h3>Website</h3>
                      <p>http://www.regulations.gov</p>
                  </div>
                  <div>
                      <h3>Docket number</h3>
                      <p>MARAD–2019–0094</p>
                  </div>
              </div>
          </div>
          <div>
              <h2>
                  U.S. Coast Guard
              </h2>
              <p class="person">Mr. Roddy Bachman, USCG</p>
              <div class="contacts">
                  <div>
                      <h3>Telephone number</h3>
                      <p>202–372–1451</p>
                      <p>202–372–1451</p>
                  </div>
                  <div>
                      <h3>Fax number</h3>
                      <p>202–372–1451</p>
                  </div>
              </div>
          </div>
          <div>
              <h2>
                  Maritime administration
              </h2>
              <p class="person">Ms. Yvette M. Fields, MARAD</p>
              <div class="contacts">
                  <div>
                      <h3>Website</h3>
                      <a href="#">http://www.regulations.gov</a>
                  </div>
                  <div>
                      <h3>Docket number</h3>
                      <p>MARAD–2019–0094</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'contacts',
   data:()=>{
    return{
      lang:"",
      data:null,
    }
  },
  props:{
    langData: String
  },
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
    color: #1C2332;
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
