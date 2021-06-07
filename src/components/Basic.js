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

    async function sendMail() {
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
        updateReferralCount(emails);
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

    async function updateReferralCount(emails) {
      console.log("start updateReferralCount");
  
      //for (var x = 0; x < emails.length; x++) {
        let id = user.id;
        let add_referral_count = emails.length;
        let userInfo = { id, add_referral_count};
        console.log("userInfo", userInfo);
  
        let resultForUpdateUserReferralCount = await fetch(
          "http://localhost:8000/api/user/referral_count",
          {
            method: "PUT",
            body: JSON.stringify(userInfo),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
  
        resultForUpdateUserReferralCount = await resultForUpdateUserReferralCount.json();
        console.log(resultForUpdateUserReferralCount);
      //}
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
