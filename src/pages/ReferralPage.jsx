import React, { Component } from "react";
import ReferralSendEmails from "../components/ReferralSendEmails";
import Header from "../components/Header";
import ReferralTagLine from "../components/ReferralTagline";
import Basic from "../components/Basic";

function ReferralPage() {
  return (
    <div>
      <Header />
      <div className="home-container">
        <ReferralTagLine />
        <Basic />
      </div>
    </div>
  );
}

export default ReferralPage;
