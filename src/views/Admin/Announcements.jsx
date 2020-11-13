
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Alert,
  FormControl,
  FormGroup,
  Label,
  Collapse,
} from "react-bootstrap";

import ConfirmModal from "../../components/Modals/confirmModal/ConfirmModal";
import Spinner from './../../components/Spinner/Spinner';
import Button from "./../../components/CustomButton/CustomButton";
import axios from "../../axios-root"

class Announcements extends Component {
  state = {
      open: false,
      showId : null,
      announcements: null,
      error:null,
      announcementData: "click on the statement",
      loading : false,
      showModal : false,
      modalData : null              
  }

  componentDidMount() {
        axios.get('/board/announcements').then(response => {
          this.setState({ announcements: response.data.data.announcements })
          console.log(response);
          console.log(this.state.announcements)
        }).catch(err => {
            this.setState({error:err})
        })
  }
  handleClick (e) {
    e.preventDefault();
    const state = this.state.announcementData;
    console.log(state);
  }

  fullAnnouncementClicked = (e,id) => {
    e.preventDefault();
    const announcement = this.state.announcements.find(a => a.id === id);
    console.log(this.state.announcements);
    console.log(announcement);
    this.setState({announcementData : announcement.body, showId : id});
    console.log(this.state.announcementData);
  }  

  updateAnnouncement = (id,updatedAnnouncement) => {
    this.setState({loading : true});
    axios.patch(`/board/announcements/${id}`,updatedAnnouncement)
    .then(response => {
      console.log(response);
      // console.log(this.state.announcements)
      const announcements = response.data.updatedAnnouncements;
      console.log(announcements)
      this.setState({open : false, showId : null, announcements : announcements, loading : false})
    }).catch(err => {
      this.setState({error : err})
      console.log(err)
    })
  }
  updateClicked(e,text,id) {
    e.preventDefault();
    console.log(text);
    let updatedAnnouncement = {
      updatedAnnouncement : text
    }
    const modalData = {
      Heading : "Are you sure to update the following announcement:",
      Body : `Are you sure to update the announcement : ${this.state.announcementData}`,
      onContinue : this.updateAnnouncement(id,updatedAnnouncement)
    }
    this.setState({showModal : true, modalData : modalData});
  }
 
  deleteClicked = (e,id) => {
    e.preventDefault();
    this.setState({loading : true});
    axios.delete(`/board/announcements/${id}/archive`)
      .then(response => {
        console.log(response)
        this.setState({announcements : response.data.announcements,loading:false})
      })
      .catch(err => {
        this.setState({error : err});
        console.log(err);
      })
  }

  handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    // this.setState({loading : true})
    this.setState({announcementData : event.target.value})
  }
  render() {
    console.log(this.state.announcementData);
    let announcements;
    let spinner = null;
    let text = this.state.announcementData;
    let modal = null;
    let textForm = (
      <FormControl
                          style={{ height: "30rem", resize: "none" }}
                          componentClass="textarea"
                          placeholder="textarea"
                          // defaultValue= "Click on any announcement"
                          value = {text}
                          readOnly = {false}
                          onChange = {this.handleChange}
                          controlId = "bigMsg"
                        />
      // <input type = "textarea" style = {{height: "30rem", resize: "none"}} value = {text || ""} onChange = {() => console.log(text)} />
    )
    console.log(text)
    console.log(this.state.announcementData);

    if(this.state.loading) {
      spinner = <Spinner />
    }
    if(this.state.showModal && this.state.modalData) {
      modal = (
        <ConfirmModal show = {this.state.showModal} Heading = {this.state.modalData.Heading} 
            Body = {this.state.modalData.Body} onContinue = {this.state.modalData.onContinue} />
      );
    }
    if(this.state.announcements) {
      if(window.innerWidth >= 993) {
        announcements = this.state.announcements.map(el => (
        <Alert bsStyle="info" className="alert-with-icon" key = {el.id}>
          <span data-notify="icon" className="pe-7s-bell" />
          <span data-notify="message">
            {el.body}
            <button className="btn" type="button" style={{border:"none"}} onClick = {(e) => this.fullAnnouncementClicked(e,el.id)}>(Show full announcement)</button>
          </span> 
        </Alert>
      ))
      } else {
        announcements = this.state.announcements.map(el => (
          <Alert bsStyle="info" className="alert-with-icon" key = {el.id}>
              <span data-notify="icon" className="pe-7s-bell" />
              <span data-notify="message">
               {el.body}
                <button className="btn" type="button" 
                  onClick={()=>this.setState({ open: !this.state.open, showId : el.id })} style={{border:"none"}}>
                  (Show full announcement)
                </button>
              </span>
            <Collapse in={this.state.open && this.state.showId === el.id}>
                  <div>
                    <div className="card">
                      <FormGroup controlId="formControlsTextarea">
                          <FormControl
                                style={{ height: "30rem", resize: "none" }}
                                componentClass="textarea"
                                placeholder={el.body}
                                defaultValue={el.body}
                                className = {`message${el.id}`}
                                // id = {`message${el.id}`}
                                controlId = {`message${el.id}`} 
                              />
                      </FormGroup>
                                  
                    </div>
                    <Button className="btn-fill" style={{ marginRight:"10px"}} bsStyle="primary" onClick = {(e) => this.updateClicked(e,document.getElementById("formControlsTextarea").value ,el.id)}>Update</Button>
                    <Button bsStyle="danger" className="btn-fill" onClick = {(e) => this.deleteClicked(e,el.id)}>Delete</Button>
                  </div>                
            </Collapse>
        </Alert>
        ))
      }
      
    }
    //   announcements = 
    //   this.state.announcements.forEach(element => {
    //     console.log(element.body);
    //     return (
    //       <p>Hello</p>
      //   <Alert bsStyle="info" className="alert-with-icon">
      //    <span data-notify="icon" className="pe-7s-bell" />
      //    <span data-notify="message">
      //      {element.body}
      //      <button className="btn" type="button" style={{border:"none"}}>(Show full announcement)</button>
      //    </span> 
      //  </Alert>
    //     );
    //   });
    // }
    
    // console.log(this.state.announcements);
    // announcements.forEach(element => {
    //   return (
    //     <Alert bsStyle="info" className="alert-with-icon">
    //     <span data-notify="icon" className="pe-7s-bell" />
    //     <span data-notify="message">
    //       {element.body}
    //       <button className="btn" type="button" style={{border:"none"}}>(Show full announcement)</button>
    //     </span> 
    //   </Alert>
    //   );
    // });
    if (window.innerWidth >= 993) {
      return (
        <div className="content">
          <Grid fluid>
          {spinner}
          {modal}
          <ConfirmModal />
            <div className="card">
              <div className="header">
                <h4 className="title">Latest Announcements</h4>
              </div>
              
              <div className="content">
                <Row>
                  <Col md={6}>
                    <Button style={{border:"none"}}><Label>+</Label></Button>
                    {announcements}
                    {/* <Alert bsStyle="info" className="alert-with-icon">
                      <span data-notify="icon" className="pe-7s-bell" />
                      <span data-notify="message">
                        This is a notification with close button and icon and have
                        many lines. 
                        <button className="btn" type="button" style={{border:"none"}}>(Show full announcement)</button>
                   
                      </span> 
                    </Alert> */}
                  
                  </Col>
                  <Col md={6}>
                    <h5>Announcement</h5>
                    <div className="card">
                      {/* <div className="content"> */}
                      <FormGroup controlId="formControlsTextarea">
                        {/* <FormControl
                          style={{ height: "30rem", resize: "none" }}
                          componentClass="textarea"
                          // placeholder="textarea"
                          defaultValue={this.state.announcementData}
                        /> */}
                        {textForm}
                      </FormGroup>
                    </div>
                  
                    <Button className="btn-fill" style={{ marginRight:"10px"}} bsStyle="primary" onClick = {(e) => this.updateClicked(e,document.getElementById("formControlsTextarea").value, this.state.showId)}>Update</Button>
                    <Button className="btn-fill" bsStyle="danger">Delete</Button>
                  </Col>
                </Row>
                <br />
                <br />
              </div>
            </div>
          </Grid>
        </div>
      );
    }
    else {
      return (
        <div className="content">
          {spinner}
          {modal}
          <ConfirmModal Heading = "Are you sure to update the following announcement :" Body = "Hello World!" />
          <Grid fluid>
            <div className="card">
              <div className="header">
                <h4 className="title">Latest Announcements</h4>
              </div>
              <div className="content">
                <Row>
                  <Col md={6}>
                    <Button style={{ border: "none" }}><Label>+</Label></Button>
                    {announcements}
                    {/* <Alert bsStyle="info" className="alert-with-icon">
                      <span data-notify="icon" className="pe-7s-bell" />
                      <span data-notify="message">
                        This is a notification with close button and icon and have
                        many lines.
                        <button className="btn" type="button" 
                          onClick={()=>this.setState({ open: !this.state.open })} style={{border:"none"}}>
                          (Show full announcement)
                        </button>
                      </span>
                    <Collapse in={this.state.open}>
                          <div>
                            <div className="card">
                              <FormGroup controlId="formControlsTextarea">
                                  <FormControl
                                        style={{ height: "30rem", resize: "none" }}
                                        componentClass="textarea"
                                        placeholder="textarea"
                                        defaultValue={this.state.announcementData}
                                      />
                              </FormGroup>
                                          
                            </div>
                            <Button className="btn-fill" style={{ marginRight:"10px"}} bsStyle="primary">Edit</Button>
                            <Button bsStyle="danger" className="btn-fill">Delete</Button>
                          </div>                
                    </Collapse>
                    </Alert> */}
                  </Col> 
                </Row>
                <br />
                <br />
              </div>
            </div>
          </Grid>
        </div>
      );
    }
  }
}

export default Announcements;
