import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  Modal,
  Image,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";

import { Card } from "components/Cards/Card/Card";
import axios from "../../axios-root";
import { Route, Router } from "react-router";
import TaskLayout from "../../layouts/TaskLayout";
import { AiFillPlusCircle } from "react-icons/ai";
import ActionModalButtons from "../../components/CustomButton/ActionModalButtons/ActionModalButtons";
import Spinner from "../../components/Spinner/Spinner";
import ResponseModal from "../../components/Modals/ResponseModal/ResponseModal";
import checkValidity from "../../variables/validityRules";
import InputElements from "../../components/Form/InputElements/InputElements";

class Topics extends Component {
  state = {
    topics: null,
    error: null,
    updatedTime: null,
    userData: null,
    editTopic: null,
    formIsValid: true,
    showModal: false,
    showResponse: false,
    loading: false,
    editDropDownTitle: "Scope",
    editDropDownValue: null,
    currentEditingTopic: null,
    createForm: null,
    showCreate: false,
    createDropDownTitle: "Scope",
    createDropDownValue: null,
  };
  componentDidMount() {
    axios
      .get(`/board/topics/`)
      .then((response) => {
        console.log(response.data.topics);
        console.log(this.props);
        this.setState({
          topics: response.data.topics,
          updatedTime: Date.now(),
        });
      })
      .catch((err) => this.setState({ error: true }));
  }

  editInputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.editTopic,
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

