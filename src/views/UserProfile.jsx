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
import {
  Grid,
  Row,
  Col,
  DropdownButton,
  MenuItem,
  Modal,
  ButtonGroup,
  Image,
} from "react-bootstrap";

import { UserCard } from "components/UserCard/UserCard2.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Table from "./pointTransactionTable.jsx";
import InputElements from "../components/Form/InputElements/InputElements";
import ResponseModal from "../components/ResponseModal/ResponseModal";
import Spinner from "../components/Spinner/Spinner";

import award from "../assets/img/award.png";

import axios from "../axios-root";

import checkValidity from "../variables/validityRules";
import { ChangeDesignation, AwardPoints } from "../variables/forms";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awardPoints: AwardPoints,
      changeDesignation: ChangeDesignation,
      formIsValid: false,
      showModal: 0,
      user: null,
      loading: false,
    };
  }

  componentDidMount() {
    let path = "/users/9";

    if (this.props.match.path.includes("/profile")) {
      const cookies = this.props.cookies.cookies;

      const auth = cookies.isAuthenticated;
      const userData = cookies.userData;

      if (auth && userData && userData !== "undefined") {
        const authJSON = JSON.parse(auth);
        const userDataJSON = JSON.parse(userData);

        console.log(userDataJSON);
        if (authJSON && userDataJSON) {
          path = `/users/${userDataJSON.user.id}`;
        }
      }
    }

    if (this.props.match.path.includes("/user")) {
      path = `/users/${this.props.match.params.id}`;
    }

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

  hideModals = () => {
    this.setState({ showModal: 0 });
    window.location.reload(false);
  };

  awardPointsClicked = () => {
    this.setState({ showModal: 1 });
  };

  awardInputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.awardPoints,
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    let formIsValid = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ awardPoints: updatedForm, formIsValid: formIsValid });
  };

  awardPoints = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.awardPoints) {
      formData[formElementIdentifier] = this.state.awardPoints[
        formElementIdentifier
      ].value;
    }

    axios
      .patch(`users/${this.state.user.id}/awardPoints`, formData)
      .then((res) => {
        
        let message= res.data.message.toLowerCase().split(' ').map(function(word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
        const modalData = {
          title: "Success",
          message: message,
          Button: "success",
          img:"success",
          hide: this.hideModals,
        };        
        
        this.setState({
          loading: false,
          showModal: 8,
          modalData: modalData,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const changeDesignationForm = [];
    for (let key in this.state.changeDesignation) {
      changeDesignationForm.push({
        id: key,
        config: this.state.changeDesignation[key],
      });
    }

    const awardPointsForm = [];
    for (let key in this.state.awardPoints) {
      awardPointsForm.push({
        id: key,
        config: this.state.awardPoints[key],
      });
    }

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

    let dropdown = null;
    let awardPointsModal = null;

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
            <DropdownButton
              bsStyle="success"
              title="Admin Actions"
              pullRight
              className="btn-fill"
              id="admin-actions"
            >
              <MenuItem eventKey="1" onClick={this.awardPointsClicked}>
                Award Points
              </MenuItem>
              <MenuItem eventKey="2">Change Role</MenuItem>
              <MenuItem eventKey="3">Change Designation</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Blacklist User</MenuItem>
              <MenuItem eventKey="5">Delete User</MenuItem>
            </DropdownButton>
          );

          if (this.state.user !== null) {
            awardPointsModal = (
              <Modal show={this.state.showModal === 1} onHide={this.hideModals}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Award Points to <b> {this.state.user.name}</b>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col lg={8} md={8} sm={10}>
                      {awardPointsForm.map((formElement) => (
                        <InputElements
                          key={formElement.id}
                          element={formElement}
                          changeHandler={this.awardInputChangedHandler}
                        />
                      ))}
                    </Col>
                    <Col lg={4} md={4}>
                      <Image
                        src={award}
                        rounded
                        style={{
                          height: "100%",
                          width: "90%",
                          marginLeft: "5%",
                          marginTop: "5px",
                          marginRight: "5%",
                        }}
                      ></Image>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <ButtonGroup>
                    <Button
                      disabled={!this.state.formIsValid}
                      bsStyle="success"
                      className="btn-fill"
                      style={{ padding: "5px", margin: "5px" }}
                      onClick={this.awardPoints}
                    >
                      Award
                    </Button>
                    <Button
                      bsStyle="danger"
                      className="btn-fill"
                      style={{ padding: "5px", margin: "5px" }}
                      onClick={this.hideModals}
                    >
                      Close
                    </Button>
                  </ButtonGroup>
                </Modal.Footer>
              </Modal>
            );
          }
        }
      }
    }

    let table = null;
    if (this.state.user) {
      if (this.state.user.tracking_points && this.state.user.allotments) {
        if (this.state.user.allotments.length > 0) {
          table = <Table details={this.state.user.allotments} />;
        }
      }
    }
    
    let responseModal = null;
    
    if (this.state.loading) {
      responseModal = <Spinner />;
    }
    
    if (this.state.modalData)
      responseModal = (
        <ResponseModal
          show={this.state.showModal===8}
          onHide={this.state.modalData.hide}
          title={this.state.modalData.title}
          body={this.state.modalData.message}
          button={this.state.modalData.Button}
          img={this.state.modalData.img}
        />
      );
    
    

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>{table}</Col>

            {/* <Modal
              show={this.state.blacklistingUser}
              clicked={this.removeModal}
            >
              <BlacklistUserContent />
            </Modal>

            <Modal show={this.state.deletingUser} clicked={this.removeModal}>
              <DeleteUserContent />
            </Modal> */}
            {dropdown}
            {awardPointsModal}
            {responseModal}
            <Col md={4}>{data}</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
