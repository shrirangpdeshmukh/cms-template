import React, { Component } from "react";

import checkValidity from "../variables/validityRules";
import Form from "../components/Form/Form";

import axios from "../axios-root";

import Spinner from "../components/Spinner/Spinner";
import {Login} from "../variables/forms";

class LoginForm extends Component {
  state = {
    loginForm: Login,
    formIsValid: false,
    loading: false,
    redirectPath:null
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(inputIdentifier);
    const updatedForm = {
      ...this.state.loginForm,
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    let formIsValid = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
     
    this.setState({ loginForm: updatedForm, formIsValid: formIsValid });
  };

  loginHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.loginForm) {
      formData[formElementIdentifier] = this.state.loginForm[
        formElementIdentifier
      ].value;
    }

    axios
      .post("/auth/login", formData)

      .then((response) => {
        if (response.data) {
          this.setState({loading: false});
          console.log("Login successful");
          console.log(response.data);
          console.log(this.props.cookies);
          const cookies = this.props.cookies;
          cookies.set("isAuthenticated", true, { path: "/" });
          cookies.set("userData", response.data.data, { path: "/" });
        } else {
          console.log("Error occured");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }

    let form = (
      <Form
        img="Login"
        title="Login"
        submitAction={this.loginHandler}
        elements={formElementsArray}
        changeHandler={this.inputChangedHandler}
        Description="Log into Your Account"
        link2="Forgot Password ?"
        linkData2="/users/forgotPassword"
        btnState={this.state.formIsValid}
      />
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    // let modal = null;
    // if (this.state.modalData)
    //   modal = (
    //     <Modal
    //       show={this.state.showModal}
    //       onHide={this.state.modalData.hide}
    //       title={this.state.modalData.title}
    //       body={this.state.modalData.message}
    //       button={this.state.modalData.Button}
    //     />
    //   );

    // if (this.state.redirectPath) {
    //   return <Redirect to={this.state.redirectPath} />;
    // }

    return form;
  }
}

export default LoginForm;
