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
import { thArray, tdArray } from "variables/Variables.jsx";

class TableList extends Component {

  render() {
    const title = (
      <div className="container">
        <Col xs={12} md={8} sm={10}>
          <h3 className="pull-left" style={{ fontWeight: "bold" }}>
            Point Transaction Table
          </h3>
        </Col>
      </div>
    );

    let headings = ["Points","Awarded By","Awarded at","Reason"];
    let details = [
      [10,"Navaneeth","12:45","NWC-1 paper setting"],
      [15,"Navaneeth","23-03-2019","Instagram followers"],
      [26,"Mike","23-03-2019","Facebook followers"],
      [26,"Mike","23-03-2019","Facebook followers"],
      [26,"Mike","23-03-2019","Facebook followers"],
      [26,"Mike","23-03-2019","Facebook followers"],
      [26,"Mike","23-03-2019","Facebook followers"],
      [26,"Mike","23-03-2019","Facebook followers"],
      [26,"Mike","23-03-2019","Facebook followers"],
      [26,"Mike","23-03-2019","Facebook followers"],
      [26,"Mike","23-03-2019","Facebook followers"],
      [26,"Mike","23-03-2019","Facebook followers"]
    ]
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={title}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {headings.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
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
