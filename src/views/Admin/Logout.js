import React, { Component } from "react";

import { Redirect } from "react-router-dom";

//axios
import axios from "../../axios-root";

import Spinner from "../../components/Spinner/Spinner";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, redirect: false };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .post("/auth/logout")
      .then((response) => {
        if (response.data) {
          const cookies = this.props.cookies;
          cookies.set("isAuthenticated", false, { path: "/" });
          cookies.set("userData", null, { path: "/" });
          this.setState({ loading: false, redirect: true });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  render() {
    let logout = null;
    if (this.state.loading) logout = <Spinner />;

    if (this.state.redirectPath) {
      return <Redirect to={this.state.redirectPath} />;
    }

    return logout;
  }
}

export default Logout;
