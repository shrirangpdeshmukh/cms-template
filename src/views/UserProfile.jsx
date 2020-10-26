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
import Table from "./pointTransactionTable.jsx";
import BlacklistUserContent from "./Modal/modalContents/blacklistUserContent";
import DeleteUserContent from "./Modal/modalContents/deletingUserContent";
import Modal from "./Modal/Modal";
import axios from "../axios-root";

class UserProfile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      blacklistingUser: 0,
      deletingUser: 0,
      user: null,
    };
  }
  
  

  componentDidMount() {
    
    let path="/users/9";
    
    
    
    if (this.props.match.path.includes("/profile")) {
    const cookies = this.props.cookies.cookies;
      
    const auth = cookies.isAuthenticated;
    const userData = cookies.userData;

    if (auth && userData && userData !== "undefined") {
      const authJSON = JSON.parse(auth);
      const userDataJSON = JSON.parse(userData);

      console.log(userDataJSON);
      if (authJSON && userDataJSON) {
        path=`/users/${userDataJSON.user.id}`
        console.log(path);
      }}
    
    }
    console.log(this.props.match);
    if (this.props.match.path.includes("/user")) {
      path = `/users/${this.props.match.params.id}`
    }
    
    // console.log(path);
    
    axios
      .get(path)
      .then((response) => {
        console.log(response);
        this.setState({ user: response.data.user });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeModal = () => {
    this.setState({
      blacklistingUser: 0,
      deletingUser: 0,
    });
  };

  deleteUserClicked = () => {
    this.setState({ deletingUser: 1 });
  };

  blacklistUserClicked = () => {
    this.setState({ blacklistingUser: 1 });
  };
  render() {
    let list = {
      Blacklist: "#",
      changeDesignation: "#",
      changeRole: "#",
      deleteUser: "#",
      awardPoints: "#",
    };

    let data = null;
    if (this.state.user) {
      data = (
        <UserCard
          name={this.state.user.name}
          email={this.state.user.email}
          rank={this.state.user.current_rank}
          bio={this.state.user.bio}
          role={this.state.user.role}
          designation={this.state.user.designation}
          points={this.state.user.points}
        />
      );
    }
    
    
    let table =null;
    if (this.state.user) {
      if (this.state.user.tracking_points && this.state.user.allotments) {
        // if (this.state.user.allotments.length >0) {
          table=<Table details={this.state.user.allotments}/>
        // }
      }
    }
    
    
    let dropdown =null;
    
    const cookies = this.props.cookies.cookies;
    

    const auth = cookies.isAuthenticated;
    const userData = cookies.userData;

    if (auth && userData && userData !== "undefined") {
      const authJSON = JSON.parse(auth);
      const userDataJSON = JSON.parse(userData);

      if (authJSON && userDataJSON) {
        const userRole = userDataJSON.user.role;

        if (userRole === "admin" || userRole === "superAdmin") {
          dropdown = (
            <DropDown
            title="Admin Options"
            deleteUserClicked={this.deleteUserClicked}
            blacklistUserClicked={this.blacklistUserClicked}
          />
          );
        }
      }
    }
    
    
    
    
    

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              {table}
            </Col>
            <Modal
              show={this.state.blacklistingUser}
              clicked={this.removeModal}
            >
              <BlacklistUserContent />
            </Modal>

            <Modal show={this.state.deletingUser} clicked={this.removeModal}>
              <DeleteUserContent />
            </Modal>
            {dropdown}
            <Col md={4}>{data}</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
