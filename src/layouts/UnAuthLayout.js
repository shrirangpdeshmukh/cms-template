import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import classes from "./Layout.module.css";
import Footer from "components/Footer/Footer2";
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
            render={(props) => (
              <prop.component {...props} cookies={this.props.cookies} />
            )}
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
          <div className={[classes.logoMini, classes.simpleText].join(" ")}>
            <div className={classes.logoImg}>
              <img src={logo} alt="logo_image" />
            </div>
          </div>
          <p className={[classes.logoNormal, classes.simpleText].join(" ")}>
            CMS Neuromancers
          </p>
        </div>
        <main
          className={classes.Main}
          style={{ position: "relative", minHeight: "70vh" }}
        >
          <div
            className={classes.Container}
            style={{ paddingBottom: "1.5rem" }}
          >
            {" "}
            <Switch>{this.getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default Layout;
