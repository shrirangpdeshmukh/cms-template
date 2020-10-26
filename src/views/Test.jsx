import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import Card from "components/Card/CommentCard.jsx";
import ChatInput from "components/ChatInput/ChatInput";
import ChatModal from "components/ChatModal/ChatModal.js";

class Chat extends Component {
  render() {
    let modal = null;

    modal = this.props.modalData ? (
      <ChatModal
        {...this.props}
        show={this.props.modalData}
        onHide={this.props.hideModal}
        taskName="Test Name"
        taskCreator="Ranga"
        description="Test description lorem ipsum dolor sit amet, consectetur lorem ipsumdolo dolrfshsfhfs fxfggfshshs"
        assignedTo={["Ranga", "Srirang", "Rahul"]}
        deadline="23/09/2020"
      />
    ) : null;

    const chats = [1, 2, 3, 4, 5, 6, 7, 8];

    let chat = chats.map((i) => {
      return (
        <Card
          key={i}
          title={`Ranga ${(i % 3) + 1}`}
          userLink="https://github.com"
          stats="3 minutes ago"
          content="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...fdifj fgigjdfid lorem ipsu mggnihn fdffinfhifn fbnfsnfg grdngjn "
        />
      );
    });

    return (
      <div
        className="content"
        style={{
          position: " relative",
          minHeight: "100vh",
          fontSize: "1.1em",
        }}
      >
        <Grid style={{ paddingBottom: "30px" }}>
          {modal}
          {chat}
          <ChatInput />
        </Grid>
      </div>
    );
  }
}

export default Chat;
