import React, { Component } from "react";

import classes from "./Layout.module.css";
import Test from "../views/Test.jsx";
import Footer from "components/Footer/Footer";
import { PageHeader } from "react-bootstrap";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import logo from "../assets/img/collegelogo.png";

import routes from "routes.js";
class Layout extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className={classes.logo} style={{ backgroundColor: "black" }}>
          <p className={[classes.logoMini, classes.simpleText].join(" ")}>
            <div className={classes.logoImg}>
              <img src={logo} alt="logo_image" />
            </div>
          </p>
          <p className={[classes.logoNormal, classes.simpleText].join(" ")}>
            CMS Neuromancers
          </p>
        </div>
        {/* </PageHeader> */}
        <main className={classes.Main} style={{ position: " relative" }}>
          <div className={classes.Container} style={{ paddingBottom: "1.5em" }}>
            <Test />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
