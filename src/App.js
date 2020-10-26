import React, { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import axios from "./axios-root";

import Auxillary from "./hoc/Auxillary/Auxillary";
import ErrorHandler from "./hoc/ErrorHandler/ErrorHandler";

import AdminLayout from "layouts/Admin.jsx";
import UnAuthLayout from "layouts/UnAuthLayout.js";
import ChatLayout from "./layouts/ChatLayout";

import { withCookies } from "react-cookie";

class App extends Component {
  state = {};
  render() {
    return (
      <Auxillary>
        <Switch>
          <Route
            path="/admin"
            render={(props) => (
              <AdminLayout {...props} cookies={this.props.cookies} />
            )}
          />
          <Route
            path="/auth"
            render={(props) => (
              <UnAuthLayout {...props} cookies={this.props.cookies} />
            )}
          />
          <Route
            path="/chat/:topicId/:taskId"
            render={(props) => (
              <ChatLayout {...props} cookies={this.props.cookies} />
            )}
          />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Auxillary>
    );
  }
}

export default withCookies(ErrorHandler(App, axios));
