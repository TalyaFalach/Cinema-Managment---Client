import { Button } from "@mui/material";
import React from "react";
import {  Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((state) => state.currentUser);
  // useEffect(() => {
  // console.log(user.hasOwnProperty("admin"));

  // }, [])

  const navigate = useNavigate();

  
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className="mb-3 navColor  text-dark">
      <hr />
      <Navbar className="navColor mb-3 mt-3" bg="" expand="lg">
        <Container className="navColor">
          <Navbar.Brand
            className="text-dark "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/main")}
          >
            <Card.Title className="fs-5">
              Hello, {sessionStorage["userFirstName"]}
            </Card.Title>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/movies")}>Movies</Nav.Link>
              <Nav.Link onClick={() => navigate("/members")}>
                Subscriptions
              </Nav.Link>

              {user.hasOwnProperty("admin") ? (
                <Nav.Link onClick={() => navigate("/users")}>
                  Users Managment
                </Nav.Link>
              ) : (
                <Nav.Link disabled>Users Managment</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <button
            className="btn"
            onClick={logout}
            size="large"
            color="error"
          >
            LOGOUT
          </button>
        </Container>
      </Navbar>
      <hr />
    </div>
  );
};

export default NavBar;
