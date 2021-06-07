import * as React from "react";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/style.css";
import Swal from "sweetalert2";

interface IProps {}
interface IState {
  emails: string[];
}

class Basic extends React.Component<IProps, IState> {

  state = {
    emails: [],
  };
  
  render() {
    const { emails } = this.state;

    var user = "";
    var referral_id = "";

    if (localStorage.getItem("user-info") != null) {
      user = JSON.parse(localStorage.getItem("user-info"));
      referral_id = user.referral_id;
    }

    function printLog(){
      console.log(emails);
    }

    async function isEmailValid(email) {
      //check if email is already invited
      let isEmailInvited = await checkIfEmailIsInvited(email);

      //check if email is already existing
      let isEmailRegistered = await checkIfEmailIsRegistered(email);

      if(isEmailRegistered){
        return false;
      }

      if(isEmailInvited){
        
        return false;
      }

      return true;

    }

    async function checkIfEmailIsInvited(email){
      let item = { email };
        let result = await fetch("http://localhost:8000/api/referral/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        });
        result = await result.json();
        console.log("result", result);
    
        if ((result.status == 401)) {
          return false;
        }

        Swal.fire({
          type: "error",
          title: "Oops...",
          text: JSON.stringify(result.referral.referred_email) + " is already invited",
        });

        return true;
    }

    async function checkIfEmailIsRegistered(email){
      let item = { email };
        let result = await fetch("http://localhost:8000/api/user/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        });
        result = await result.json();
        console.log("result", result);
    
        if ((result.status == 401)) {
          return false;
        }

        Swal.fire({
          type: "error",
          title: "Oops...",
          text: JSON.stringify(result.user.email) + " is already registered",
        });

        return true;
    }

    async function checkIfAllEmailsAreValid(emails){
      for (var x = 0; x < emails.length; x++) {
        let isValid = await isEmailValid(emails[x]);
        if(!isValid){
          return false;
        }
      }

      return true;
    }

    async function checkIfReferralCountPasses(){
      let email = user.email;
      let item = { email };
        let result = await fetch("http://localhost:8000/api/user/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        });
        result = await result.json();
        console.log("result", result);

        if(result.user.referral_count >= 10){

          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Referral count already met maximum referrals (10).",
          });

          return false;
        }

        return true;
    }

    async function sendMail() {

      let areAllEmailsValid = await checkIfAllEmailsAreValid(emails);
      let isReferralCountLessThan10 = await checkIfReferralCountPasses();

      if(areAllEmailsValid && isReferralCountLessThan10){
        let item = { referral_id, emails };
        let result = await fetch("http://localhost:8000/api/send/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        });
        result = await result.json();
        console.log("result", result);
    
        if ((result.status = 200)) {
          Swal.fire({
            title: "Email sent successfully",
            text: "Thank you for Referring!",
            type: "success",
          });
    
          //add Referral in Referrals table
          addReferral(emails);

          //update referral_count in Users table
          //updateReferralCount(emails);
      }
      
      }
  
      
    }

    async function addReferral(emails) {
      for (var x = 0; x < emails.length; x++) {
        let referrer_id = user.id;
        let referred_email = emails[x];
        let referralInfo = { referrer_id, referred_email };
        console.log("referralInfo", referralInfo);
  
        let resultForAddReferral = await fetch(
          "http://localhost:8000/api/referral",
          {
            method: "POST",
            body: JSON.stringify(referralInfo),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
  
        resultForAddReferral = await resultForAddReferral.json();
        console.log(resultForAddReferral);
      }
    }
  
    return (
      <div className="referralContainer">
        <ReactMultiEmail
          placeholder="Enter Email Addresses"
          emails={emails}
          onChange={(_emails: string[]) => {
            this.setState({ emails: _emails });
          }}
          validateEmail={(email) => {
            return isEmail(email); // return boolean
          }}
          getLabel={(
            email: string,
            index: number,
            removeEmail: (index: number) => void
          ) => {
            return (
              <div data-tag key={index}>
                {email}
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            );
          }}
        />

        <div className="inlineBlock">
          <button
            onClick={sendMail}
            type="button"
            className="sendButton btn btn-primary"
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Basic;
