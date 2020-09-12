/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import routes from "../../routes";

class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  render() {
    const drop = routes.map((route) => {
      return (
        <MenuItem key={route.name} href={`${route.layout}${route.path}`}>
          <i className={route.icon} /> {route.name}
        </MenuItem>
      );
    });

    const nav = routes.map((route) => {
      return (
        <NavItem key={route.name} href={`${route.layout}${route.path}`}>
          <i
            className={route.icon}
            style={{ padding: "2px", fontSize: "1.2em", fontWeight: "bolder" }}
          />
          <span style={{ padding: "3px", fontWeight: "bold" }}>
            {route.name}
          </span>
        </NavItem>
      );
    });

    const Navigation = <Nav pullRight>{nav}</Nav>;
    const DropDown = (
      <Nav pullRight>
        <NavDropdown eventKey={2} title="Menu" id="basic-nav-dropdown-right">
          {drop}
        </NavDropdown>
      </Nav>
    );
    return this.state.width <= 991 ? DropDown : Navigation;
  }
}

export default AdminNavbarLinks;
