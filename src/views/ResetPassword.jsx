import React, { Component } from "react";

import checkValidity from "../variables/validityRules";
import axios from "../axios-root";
import Form from "../components/Form/Form";
import {ResetPassword} from "../variables/forms"
class ResetForm extends Component {
  state = {
    loginForm: ResetPassword,
    formIsValid: false,
    redirectPath:null,
    loading:false
  }
  
  inputChangedHandler = (event, inputIdentifier) => {
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
    if (inputIdentifier === 'passwordConfirm') {
      updatedFormElement.valid =  updatedFormElement.valid && (updatedFormElement.value===updatedForm['password'].value);
    }
    
    
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
      .patch("/auth/resetPassword", formData)
        
      .then((response) => {
        if (response.data) {
          this.setState({loading: false});
          console.log("Reset successful");
          console.log(response.data);
          console.log("redirecting to homepage\n");
          console.log(this.props.cookies);
          const cookies = this.props.cookies;
          cookies.set("isAuthenticated", true, { path: "/" });
          cookies.set("userData", response.data.data, { path: "/" });
        } else {
          console.log("Error occured");
        }
      })
      .catch((error) => {
        // console.log(error);
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
        img="Auth"
        title="Reset Password"
        submitAction={this.loginHandler}
        elements={formElementsArray}
        changeHandler={this.inputChangedHandler}
        Description="Reset Your Password Here"
        link=""
        linkData={null}
        btnState={this.state.formIsValid}
      />
    );

    return form;
  }
}

export default ResetForm;
