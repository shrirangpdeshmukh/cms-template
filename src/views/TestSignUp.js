import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import checkValidity from "../variables/validityRules";
import axios from "../axios-root";
import Auxillary from "../hoc/Auxillary/Auxillary";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownValue: "Role",
      role: null,
      formIsValid: false,
      formValues: {
        email: null,
        name: null,
        designation: null,
      },
      form: {
        name: {
          label: "Name",
          type: "text",
          bsClass: "form-control",
          placeholder: "Name",
          defaultValue: "",
          validationState: null,
          onChange: (event) =>
            this.changeHandler(
              event,
              {
                required: true,
              },
              "name"
            ),
        },
        email: {
          label: "Email Address",
          type: "email",
          bsClass: "form-control",
          placeholder: "eg123@iitbbs.ac.in",
          defaultValue: "",
          validationState: null,
          onChange: (event) =>
            this.changeHandler(
              event,
              {
                required: true,
                isEmail: true,
              },
              "email"
            ),
        },

        designation: {
          label: "Designation",
          type: "text",
          bsClass: "form-control",
          placeholder: "E.g. Core Member",
          defaultValue: "",
          validationState: null,
          onChange: (event) =>
            this.changeHandler(
              event,
              {
                required: true,
              },
              "designation"
            ),
        },
      },
    };
  }
  changeHandler = (event, rules, identifier) => {
    const newForm = { ...this.state.form };
    const newElement = { ...newForm[identifier] };

    newElement.validationState = checkValidity(event.target.value, rules)
      ? "success"
      : "error";

    newForm[identifier] = newElement;

    const newFormValues = { ...this.state.formValues };

    let formIsValid = true;
    newFormValues[identifier] = event.target.value;

    for (let inputIdentifier in newForm) {
      formIsValid =
        newForm[inputIdentifier].validationState === "success" && formIsValid;
    }

    this.setState({
      formValues: newFormValues,
      formIsValid: formIsValid,
      form: newForm,
    });
  };

  addHandler = (event) => {
    event.preventDefault();
    const data = { ...this.state.formValues };
    data["role"] = this.state.role;
    axios
      .post("/users/addOnly", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const roleOptions = [
      "Super Admin",
      "superAdmin",
      "Admin",
      "admin",
      "Member",
      "user",
    ];

    return (
      <Auxillary className="content">
        <Col md={6} sm={6}>
          <Card
            title="Add New User"
            content={
              <form>
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  properties={[this.state.form.name, this.state.form.email]}
                />
                <Row>
                  <Col md={6}>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[this.state.form.designation]}
                    />
                  </Col>
                  <Col md={6}>
                    <DropdownButton
                      bsStyle="info"
                      title={this.state.dropDownValue}
                      className="btn-fill"
                      id="new-role"
                      style={{
                        marginTop: "25px",
                        marginLeft: "5px",
                        paddingLeft: " 30px",
                        paddingRight: "30px",
                        fontSize: "15px",
                      }}
                    >
                      <MenuItem
                        eventKey={roleOptions[1]}
                        onClick={() =>
                          this.setState({
                            dropDownValue: roleOptions[0],
                            role: roleOptions[1],
                          })
                        }
                      >
                        {roleOptions[0]}
                      </MenuItem>
                      <MenuItem
                        eventKey={roleOptions[3]}
                        onClick={() =>
                          this.setState({
                            dropDownValue: roleOptions[2],
                            role: roleOptions[3],
                          })
                        }
                      >
                        {roleOptions[2]}
                      </MenuItem>
                      <MenuItem
                        eventKey={roleOptions[5]}
                        onClick={() =>
                          this.setState({
                            dropDownValue: roleOptions[4],
                            role: roleOptions[5],
                          })
                        }
                      >
                        {roleOptions[4]}
                      </MenuItem>
                    </DropdownButton>
                  </Col>
                </Row>
                <br />
                <br />
                <div className="clearfix" />
                <Button
                  bsStyle="success"
                  fill
                  onClick={this.addHandler}
                  type="submit"
                  style={{ marginLeft: "5px" }}
                  disabled={
                    !(
                      this.state.formIsValid &&
                      this.state.role !== null &&
                      this.state.role !== undefined
                    )
                  }
                >
                  Add User &#10003;
                </Button>
                <Button
                  bsStyle="danger"
                  fill
                  style={{ marginLeft: "5px" }}
                  onClick={this.props.removeCard}
                >
                  Remove
                </Button>
                <div className="clearfix" />
              </form>
            }
          />
        </Col>
      </Auxillary>
    );
  }
}

export default UserProfile;
