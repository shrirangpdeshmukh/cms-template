import React, { Component } from "react";
import checkValidity from "../variables/validityRules";
import axios from "../axios-root";
import Form from "../components/Form/Form";
import {ForgotPassword} from "../variables/forms";
import Spinner from "../components/Spinner/Spinner";
class ForgotForm extends Component {
  state = {
    loginForm: ForgotPassword,
    formIsValid: false,
    loading: false,
    redirectPath: null,
  };
  
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
      .post("/auth/forgotPassword", formData)

      .then((response) => {
        if (response.data) {
          this.setState({loading: false});
          console.log("Email Sent successful");
          console.log(response.data);
        } else {
          console.log("Error occured");
        }
      })
      .catch((error) => {
        console.log(error);
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
        img="Forgot"
        title="Forgot Password"
        submitAction={this.loginHandler}
        elements={formElementsArray}
        changeHandler={this.inputChangedHandler}
        Description="Enter your E-mail here to reset your Password"
        link2="Already have a Reset Token ?"
        linkData2="/users/ResetPassword"
        btnState={this.state.formIsValid}
      />
    );
    
    if (this.state.loading) {
      form = <Spinner />;
    }

    return form;
  }
}

export default ForgotForm;
