import React, { Component, useEffect } from "react";
import { useHistory, useParams, withRouter } from "react-router";
import HomepageBanner from "../components/HomepageBanner";
import SignUpForm from "../components/SignUpForm";

class SignUpPage extends Component {
  state = {
    referrerId: "",
  };

  getReferrerId = () => {
    return this.props.match.params.referrerId;
  };

  render() {
    localStorage.setItem("referrer_id", this.props.match.params.referrerId);

    return (
      <div className="home-container">
        <HomepageBanner />
        <SignUpForm referrerId={this.props.match.params.referrerId} />
      </div>
    );
  }
}

export default withRouter(SignUpPage);

/*
function SignUpPage() {
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

export default SignUpPage;
*/
