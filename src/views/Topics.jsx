import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import axios from '../axios-root'
import { Route, Router } from "react-router";
import ChatLayout from '../layouts/ChatLayout'

class Topics extends Component {
  state = {
    topics: null,
    error: null,
    updatedTime:null
  }
  componentDidMount() {
    axios.get(`/board/topics/`).then(response => {
      console.log(response.data.topics)
      console.log(this.props)
      this.setState({ topics: response.data.topics, updatedTime:Date.now() })
      
    }).catch(err=>this.setState({error:true}))
  }

  toChatHandler = (topicId) => {

    this.props.history.push(`/chat/?topic=${topicId}`)
  }
  render() {
    let topics = null
    if (this.state.topics) {
      topics = this.state.topics.map(topic => (
        <Col md={4} sm={12}>
          
          <Card
                    toChat={()=>this.toChatHandler(topic.id)}
                    statsIcon="fa fa-history"
                    id="chartHours"
                    title={topic.heading}
                    category="Created by: Shrirang"
                    stats={`Updated ${(Date.now()-this.state.updatedTime)} seconds ago`}
                    style={{
                      border: "0.1px dashed",
                      margin: "2px",
                      marginBottom: "20px",
                    }}
                    content={
                      <div className="description">
                        {topic.description}
                      </div>
                    }
                  />
                </Col>

      ))
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
                {topics}
                <Col md={4} sm={12}>
                  <Card
                    statsIcon="fa fa-history"
                    id="chartHours"
                    title="Topic Test: Template Selections"
                    category="Created by: Shrirang"
                    stats="Updated 3 minutes ago"
                    style={{
                      border: "0.1px dashed",
                      margin: "2px",
                      marginBottom: "20px",
                    }}
                    content={
                      <div className="description">
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                      </div>
                    }
                  />
                </Col>
                
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
                <Col md={4} sm={12}>
                  <Card
                    statsIcon="fa fa-history"
                    id="chartHours"
                    title="Topic Test: Template Selections"
                    category="Created by: Shrirang"
                    stats="Updated 3 minutes ago"
                    content={
                      <div className="description">
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                      </div>
                    }
                  />
                </Col>
                <Col md={4} sm={12}>
                  <Card
                    statsIcon="fa fa-history"
                    id="chartHours"
                    title="Topic Test: Template Selections"
                    category="Created by: Shrirang"
                    stats="Updated 3 minutes ago"
                    content={
                      <div className="description">
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                      </div>
                    }
                  />
                </Col>
                <Col md={4} sm={12}>
                  <Card
                    statsIcon="fa fa-history"
                    id="chartHours"
                    title="Topic Test: Template Selections"
                    category="Created by: Shrirang"
                    stats="Updated 3 minutes ago"
                    content={
                      <div className="description">
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                      </div>
                    }
                  />
                </Col>
                <Col md={4} sm={12}>
                  <Card
                    statsIcon="fa fa-history"
                    id="chartHours"
                    title="Topic Test: Template Selections"
                    category="Created by: Shrirang"
                    stats="Updated 3 minutes ago"
                    content={
                      <div className="description">
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                        This topic is secltion of tempaltes for CMS Neuromancers
                      </div>
                    }
                  />
                </Col>
              </Row>
            }
          />
        </Grid>
      </div>
    );
  }
}

export default Topics;
