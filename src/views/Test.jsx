import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import Card from "components/Card/CommentCard.jsx";
import ChatInput from "components/ChatInput/ChatInput";
import ChatModal from "components/ChatModal/ChatModal.js";
import axios from '../axios-root'
import io from "socket.io-client";
import {withCookies} from 'react-cookie'
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { IoIosSend } from "react-icons/io";

class Chat extends Component {
  socket = null;
  state = {
    comments: [{authorId:10,taskId:3,comment:"sdfgsdgsfgsfg"},{authorId:10,taskId:3,comment:"sdfgsdgsfgsfg"},{authorId:10,taskId:3,comment:"sdfgsdgsfgsfg"}],
    error: false,
 
  }

  componentDidMount() {
    axios.get(`/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/comments/100`).then(response => {
      console.log(response)
      const token = this.props.cookies.cookies.jwt
       this.socket = io.connect(`http://localhost:5000`, {
        query:{token}
      })
      this.setState({ comments: response.data.comments.data })
      this.socket.emit("join", this.props.taskId);
      this.socket.on("newComment", (newComment)=>this.onCommentRecieved(newComment))
    }).catch(err=>this.setState({error:true}))
    console.log(this.props)
  }


  onCommentRecieved = (newComment) => {
    let oldComments = this.state.comments
    oldComments.push(newComment)
    
    this.setState({comments:oldComments})
  }

  onSubmitComment = (e, comment) => {
    e.preventDefault()
    const data = {
      user_id: JSON.parse(this.props.cookies.cookies.userData).user.id,
      text: comment,
      task_id:this.props.taskId
    }
    this.socket.emit("message", data);
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

    let chat = null;
    if (this.state.comments.length) {

      chat = this.state.comments.map((comment) => {
        return (
          <Card
            title={comment.user_id}
            userLink="https://github.com"
            stats="3 minutes ago"
            content={comment.text}
          //key={}
          />
        );
      });
    }
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

          {/* chat input */}
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
            <FormControl type="text" placeholder="Write Your Message" id="message" />
          </FormGroup>{" "}
        </Col>
        <Col lg={1} md={4} xs={2} style={{ paddingLeft: "2px" }}>
          <Button
            pullRight
            onClick={(e)=>this.onSubmitComment(e,document.getElementById("message").value)}
            style={{ padding: "5px", borderRadius: "10px" }}
          >
            <IoIosSend style={{ padding: "0", fontSize: "1.8em" }} />
          </Button>
        </Col>
      </Form>
          </Row>
          
          {/* <ChatInput clicked={this.onSu} /> */}
        </Grid>
      </div>
    );
  }
}

export default withCookies(Chat);
