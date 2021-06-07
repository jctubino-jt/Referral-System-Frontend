import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  let referrer_id = "TheReferrer";
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
    localStorage.setItem("user-info", JSON.stringify(result));

    let referralInfo = { referrer_id, referred_email };

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

    //change add to url
    if (!result.error) {
      history.push("/referrals");
    }
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
