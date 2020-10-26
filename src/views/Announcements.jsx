
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

import Button from "components/CustomButton/CustomButton.jsx";
import axios from "../axios-root"

class Announcements extends Component {
  state = {
      open: false,
      announcements: null,
    error:null,
    announcementData:null
                       
  }
  
    componentDidMount() {
        axios.get('/board/announcements').then(response => {
          this.setState({ announcements: response.data.announcements })
          console.log(this.state.announcements)
        }).catch(err => {
            this.setState({error:err})
        })
    }
    
  render() {
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
                    <Alert bsStyle="info" className="alert-with-icon">
                      <span data-notify="icon" className="pe-7s-bell" />
                      <span data-notify="message">
                        This is a notification with close button and icon and have
                        many lines. <button className="btn" type="button" style={{border:"none"}}>(Show full announcement)</button>
                   
                      </span>
                     
          
                      
                    </Alert>
                  
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
                  
                    <Button className="btn-fill" style={{ marginRight:"10px"}} bsStyle="primary">Edit</Button>
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
                    <Alert bsStyle="info" className="alert-with-icon">
                      <span data-notify="icon" className="pe-7s-bell" />
                      <span data-notify="message">
                        This is a notification with close button and icon and have
                        many lines.<button className="btn" type="button" onClick={()=>this.setState({ open: !this.state.open })} style={{border:"none"}}>(Show full announcement)</button>
                    </span>
                   <Collapse in={this.state.open}>
          <div>
            
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
             <Button className="btn-fill" style={{ marginRight:"10px"}} bsStyle="primary">Edit</Button>
                    <Button bsStyle="danger" className="btn-fill">Delete</Button>
                        </div>
                        
        </Collapse>
                    </Alert>
                  
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
