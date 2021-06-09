<template>
<div class="template-page project-description intro">
    <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">Comments</h1>
      <div class="content">
        <div class="inner-content-left">
            <div class="important">
                <h2>
                    Scoping Comments must be submitted by <span>July 8, 2021.</span>
                </h2>
            </div>
            <h3>Public comments may be provided by:</h3>
            <div>
                <h4>
                    Electronically (preferred to expedite processing):
                </h4>
                <p>
                    Through the Federal Docket Management System website: <a href="http://regulations.gov">http://regulations.gov</a> under docket number MARAD-2019-0094.
                </p>
                <p>
                    Electronically through the Federal eRulemaking Portal
                </p>
                <button>
                    Submit Your Comment
                </button>
            </div>
            <br><br>
            <div>
                <h4>
                    By Mail:
                </h4>
                <p>
                    Docket Management Facility (MARAD-2019-0094), U.S. Department of 
                    Transportation, West Building, Ground Floor, Room W12-140, 1200 New Jersey 
                    Avenue, SE, Washington, DC 20590-0001
                </p>
            </div>
            <br><br>
            <div>
                <h4>
                    By Personal Delivery:
                </h4>
                <p>
                    To the room and address listed above between 9:00 AM and 5:00 PM, Monday through Friday, except Federal holidays.
                </p>
            </div>
            <br><br>
            <div>
                <h4>
                    By Fax:
                </h4>
                <p>
                    to the Docket Management Facility at (202) 493-2251
                </p>
            </div>
        </div>
        <div class="inner-content-right">
            <h5>usefull documents</h5>
            <div class="card">
                <h2>License Application</h2>
                <p>link The license application is available for viewing at the <a>Regulations.gov</a> website</p>
                <button class="outline icon-left">
                    Go To Lorem
                </button>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'comments',
   data:()=>{
    return{
      lang:"",
      data:null,
    }
  },
}
</script>

<style scoped lang="scss">

.content{
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
    h2 {
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
        span {
            font-weight: 700;
        }
    }
}
    h3 {
        font-size: 24px;
        font-weight: 300;
        text-transform: uppercase;
    }
    h4 {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 10px;
    }
    h4+p {
        margin-top: 0;
    }
    button{
        color: #fff;
        font-size: 0.875rem;
        background-color: #125D91;
    }
    h5 {
        color: #7896C4;
        text-transform: uppercase;
        font-weight: 600;
    }
</style>
