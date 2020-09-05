import React, { Component } from "react";
import { Grid, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import img from "../assets/img/login.png";

class Login extends Component {
  render() {
    const SignUP = {
      width: "95%",
      height: "80%",
      overflow: "hidden",
      margin: "0 10px",
      marginTop: "45px",
      zIndex: "0",
      alignItems: "center",
    };

    return (
      <div
        className="content"
        style={{ position: " relative", minHeight: "100vh" }}
      >
        <Grid>
          <Col md={5} sm={12}>
            <div>
              <img src={img} alt="Sign" style={SignUP} />
            </div>
          </Col>
          <Col md={6} sm={12}>
            <Card
              title=""
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

                  <Button bsStyle="info" fill type="submit">
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
