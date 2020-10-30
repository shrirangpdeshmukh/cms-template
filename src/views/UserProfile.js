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
import Table from "./pointTransactionTable.jsx";
import InputElements from "../components/Form/InputElements/InputElements";
import ResponseModal from "../components/ResponseModal/ResponseModal";
import Spinner from "../components/Spinner/Spinner";
import ActionModalButtons from "../components/ActionModalButtons/ActionModalButtons";

import award from "../assets/img/award.png";
import designation from "../assets/img/designation.png";
import TableAbsent from './tableAbsent';

import axios from "../axios-root";

import checkValidity from "../variables/validityRules";
import { ChangeDesignation, AwardPoints } from "../variables/forms";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awardPoints: AwardPoints,
      changeDesignation: ChangeDesignation,
      dropDownValue: "New Role",
      newRole: null,
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

    if (
      this.props.match.path.includes("/user") &&
      this.props.match.params.id !== ":id"
    ) {
      path = `/users/${this.props.match.params.id}`;
    }

    axios
      .get(path)
      .then((response) => {
        this.setState({ user: response.data.user });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  hideModals = () => {
    this.setState({
      showModal: 0,
      formIsValid: false,
      newRole: null,
      dropDownValue: "New Role",
    });
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
        let message = res.data.message
          .toLowerCase()
          .split(" ")
          .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
        const modalData = {
          title: "Success",
          message: message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ showModal: 0 });
            window.location.reload(false);
          },
        };

        this.setState({
          loading: false,
          showModal: 8,
          modalData: modalData,
          formIsValid: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          formIsValid: false,
        });
      });
  };

  changeRole = (e) => {
    this.setState({ loading: true });

    axios
      .patch(`/users/${this.state.user.id}/changeRole`, {
        role: this.state.newRole,
      })
      .then((res) => {
        let message = res.data.message
          .toLowerCase()
          .split(" ")
          .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
        const modalData = {
          title: "Success",
          message: message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ showModal: 0 });
            window.location.reload(false);
          },
        };

        this.setState({
          loading: false,
          showModal: 8,
          modalData: modalData,
          newRole: null,
          dropDownValue: "New Role",
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          newRole: null,
          dropDownValue: "New Role",
        });
        console.log(err);
      });
  };

  designationInputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.changeDesignation,
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

    this.setState({ changeDesignation: updatedForm, formIsValid: formIsValid });
  };

  designationChange = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.changeDesignation) {
      formData[formElementIdentifier] = this.state.changeDesignation[
        formElementIdentifier
      ].value;
    }

    axios
      .patch(`users/${this.state.user.id}/changeDesignation`, formData)
      .then((res) => {
        let message = res.data.message
          .toLowerCase()
          .split(" ")
          .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
        const modalData = {
          title: "Success",
          message: message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ showModal: 0 });
            window.location.reload(false);
          },
        };

        this.setState({
          loading: false,
          showModal: 8,
          modalData: modalData,
          formIsValid: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          formIsValid: false,
        });
      });
  };

  blacklistUser = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    axios
      .patch(`users/${this.state.user.id}/blacklist`)
      .then((res) => {
        let message = res.data.message
          .toLowerCase()
          .split(" ")
          .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
        const modalData = {
          title: "Success",
          message: message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ showModal: 0 });
            window.location.reload(false);
          },
        };

        this.setState({
          loading: false,
          showModal: 8,
          modalData: modalData,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    // Modal Forms
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

    //User Card
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

    //Required Modals and DropDown for Actions

    const actions = [
      { title: "Award Points", number: 1 },
      { title: "Change Role", number: 2 },
      { title: "Change Designation", number: 3 },
    ];

    let dropdown = null;
    let awardPointsModal = null;
    let changeRoleModal = null;
    let changeDesignationModal = null;
    let blacklistUserModal = null;
    

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
              {actions.map((action) => {
                return (
                  <MenuItem
                    key={action.number}
                    eventKey={action.number}
                    onClick={() => this.setState({ showModal: action.number })}
                  >
                    {action.title}
                  </MenuItem>
                );
              })}
              <MenuItem divider />
              {!this.state.user ? null : (
                <MenuItem
                  eventKey="4"
                  onClick={() => this.setState({ showModal: 4 })}
                >
                  {this.state.user.blacklisted ? "Whitelist" : "Blacklist"} User
                </MenuItem>
              )}
              {/* <MenuItem
                eventKey="5"
                onClick={() => this.setState({ showModal: 5 })}
              >
                Delete User
              </MenuItem> */}
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
                  <ActionModalButtons
                    disabled={!this.state.formIsValid}
                    submit={this.awardPoints}
                    cancel={this.hideModals}
                    yes="Award"
                    no="Close"
                  />
                </Modal.Footer>
              </Modal>
            );
          }
        }

        if (userRole === "superAdmin") {
          if (this.state.user) {
            let roleOptions;

            if (this.state.user.role === "superAdmin")
              roleOptions = ["Admin", "admin", "Member", "user"];
            else if (this.state.user.role === "admin")
              roleOptions = ["Super Admin", "superAdmin", "Member", "user"];
            else if (this.state.user.role === "user")
              roleOptions = ["Super Admin", "superAdmin", "Admin", "admin"];

            changeRoleModal = (
              <Modal
                show={this.state.showModal === 2}
                onHide={this.hideModals}
                bsSize="small"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Change Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Grid fluid>
                    <p>
                      <b style={{ fontSize: "1.2em" }}>Name:</b> &nbsp;{" "}
                      {this.state.user.name}
                      <br />
                      <b style={{ fontSize: "1.2em" }}>
                        Current Role:
                      </b> &nbsp; {this.state.user.role}{" "}
                    </p>

                    <br />
                    <br />

                    <DropdownButton
                      bsStyle="primary"
                      title={this.state.dropDownValue}
                      className="btn-fill"
                      id="new-role"
                    >
                      <MenuItem
                        eventKey={roleOptions[1]}
                        onClick={() =>
                          this.setState({
                            dropDownValue: roleOptions[0],
                            newRole: roleOptions[1],
                          })
                        }
                      >
                        {roleOptions[0]}
                      </MenuItem>
                      <MenuItem
                        eventKey={roleOptions[3]}
                        onClick={() =>
                          this.setState({
                            dropDownValue: roleOptions[2],
                            newRole: roleOptions[3],
                          })
                        }
                      >
                        {roleOptions[2]}
                      </MenuItem>
                    </DropdownButton>
                  </Grid>
                </Modal.Body>
                <Modal.Footer>
                  <ActionModalButtons
                    disabled={!this.state.newRole}
                    submit={this.changeRole}
                    cancel={this.hideModals}
                    yes="Change"
                    no="Cancel"
                  />
                </Modal.Footer>
              </Modal>
            );

            changeDesignationModal = (
              <Modal show={this.state.showModal === 3} onHide={this.hideModals}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Designation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col lg={8} md={8} sm={10}>
                      <br />
                      <br />
                      {changeDesignationForm.map((formElement) => (
                        <InputElements
                          key={formElement.id}
                          element={formElement}
                          changeHandler={this.designationInputChangedHandler}
                        />
                      ))}
                    </Col>
                    {window.innerWidth > 991 ? (
                      <Col lg={4} md={4}>
                        <Image
                          src={designation}
                          rounded
                          style={{
                            height: "80%",
                            width: "80%",
                            marginLeft: "5%",
                            marginTop: "5px",
                            marginRight: "5%",
                          }}
                        ></Image>
                      </Col>
                    ) : null}
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <ActionModalButtons
                    disabled={!this.state.formIsValid}
                    submit={this.designationChange}
                    cancel={this.hideModals}
                    yes="Change"
                    no="Close"
                  />
                </Modal.Footer>
              </Modal>
            );

            blacklistUserModal = (
              <Modal show={this.state.showModal === 4} onHide={this.hideModals}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {this.state.user.blacklisted ? "Whitelist" : "Blacklist"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>{`Are you sure you want to ${
                    this.state.user.blacklisted ? "Whitelist" : "Blacklist"
                  } the user ?`}</p>
                  <hr />
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <b>Name : </b>
                        </td>
                        <td>{this.state.user.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Email :</b>
                        </td>
                        <td>{this.state.user.email}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                </Modal.Body>
                <Modal.Footer>
                  <ActionModalButtons
                    disabled={false}
                    submit={this.blacklistUser}
                    cancel={this.hideModals}
                    yes="Yes, Go Ahead"
                    no="No, Go Back"
                  />
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
        } else {
          table = <TableAbsent />
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
          show={this.state.showModal === 8}
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
            <Col md={4}>
              {dropdown}
              {awardPointsModal}
              {changeRoleModal}
              {changeDesignationModal}
              {blacklistUserModal}
              {responseModal}
              {data}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;