import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import classes from "./Layout.module.css";
import Login from "../views/Login2.jsx";
import ForgotPassword from "../views/ForgotPassword.jsx";
import ResetPassword from "../views/ResetPassword.jsx";
import Footer from "components/Footer/Footer";
import logo from "../assets/img/collegelogo.png";
import routes from "../routes2.js";

class Layout extends Component {
  state = {};
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
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
        <main className={classes.Main} style={{ position: " relative" }}>
          <div className={classes.Container} style={{ paddingBottom: "1.5em" }}>
            {" "}
            <Switch>{this.getRoutes(routes)}</Switch>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
