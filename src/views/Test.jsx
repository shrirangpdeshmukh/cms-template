import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import Card from "components/Card/CommentCard.jsx";
import ChatInput from "components/ChatInput/ChatInput";
import ChatModal from "components/ChatModal/ChatModal.js";
import axios from '../axios-root'
import io from "socket.io-client";

class Chat extends Component {
  state = {
    comments: [],
    error: false,
    socket:null
  }

  componentDidMount() {
    axios.get(`/topics/${this.props.topicId}/tasks/${this.props.taskId}/comments/100`).then(response => {
      console.log(response)
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYwMzYyNzQzMCwiZXhwIjoxNjExNDAzNDMwfQ.ztSZ9gVXpCszeO0KgZNL26wAXhYgd8377l264ZoWbz0`
      const socket = io.connect(`http://localhost:5000`, {
        query:{token}
      })
      this.setState({ chats: response.data })
    }).catch(err=>this.setState({error:true}))
    console.log(this.props)
  }
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
          title={`Ranga ${(i % 3) + 1}`}
          userLink="https://github.com"
          stats="3 minutes ago"
          content="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...fdifj fgigjdfid lorem ipsu mggnihn fdffinfhifn fbnfsnfg grdngjn "
          key={i}
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
