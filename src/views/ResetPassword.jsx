import React, { Component } from "react";

import Form from "../components/Form/Form";

class ResetForm extends Component {
  state = {
    loginForm: {
      token: {
        elementType: "input",
        elementConfig: {
          type: "text",
          id: "PassCheck",
          placeholder: "Paste the Token Here",
        },
        value: null,
        icon: "key",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
          id: "SignUpPass",
        },
        value: null,
        icon: "lock",
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
      },

      passwordConfirm: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirm Your Password",
          id: "SignUpPassConfirm",
        },
        value: null,
        icon: "lockFill",
        validation: {
          required: true,
          minLength: 8,
          same: true,
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
        img="Auth"
        title="Reset Password"
        submitAction={null}
        elements={formElementsArray}
        changeHandler={null}
        Description="Reset Your Password Here"
        link=""
        linkData={null}
        btnState={null}
      />
    );

    return form;
  }
}

export default ResetForm;
