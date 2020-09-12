import React, { Component } from "react";
import { Grid, Col } from "react-bootstrap";
import { MessageBox } from "react-chat-elements";
import { Input, Button } from "react-chat-elements";

class Login extends Component {
  render() {
    return (
      <div
        className="content"
        style={{ position: " relative", minHeight: "100vh", fontSize: "1.2em" }}
      >
        <Grid style={{ paddingBottom: "30px" }}>
          <MessageBox
            title="Ranga"
            position={"left"}
            text="react.svg Lorem ip dolor sit amet, consectetur adipiscing elit"
          />

          <br />

          <MessageBox
            position={"left"}
            text="react.svg Lorem ipsum dolor sit amet, consectetur adipisicing elit What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing?"
          />
          <br />

          <MessageBox
            position={"right"}
            text="react.svg Lorem ipsum dolor sit amet, consectetur adipisicing elit What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing? What are you doing?"
          />
          <br />

          <Input
            placeholder="Type here..."
            multiline={true}
            rightButtons={
              <Button color="white" backgroundColor="black" text="Send" />
            }
          />
        </Grid>
      </div>
    );
  }
}

export default Login;
