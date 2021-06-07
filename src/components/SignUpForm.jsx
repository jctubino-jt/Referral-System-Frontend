import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  let referrer_id = "";
  const referred_email = email;

  if (localStorage.getItem("referrer_id") != null) {
    referrer_id = localStorage.getItem("referrer_id");
  }

  if (localStorage.getItem("user-info")) {
    history.push("/referrals");
  }

  //if user is logged in, go directly to referrals
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/referrals");
    }
  });

  async function signUp() {
    let item = { name, password, email };

    //when referred, users must be registered with a referrer id - Register API
    //after successful signup, user referral action must be added into Refferals table - Use another API? or the same with Register API?

    let result = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    result = await result.json();
    /*
    if (result.error != 401) {
      history.push("/referrals");
    } else {
      localStorage.clear();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong email/password",
      });
    }
  }
  */
    localStorage.setItem("user-info", JSON.stringify(result));

    //update referral status in referrals table
    let referralInfo = { referred_email };
    let resultForUpdateReferral = await fetch(
      "http://localhost:8000/api/referral",
      {
        method: "PUT",
        body: JSON.stringify(referralInfo),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    resultForUpdateReferral = await resultForUpdateReferral.json();
    console.log(resultForUpdateReferral);

    //update referral count of referrer
    updateReferralCount(referrer_id);

    //change add to url
    if (result.error != 401) {
      history.push("/referrals");
    }
  }

  async function updateReferralCount(referrer_id) {
    //for (var x = 0; x < emails.length; x++) {
    //let id = user.id;
    //let add_referral_count = emails.length;
    let referral_id = referrer_id;
    let userInfo = { referral_id };

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

    resultForUpdateUserReferralCount =
      await resultForUpdateUserReferralCount.json();
    console.log(resultForUpdateUserReferralCount);
    //}
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign Up</h2>

        <div>
          <div className="inputDiv">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="homepageInput"
              placeholder="Enter Name"
              aria-label="Enter Name"
              autoFocus="1"
            />
          </div>

          <div className="inputDiv">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="homepageInput"
              placeholder="Enter Email"
              aria-label="Enter Email"
            />
          </div>

          <div className="inputDiv">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="homepageInput"
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <div>
            <button onClick={signUp} className="signInButton">
              Sign Up
            </button>
          </div>

          <span>
            Already have an account? <Link to="/signin">Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
