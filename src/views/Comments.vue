<template>
<div class="template-page project-description intro">
    <header class="intro-header">
    </header>
    <div class="main-content">
      <h1 class="title">Comments</h1>
      <div class="content two-col">
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
            <div class="card">
                <h2>Draft EIS</h2>
                <p>The Draft EIS is available for viewing at the Regulations.gov website:</p>
                <button class="outline icon-left">
                    Go To Lorem
                </button>
            </div>
            <form action="">
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
            </form>
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



.card {
    background-color: #1A3C6E;
    padding: 20px 30px;
    border-radius: 10px;
    margin-bottom: 2rem;
   
    h2 {
        font-size: 1.5625rem;
        font-weight: 300;
        color: #FFFFFF;
    }
    p {
        color: #B1BFD5;
    }
    a {
        color: #FFFFFF;
        font-weight: 600;
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
    .main-content {
    .content.two-col{
      display: flex;
      flex-direction: column;
      .inner-content-left,
      .inner-content-right {
        width: auto;
      }
    }
  } 
}




</style>
