import React, { Component } from "react";
import referralPage from "./../images/ReferralPage.png";

function ReferralTagLine() {
  return (
    <div className="centerImage">
      <div>
        <img src={referralPage} alt="ReferralPage" className="centerImage" />
      </div>
      <br></br>
      <div className="webTitle blueHeader">REFER NOW</div>

      <div className="referralTagline1">
        Get up to 10% off discount with us today!
      </div>
      <div className="referralTagline2">
        Invite your friends to join here and for each one who register we’ll
        give you both discount coupons of up to 10% discount in our partner’s
        products
      </div>
    </div>
  );
}

export default ReferralTagLine;
