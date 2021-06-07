import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import {
  useHistory,
  BrowserRouter as Router,
  Link,
  Route,
} from "react-router-dom";

function Header() {
  const history = useHistory();
  let user = JSON.parse(localStorage.getItem("user-info"));

  return (
    <div>
      <Navbar bg="light" className="header">
        <Navbar.Brand>Refer With Me</Navbar.Brand>
        <Nav className="mr-auto">
          {localStorage.getItem("user-info") ? (
            <>
              <Link to="/referrals">Refer Now</Link>
            </>
          ) : (
            <>
              <Link to="/signin">Login</Link>
              <Link to="/signup">Register</Link>
            </>
          )}
        </Nav>

        {localStorage.getItem("user-info") ? (
          <Nav onClick={logOut}>
            <Button className="btn btn-primary">Log Out</Button>

            {/* <NavDropdown title={user && user.name}>
              <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        ) : null}
      </Navbar>
    </div>
  );

  function logOut() {
    localStorage.clear();
    history.push("/signin");
  }
}

export default Header;
