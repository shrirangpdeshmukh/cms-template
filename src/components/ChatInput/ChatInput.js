import React from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { IoIosSend } from "react-icons/io";

const ChatInput = (props) => {
  return (
    <Row style={{ marginTop: "15px" }}>
      <Form>
        <Col
          lg={11}
          md={8}
          xs={10}
          style={{
            paddingRight: "2px",
          }}
        >
          <FormGroup
            controlId="formInlineName"
            style={{ border: "1px solid #ccc", borderRadius: "4px" }}
          >
            <FormControl type="text" placeholder="Write Your Message" />
          </FormGroup>{" "}
        </Col>
        <Col lg={1} md={4} xs={2} style={{ paddingLeft: "2px" }}>
          <Button
            pullRight
            type="submit"
            style={{ padding: "5px", borderRadius: "10px" }}
          >
            <IoIosSend style={{ padding: "0", fontSize: "1.8em" }} />
          </Button>
        </Col>
      </Form>
    </Row>
  );
};

export default ChatInput;
