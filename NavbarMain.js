import React, { Component } from 'react';
import { Link, Route } from "react-router-dom"
import { Button, Nav, Navbar, NavItem, } from "reactstrap";

const trelloIcon = require("../img/trellologo.png");

class NavbarMain extends Component {
  render() {
    return (
      <Navbar  expand="md" style={{ backgroundColor: "#026AA7", fontWeight: "bold" }}>
          <a href="/" style={{ background:"white",opacity:"0.5",borderRadius: "9%",padding:"0.5%" }}><img height="25px" width="80px" src={trelloIcon} alt=""></img></a>
        <Nav className="ml-auto" navbar>
          <NavItem tag={Route} >
            <Button tag={Link} to="/login" style={{verticalAlign:"center", color: "black", fontWeight: "bolder", fontSize:"19px", backgroundColor:"rgb(247, 247, 247)",opacity:"0.5",borderRadius: "9%" }}>LogIn</Button>
          </NavItem>&nbsp;<NavItem>
            <Button tag={Link} to="/signup" style={{ color: "black", fontWeight: "bolder", fontSize:"19px",backgroundColor:"rgb(247, 247, 247)",opacity:"0.5",borderRadius: "9%" }} >SignUp</Button>
          </NavItem>
        </Nav>
      </Navbar>

    );
  }
}
export default NavbarMain;