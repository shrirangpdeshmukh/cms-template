import React, { Component } from "react";

import Auxillary from "../hoc/Auxillary/Auxillary";

import { ChangeRoleModal } from "../../variables/forms";
import checkValidity from "../variables/validityRules";

import FormModal from "../FormModal/FormModal";

class ChangeRoleModal extends Component {
  state = {
    showModal: false,
    loginForm: ChangeRoleModal,
    formIsValid: false,
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
    updatedFormElement.touched = true;
    let formIsValid = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ loginForm: updatedForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }

    <FormModal
      elements={formElementsArray}
      name={props.name}
      email={props.email}
      title="Change Role of the User"
      changeHandler={this.inputChangedHandler}
      btnState={this.state.formIsValid}
      submitAction={props.submit}
    />;

    return null;
  }
}

export default ChangeRoleModal;
