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
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import axios from "../axios-root";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = { board: [] };
  }
  componentDidMount() {
    axios
      .get("/board/leaderboard/")
      .then((response) => {
        this.setState({ board: response.data.board });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updownArrow = (num) => {
    if (num > 0) {
      return (
        <i
          className="fa fa-angle-up"
          style={{ color: "green", fontSize: "1.5em" }}
        />
      );
    } else if (num < 0) {
      return (
        <i
          className="fa fa-angle-down"
          style={{ color: "red", fontSize: "1.5em" }}
        />
      );
    } else {
      return (
        <i
          className="fa fa-minus"
          style={{ color: "blue", fontSize: "0.9em" }}
        />
      );
    }
  };

  refresh = () => {
    axios
      .patch("/board/leaderboard/refresh", { withCredentials: true })
      .then((response) => {
        axios
          .get("/board/leaderboard/")
          .then((response) => {
            console.log(response);
            this.setState({ board: response.data.board });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let category = null;
    const cookies = this.props.cookies.cookies;
    

    const auth = cookies.isAuthenticated;
    const userData = cookies.userData;

    if (auth && userData && userData !== "undefined") {
      const authJSON = JSON.parse(auth);
      const userDataJSON = JSON.parse(userData);

      if (authJSON && userDataJSON) {
        const userRole = userDataJSON.user.role;

        if (userRole === "admin" || userRole === "superAdmin") {
          category = (
            <div className="container">
              <Col xs={12} md={4} sm={2}>
                <Button simple onClick={this.refresh}>
                  <span>Refresh Leaderboard &nbsp;</span>

                  <i
                    className="pe pe-7s-refresh"
                    style={{
                      color: "black",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  />
                </Button>
              </Col>
            </div>
          );
        }
      }
    }

    const thArray = [
      "ID",
      "Name",
      "Points",
      "Previous Rank",
      "Current Rank",
      "Change",
    ];

    const title = (
      <div className="container">
        <Col xs={12} md={8} sm={10}>
          <h3 className="pull-left" style={{ fontWeight: "bold" }}>
            Current Leaderboard
          </h3>
        </Col>
      </div>
    );

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={title}
                category={category}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.board.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>{prop.id}</td>
                            <td>{prop.name}</td>
                            <td>{prop.points}</td>
                            <td>{prop.current_rank}</td>
                            <td>{prop.old_rank}</td>
                            <td>
                              {this.updownArrow(
                                prop.current_rank - prop.old_rank
                              )}
                              {Math.abs(prop.current_rank - prop.old_rank)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
