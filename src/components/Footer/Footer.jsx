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
import { Grid } from "react-bootstrap";
import Button from "../CustomButton/CustomButton";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <p className="copyright pull-left">
            &copy; {new Date().getFullYear()}{" "}
            <a href="#">Neuromancers, IITBBS</a>, made with &hearts; for the
            college.
          </p>

          <nav className="pull-right">
            <ul>
              <li>
                <Button simple>
                  {" "}
                  <a href="https://github.com/NeuromancersIITBBS">
                    <i className="fa fa-github fa-2x" />
                  </a>
                </Button>
              </li>
              <li>
                <Button simple>
                  <a href="https://www.instagram.com/neuro_iitbbs/">
                    <i className="fa fa-instagram fa-2x" />
                  </a>
                </Button>
              </li>

              <li>
                <Button simple>
                  {" "}
                  <a href="https://www.facebook.com/neuroIITBBS/">
                    <i className="fa fa-facebook-square fa-2x" />
                  </a>{" "}
                </Button>
              </li>
            </ul>
          </nav>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
