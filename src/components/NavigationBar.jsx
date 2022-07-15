import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = ({ logOut, user: { name: userName } }) => {
  return (
    <Navbar
      bg="primary"
      expand="md"
      variant="dark"
      fixed="top"
      collapseOnSelect
    >
      <Navbar.Brand className="ms-2">Welcome {userName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <LinkContainer to="/">
            <Nav.Link className="nav-item p-1">Feedbacks</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/make-a-feedback">
            <Nav.Link className="nav-item p-1">Make a feedback</Nav.Link>
          </LinkContainer>
        </Nav>
        <Button className="ms-auto me-2" variant="light" onClick={logOut}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
