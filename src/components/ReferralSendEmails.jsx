import React, { Component, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import Basic from "./Basic";

function ReferralSendEmails() {
  const [emails, setTargetEmails] = useState("");

  var user = "";
  var referral_id = "";

  //check if localstorage has value
  if (localStorage.getItem("user-info") != null) {
    user = JSON.parse(localStorage.getItem("user-info"));
    referral_id = user.referral_id;
  }

  //send email button click function
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
      this.addReferral(emails);
    }

    //update referral_count to user in Users table
  }

  async function addReferral(emails) {
    console.log("start addReferrals");

    for (var x = 0; x < emails.length(); x++) {
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
      <div className="emailForm inlineBlock">
        <input
          className="form-control  form-control-lg "
          type="text"
          placeholder="Enter Email Addresses"
          onChange={(e) => setTargetEmails(e.target.value)}
        />
      </div>

      <div className="inlineBlock">
        <button
          onClick={sendMail}
          type="button"
          className="sendButton btn btn-primary"
        >
          Send
        </button>
      </div>

      <Basic />
    </div>
  );
}

export default ReferralSendEmails;
