import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card";
import axios from "../axios-root";
import { Route, Router } from "react-router";
import TaskLayout from "../layouts/TaskLayout";

class Topics extends Component {
  state = {
    topics: null,
    error: null,
    updatedTime: null,
    userData:null
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
  render() {
    let adminTopics = null;
    let userTopics = null;
    if (this.state.topics) {
      adminTopics = this.state.topics.map((topic) => {
        if (topic.scope == "superAdmin" || topic.scope == "admin") {
         
          return (
            <Col md={4} sm={12} key={topic.id}>
              <Card
                toChat={() => this.toChatHandler(topic.id)}
                statsIcon="fa fa-history"
                id="chartHours"
                title={topic.heading}
                category="Created by: Shrirang"
                stats={`Updated ${Date.now() - this.state.updatedTime} seconds ago`}
                style={{
                  border: "0.1px dashed",
                  margin: "2px",
                  marginBottom: "20px",
              
                }}
                content={<div className="description" >{topic.description}</div>}
              />
            </Col>
          )
        }
      });
      
      userTopics = this.state.topics.map((topic) => {
        if (topic.scope != "superAdmin" && topic.scope != "admin") {
         
          return (
            <Col md={4} sm={12} key={topic.id}>
              <Card
                    toChat={() => this.toChatHandler(topic.id)}
                    statsIcon="fa fa-history"
                    id="chartHours"
                    title={topic.heading}
                    category="Created by: Shrirang"
                    stats="Updated 3 minutes ago"
                    content={
                      <div className="description">{topic.description}</div>
                    }
                  />
                </Col>
          )
        }
    });
    }
    return (
      <div className="content">
        <Grid fluid>
          <Card
            id="AdminCards"
            title="Admin Scope Topics"
            hCenter
            topicCard
            content={
              <Row>
                {adminTopics}
              </Row>
            }
          />

          <Card
            id="UserCards"
            title="User Scope Topics"
            hCenter
            topicCard
            content={
              <Row>
               {userTopics}
              </Row>
            }
          />
        </Grid>
      </div>
    );
  }
}

export default Topics;
