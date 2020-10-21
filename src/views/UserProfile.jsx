/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import DropDown from "./userDropDown.jsx";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard2.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import Table from "./pointTransactionTable";
import BlacklistUserContent from './Modal/modalContents/blacklistUserContent';
import DeleteUserContent from './Modal/modalContents/deletingUserContent';
import Modal from './Modal/Modal';

class UserProfile extends Component {
  state = {
    blacklistingUser : 0,
    deletingUser : 0
  }

 
  removeModal = () => {
    this.setState({
      blacklistingUser : 0,
      deletingUser : 0
    })
  }

  deleteUserClicked = () => {
    this.setState({deletingUser : 1})
  }

  blacklistUserClicked = () => {
    this.setState({blacklistingUser : 1})
  }
  render() {
    let list = {
      "Blacklist" : "#",
      "changeDesignation" : "#",
      "changeRole" : "#",
      "deleteUser" : "#",
      "awardPoints" : "#"
    }

    return (
      <div className="content">
        <Grid fluid>
          <Row>  
            <Col md={8}>
                <Table />
            </Col>
            <Modal show = {this.state.blacklistingUser} clicked = {this.removeModal}>
              <BlacklistUserContent />
            </Modal>
            
            <Modal show = {this.state.deletingUser} clicked = {this.removeModal}>
              <DeleteUserContent />
            </Modal>
            <DropDown title = "Admin Options" deleteUserClicked = {this.deleteUserClicked} blacklistUserClicked = {this.blacklistUserClicked}/>
            <Col md={4}>
            <UserCard name = "Bysani Navaneeth" 
            email = "brn14@iitbbs.ac.in" 
            rank = "10" 
            bio = "I am Navaneeth Bysani, sophomore at IIT BBS"
            role = "superAdmin"
            designation="core-team"
            points = "135"
            />
            
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;