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
  render() {
    const drop = routes.map((route) => {
      return (
        <MenuItem key={route.name} href={`${route.layout}${route.path}`}>
          <i className={route.icon} /> {route.name}
        </MenuItem>
      );
    });

    return (
      <div>
        <Nav pullRight>
          <NavDropdown eventKey={2} title="Menu" id="basic-nav-dropdown-right">
            {drop}
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
