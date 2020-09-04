import React, { Component } from "react";

import Form from "../components/Form/Form";

class ForgotForm extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          id: "ForgotEmail",
          placeholder: "Your Email",
        },
        value: null,
        icon: "email",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
    },
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
        submitAction={null}
        elements={formElementsArray}
        changeHandler={null}
        Description="Enter your E-mail here to reset your Password"
        link2="Already have a Reset Token ?"
        linkData2="/users/ResetPassword"
        btnState={null}
      />
    );

    return form;
  }
}

export default ForgotForm;
