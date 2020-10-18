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
  ListGroupItem,
  ListGroup,
  Badge,
} from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import CustomButton from "../components/CustomButton/CustomButton";

class AllUsers extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Super Admin(s)"
                hCenter
                //category="Created using Roboto Font Family"
                content={
                  <div>
                    <hr></hr>
                    <ListGroup>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderTop: 0,
                          borderRight: 0,
                          borderLeft: 0,
                          fontSize: 20,
                          borderLeft: 0,
                        }}
                      >
                        User <Badge>designation</Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderRight: 0,
                          fontSize: 20,
                          borderLeft: 0,
                        }}
                      >
                        User <Badge>designation</Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderRight: 0,
                          fontSize: 20,
                          borderLeft: 0,
                        }}
                      >
                        User <Badge>designation</Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderRight: 0,
                          fontSize: 20,
                          borderLeft: 0,
                        }}
                      >
                        User <Badge>designation</Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderRight: 0,
                          borderBottom: 0,
                          borderLeft: 0,
                          fontSize: 20,
                        }}
                      >
                        User <Badge>designation</Badge>
                      </ListGroupItem>
                    </ListGroup>
                  </div>
                }
              />
              <Card
                title="Admins"
                hCenter
                //category="Created using Roboto Font Family"
                content={
                  <div>
                    <hr></hr>
                    <ListGroup>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderTop: 0,
                          borderRight: 0,
                          borderLeft: 0,
                          fontSize: 20,
                          borderLeft: 0,
                        }}
                      >
                        User dasfadxasf<Badge>designation</Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderRight: 0,
                          fontSize: 20,
                          borderLeft: 0,
                        }}
                      >
                        User asfsdvsfbdgndgjhdghsdga
                        <Badge>designation</Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderRight: 0,
                          fontSize: 20,
                          borderLeft: 0,
                        }}
                      >
                        User aDaxsxaDASDC<Badge>designation</Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderRight: 0,
                          fontSize: 20,
                          borderLeft: 0,
                        }}
                      >
                        User sadasdasd<Badge>designation</Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => alert("clicked")}
                        style={{
                          borderBottom: 0,
                          borderRight: 0,
                          fontSize: 20,
                          borderLeft: 0,
                        }}
                      >
                        User SDADXSDASDa<Badge>designation</Badge>
                      </ListGroupItem>
                    </ListGroup>
                  </div>
                }
              />
              <Card
                title="Members"
                hCenter
                //category="Created using Roboto Font Family"
                content={
                  <div>
                    <hr></hr>
                   
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AllUsers;
