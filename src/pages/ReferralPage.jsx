import React, { Component } from "react";
import ReferralSendEmails from "../components/ReferralSendEmails";
import Header from "../components/Header";

//page name is <domain>/referrals
function ReferralPage() {
  return (
    <div>
      <Header />
      <ReferralSendEmails />
    </div>
  );
}

export default ReferralPage;