    this.setState({ editTopic: updatedForm, formIsValid: formIsValid });
  };

  getTaskDetails = (id) => {
    this.setState({ showModal: true });
    axios
      .get(`/board/topics/${id}`)
      .then((response) => {
        console.log(response.data.topic);
        const res = response.data.topic;

        const updatedForm = {
          heading: {
            elementType: "input",
            elementConfig: {
              type: "text",
              id: "edit",
              placeholder: "Topic Heading",
            },
            value: null,
            default: "",
            icon: "points",
            validation: {
              required: true,
            },
            valid: true,
            touched: true,
          },

          description: {
            elementType: "input",
            elementConfig: {
              type: "text",
              id: "description",
              placeholder: "Topic Description",
            },
            value: null,
            default: "",
            icon: "reason",
            validation: {
              required: true,
            },

            valid: true,
            touched: true,
          },
        };

        updatedForm.heading.value = res.heading;
        updatedForm.heading.default = res.heading;
        updatedForm.description.value = res.description;
        updatedForm.description.default = res.description;

        let dropDownUpdate;
        if (res.scope === "superAdmin") {
          dropDownUpdate = { title: "Super Admins Only", value: res.scope };
        } else if (res.scope === "admin") {
          dropDownUpdate = { title: "Admin Only", value: res.scope };
        } else if (res.scope === "member") {
          dropDownUpdate = { title: "All Members", value: res.scope };
        } else if (res.scope === "private") {
          dropDownUpdate = { title: "Private Members", value: res.scope };
        }

        this.setState({
          editTopic: updatedForm,
          editDropDownTitle: dropDownUpdate.title,
          editDropDownValue: dropDownUpdate.value,
          currentEditingTopic: res.id,
        });
      })
      .catch((error) => console.log(error));
  };

  editTopicHandler = (event) => {
    event.preventDefault();
    this.setState({ showModal: false, loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.editTopic) {
      formData[formElementIdentifier] = this.state.editTopic[
        formElementIdentifier
      ].value;
    }
    formData.scope = this.state.editDropDownValue;

    axios
      .patch(`board/topics/${this.state.currentEditingTopic}`, formData)
      .then((res) => {
        console.log(res);

        let message = "Update Successful";
        const modalData = {
          title: "Success",
          message: message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ showResponse: false });
            window.location.reload(false);
          },
        };

        this.setState({
          loading: false,
          showResponse: true,
          modalData: modalData,
          formIsValid: false,
          currentEditingTopic: null,
          editTopic: null,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          formIsValid: false,
          currentEditingTopic: null,
          editTopic: null,
        });
      });
  };

  toChatHandler = (topicId) => {
    let taskId = 1;
    axios
      .get(`/board/topics/${topicId}/tasks/`)
      .then((response) => {
        taskId = response.data.tasks[0].id;
      })
      .catch((err) => console.log(err));

    this.props.history.push(`/task/${topicId}/${taskId}`);
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    let addTopic = null;
    addTopic = (
      <Button
        style={{ border: "0.05px solid #ccc", size: "1.5em" }}
        onClick={() => console.log("Topic")}
      >
        <AiFillPlusCircle style={{ marginRight: "5%" }} />
        Add New Topic
      </Button>
    );

    const editTopicForm = [];
    for (let key in this.state.editTopic) {
      editTopicForm.push({
        id: key,
        config: this.state.editTopic[key],
      });
    }

    let editModal = null;
    editModal = (
      <Modal show={this.state.showModal} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={1} md={1} sm={1}></Col>
            <Col lg={10} md={10} sm={10}>
              {editTopicForm.map((formElement) => (
                <InputElements
                  key={formElement.id}
                  element={formElement}
                  changeHandler={this.editInputChangedHandler}
                />
              ))}
              <DropdownButton
                style={{ marginLeft: "15%" }}
                title={this.state.editDropDownTitle}
                id="scope-topic"
                // bsStyle="success"
              >
                <MenuItem
                  onClick={() => {
                    this.setState({
                      editDropDownTitle: "All Members",
                      editDropDownValue: "member",
                    });
                  }}
                >
                  All Members
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.setState({
                      editDropDownTitle: "Super Admins Only",
                      editDropDownValue: "superAdmin",
                    });
                  }}
                >
                  Super Admins Only
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.setState({
                      editDropDownTitle: "Admins Only",
                      editDropDownValue: "admin",
                    });
                  }}
                >
                  Admins Only
                </MenuItem>
              </DropdownButton>
            </Col>
            <Col lg={1} md={1} sm={1}></Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <ActionModalButtons
            disabled={!this.state.formIsValid || !this.state.editDropDownValue}
            submit={this.editTopicHandler}
            cancel={this.hideModal}
            yes="Update"
            no="Close"
          />
        </Modal.Footer>
      </Modal>
    );

    let adminTopics = null;
    let userTopics = null;
    if (this.state.topics) {
      adminTopics = this.state.topics.map((topic) => {
        if (topic.scope == "superAdmin" || topic.scope == "admin") {
          let date = new Date(parseInt(topic.timestamp))
            .toString()
            .split("GMT")[0];
          let stats = `Created At ${date}`;
          if (topic.updated_at) {
            date = new Date(parseInt(topic.updated_at))
              .toString()
              .split("GMT")[0];
            stats = `Last Updated At ${date}`;
          }
          return (
            <Col md={4} sm={12} key={topic.id}>
              <Card
                toChat={() => this.toChatHandler(topic.id)}
                statsIcon="fa fa-history"
                id="chartHours"
                title={topic.heading}
                category=""
                stats={stats}
                style={{
                  border: "0.1px dashed",
                  margin: "2px",
                  marginBottom: "20px",
                }}
                content={<div className="description">{topic.description}</div>}
                topicEdit={true}
                topicEditLink={() => {
                  this.getTaskDetails(topic.id);
                }}
              />
            </Col>
          );
        }
      });

      userTopics = this.state.topics.map((topic) => {
        if (topic.scope != "superAdmin" && topic.scope != "admin") {
          let date = new Date(parseInt(topic.timestamp))
            .toString()
            .split("GMT")[0];
          let stats = `Created At ${date}`;
          if (topic.updated_at) {
            date = new Date(parseInt(topic.updated_at))
              .toString()
              .split("GMT")[0];
            stats = `Last Updated At ${date}`;
          }
          return (
            <Col md={4} sm={12} key={topic.id}>
              <Card
                toChat={() => this.toChatHandler(topic.id)}
                statsIcon="fa fa-history"
                id="chartHours"
                title={topic.heading}
                // category="Created by: Shrirang"
                stats={stats}
                topicEdit={true}
                topicEditLink={() => {
                  this.getTaskDetails(topic.id);
                }}
                content={<div className="description">{topic.description}</div>}
              />
            </Col>
          );
        }
      });
    }

    let responseModal = null;

    if (this.state.modalData)
      responseModal = (
        <ResponseModal
          show={this.state.showResponse}
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
          {addTopic}
          {responseModal}
          {editModal}
          <Card
            id="AdminCards"
            title="Admin Scope Topics"
            hCenter
            topicCard
            content={<Row>{adminTopics}</Row>}
          />

          <Card
            id="UserCards"
            title="User Scope Topics"
            hCenter
            topicCard
            content={<Row>{userTopics}</Row>}
          />
        </Grid>
      </div>
    );
  }
}

export default Topics;
