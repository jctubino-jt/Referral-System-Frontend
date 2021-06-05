import React, { Component, useEffect } from "react";
import { useHistory } from "react-router";
import HomepageBanner from "../components/HomepageBanner";
import SignUpForm from "../components/SignInForm";

function SignInPage() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/referrals");
    }
  });

  return (
    <div>
      <HomepageBanner />
      <SignUpForm />
    </div>
  );
}

export default SignInPage;
