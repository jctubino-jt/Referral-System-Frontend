import React, { Component, useState } from "react";
import { useHistory } from "react-router";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function login() {
    console.warn(email, password);
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/referrals");
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign In</h2>
        <div>
          <div className="inputDiv">
            <input
              type="text"
              className="homepageInput"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              autoFocus="1"
              aria-label="Enter Email"
            />
          </div>

          <div className="inputDiv">
            <input
              type="password"
              className="homepageInput"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <div></div>

          <div>
            <button onClick={login} className="signInButton">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
