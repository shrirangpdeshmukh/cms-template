import React from "react";

import Auxillary from "../../hoc/Auxillary/Auxillary";

import { Modal, Button, Form } from "react-bootstrap";
import InputElements from "../Form/InputElements/InputElements";

const FormModal = (props) => {
  return (
    <Auxillary>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="text-center">
            <strong>Name: </strong>
            {props.name}
          </span>

          <span className="text-center">
            <strong>Email: </strong>
            {props.email}
          </span>

          <Form>
            {props.elements.map((formElement) => (
              <InputElements
                key={formElement.id}
                element={formElement}
                changeHandler={props.changeHandler}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-fill"
            bsStyle="success"
            type="submit"
            disabled={!props.btnState}
            onClick={props.confirmAction}
          >
            Confirm
          </Button>
          <Button
            className="btn-fill"
            onClick={this.props.onHide}
            bsStyle="danger"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Auxillary>
  );
};

export default FormModal;
