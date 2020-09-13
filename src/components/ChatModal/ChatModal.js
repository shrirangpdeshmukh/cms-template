import React, { Component } from "react";
import { Modal, Row, Col, Image } from "react-bootstrap";
import img from "../../assets/img/details.png";
class ChatModal extends Component {
  state = { width: window.innerWidth };

  render() {
    const p_styles = {
      textAlign: "left",
      display: "inline-block",
      height: "60%",
      width: "60%",
    };
    const figure_styles = {
      float: "right",
      display: "inline-block",
      height: "40%",
      marginTop: "-25px",
      width: "40%",
    };

    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={this.state.width < 991 ? null : p_styles}>
            <strong>Task Name </strong>:&nbsp;{this.props.taskName}
            <br />
            <strong>Created By</strong>:&nbsp;{this.props.taskCreator}
            <br />
            <strong>Description</strong>:&nbsp;&nbsp;
            {this.props.description}
            <br />
            <strong>Assigned to</strong>:&nbsp;
            <ul>
              {this.props.assignedTo.map((assigned) => {
                return <li>{assigned}</li>;
              })}
            </ul>
            <br />
            <strong>Deadline</strong>:&nbsp; {this.props.deadline}
            <br />
          </p>

          {this.state.width < 991 ? null : (
            <Image src={img} style={figure_styles} />
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChatModal;
