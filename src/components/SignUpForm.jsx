import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function signUp() {
    let item = { name, password, email };

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

    //change add to url
    history.push("/referrals");
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
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
