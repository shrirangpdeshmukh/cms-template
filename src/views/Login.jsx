import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class Login extends Component {
  render() {
    return (
      <div className="content" sytle={{ alignContent: "center" }}>
        <Grid>
          <Col md={6}>
            <Card
              title="Login"
              content={
                <form>
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Email Address",
                        type: "email",
                        bsClass: "form-control",
                        placeholder: "example@iitbbs.ac.in",
                        defaultValue: "",
                      },
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Password",
                        type: "password",
                        bsClass: "form-control",
                        placeholder: "Password",
                        defaultValue: "",
                      },
                    ]}
                  />

                  <Button bsStyle="info" pullRight fill type="submit">
                    Login
                  </Button>
                  <div className="clearfix" />
                </form>
              }
            />
          </Col>
        </Grid>
      </div>
    );
  }
}

export default Login;
