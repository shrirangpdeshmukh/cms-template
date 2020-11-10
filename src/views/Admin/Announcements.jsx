
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

import Button from "components/CustomButton/CustomButton";
import axios from "../../axios-root"

class Announcements extends Component {
  state = {
      open: false,
      announcements: null,
      error:null,
      announcementData: 'Hello'                   
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

  fullAnnouncementClicked(e,id) {
    e.preventDefault();
    const announcement = this.state.announcements.find(a => a.id === id);
    console.log(this.state.announcements);
    console.log(announcement);
    this.setState({announcementData : announcement});
  }  

 
  render() {
    let announcements;
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
                                placeholder={el.body}
                                // defaultValue={this.state.announcementData}
                                defaultValue={el.body}
                              />
                      </FormGroup>
                                  
                    </div>
                    <Button className="btn-fill" style={{ marginRight:"10px"}} bsStyle="primary">Update</Button>
                    <Button bsStyle="danger" className="btn-fill">Delete</Button>
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
                        <FormControl
                          style={{ height: "30rem", resize: "none" }}
                          componentClass="textarea"
                          placeholder="textarea"
                          defaultValue={this.state.announcementData}
                        />
                      </FormGroup>
                    </div>
                  
                    <Button className="btn-fill" style={{ marginRight:"10px"}} bsStyle="primary" onClick = {(e) => this.handleClick(e)}>Update</Button>
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
