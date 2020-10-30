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
  typing = null;
  timeout = undefined;
  state = {
    comments: [{authorId:10,taskId:3,comment:"sdfgsdgsfgsfg"},{authorId:10,taskId:3,comment:"sdfgsdgsfgsfg"},{authorId:10,taskId:3,comment:"sdfgsdgsfgsfg"}],
    error: false,
    typing:''
  }

  componentDidMount() {
    axios.get(`/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/comments/100`).then(response => {
      console.log(response)
      this.setState({ comments: response.data.comments.data })
      this.setUpSocket()
    }).catch(err=>this.setState({error:true}))
    console.log(this.props)
  }


  setUpSocket = () => {
    const token = this.props.cookies.cookies.jwt
       this.socket = io.connect(`http://localhost:5000`, {
        query:{token}
      })
      this.socket.emit("join", this.props.taskId);
      this.socket.on("display",(data)=>this.onDisplay(data))
      this.socket.on("newComment", (newComment) => this.onCommentRecieved(newComment))
  }

  onCommentRecieved = (newComment) => {
    let oldComments = this.state.comments
    oldComments.push(newComment)
    
    this.setState({comments:oldComments})
  }

  onSubmitComment = (e, comment) => {
    e.preventDefault()
    if (comment == "") alert("Empty comment!")
    else {
      const data = {
        user_id: JSON.parse(this.props.cookies.cookies.userData).user.id,
        text: comment,
        task_id: this.props.taskId
      }
      this.socket.emit("message", data);
      document.getElementById("message").value = ""
    }
  }

  typingTimeout = () => {
    this.typing = false
    this.socket.emit("typing",{user_id: JSON.parse(this.props.cookies.cookies.userData).user.id,username:JSON.parse(this.props.cookies.cookies.userData).user.name,typing:false,task_id:this.props.taskId})
  }

  keypress = (e,comment) => {
    if (e.which != 13) {
      this.typing = true
      this.socket.emit("typing", { user_id: JSON.parse(this.props.cookies.cookies.userData).user.id,username: JSON.parse(this.props.cookies.cookies.userData).user.name, typing: true,task_id:this.props.taskId })
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.typingTimeout,1000)
    } else {
      clearTimeout(this.timeout)
      this.typingTimeout()
      this.onSubmitComment(e,comment)
    }
  }

  onDisplay = (data) => {
    
    if (data.typing == true
      //&& data.user_id != JSON.parse(this.props.cookies.cookies.userData).user.id
    )
    this.setState({typing:`${data.username} is typing...`})
  else
   this.setState({typing:``})
  }

  urlify=(text)=> {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
    
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
        const commentText = comment.text
        console.log(commentText)
        //const linkifiedText=this.urlify(commentText)
        return (
          
          <Card
            title={JSON.parse(this.props.cookies.cookies.userData).user.name}
            userLink="https://github.com"
            stats="3 minutes ago"
            content={//comment.text
             commentText
             // linkifiedText
            }
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
            
        <p>{this.state.typing}</p>
      <Form>
        <Col
          lg={10}
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
                  
                  <FormControl
                    onKeyPress={(e) => this.keypress(e, document.getElementById("message").value)}
                    autoComplete="off"
                    type="text" placeholder="Write Your Message" id="message" />
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
