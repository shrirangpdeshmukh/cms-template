import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import routes from "../../routes";

class AdminSidebarLinks extends Component {
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

    const DropDown = (
      <Nav>
        <NavDropdown eventKey={2} title="MENU" id="basic-nav-dropdown-right">
          {drop}
        </NavDropdown>
      </Nav>
    );
    return DropDown;
  }
}

export default AdminSidebarLinks;
