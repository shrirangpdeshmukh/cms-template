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
import Table from "./pointTransactionTable";

class UserProfile extends Component {
  render() {
    let list = {
      "Blacklist" : "#",
      "changeDesignation" : "#",
      "changeRole" : "#",
      "deleteUser" : "#",
      "awardPoints" : "#"
    }
    
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <DropDown title = "Admin Options"/>
            
            
            <Col md={8}>
                <Table />
            </Col>

            <Col md={4}>
            <UserCard name = "Bysani Navaneeth" 
            email = "brn14@iitbbs.ac.in" 
            rank = "10" 
            bio = "I am Navaneeth Bysani, sophomore at IIT BBS"
            role = "superAdmin"
            designation="core-team"
            points = "135"
            />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;

// /*!

// =========================================================
// * Light Bootstrap Dashboard React - v1.3.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */
// import React, { Component } from "react";
// import {
//   Grid,
//   Row,
//   Col,
//   FormGroup,
//   ControlLabel,
//   FormControl,
// } from "react-bootstrap";

// import { Card } from "components/Card/Card.jsx";
// import { FormInputs } from "components/FormInputs/FormInputs.jsx";
// import { UserCard } from "components/UserCard/UserCard.jsx";
// import Button from "components/CustomButton/CustomButton.jsx";

// import avatar from "assets/img/faces/face-3.jpg";


// class UserProfile extends Component {
//   render() {
    
//     return (
//       <div className="content">
//         <Grid fluid>
//           <Row>
//             <Col md={4}>
//               <UserCard
//                 avatar={avatar}
//                 name="Mike Andrew"
//                 email="michael24@iitbbs.ac.in"
//                 rank = "10"
//                 bio={
//                   <span>
//                     I am a sophomore at Indian Institute of Technology Bhubaneswar, studying in computer Science engineering.
//                   </span>
//                 }
//               />
//             </Col>
//             <Col md={8}>
//               <Card
//                 title="Edit Profile"
//                 content={
//                   <form>
//                     <FormInputs
//                       ncols={["col-md-5", "col-md-3", "col-md-4"]}
//                       properties={[
//                         {
//                           label: "Company (disabled)",
//                           type: "text",
//                           bsClass: "form-control",
//                           placeholder: "Company",
//                           defaultValue: "Creative Code Inc.",
//                           disabled: true,
//                         },
//                         {
//                           label: "Username",
//                           type: "text",
//                           bsClass: "form-control",
//                           placeholder: "Username",
//                           defaultValue: "michael23",
//                         },
//                         {
//                           label: "Email address",
//                           type: "email",
//                           bsClass: "form-control",
//                           placeholder: "Email",
//                         },
//                       ]}
//                     />
//                     <FormInputs
//                       ncols={["col-md-6", "col-md-6"]}
//                       properties={[
//                         {
//                           label: "First name",
//                           type: "text",
//                           bsClass: "form-control",
//                           placeholder: "First name",
//                           defaultValue: "Mike",
//                         },
//                         {
//                           label: "Last name",
//                           type: "text",
//                           bsClass: "form-control",
//                           placeholder: "Last name",
//                           defaultValue: "Andrew",
//                         },
//                       ]}
//                     />
//                     <FormInputs
//                       ncols={["col-md-12"]}
//                       properties={[
//                         {
//                           label: "Adress",
//                           type: "text",
//                           bsClass: "form-control",
//                           placeholder: "Home Adress",
//                           defaultValue:
//                             "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
//                         },
//                       ]}
//                     />
//                     <FormInputs
//                       ncols={["col-md-4", "col-md-4", "col-md-4"]}
//                       properties={[
//                         {
//                           label: "City",
//                           type: "text",
//                           bsClass: "form-control",
//                           placeholder: "City",
//                           defaultValue: "Mike",
//                         },
//                         {
//                           label: "Country",
//                           type: "text",
//                           bsClass: "form-control",
//                           placeholder: "Country",
//                           defaultValue: "Andrew",
//                         },
//                         {
//                           label: "Postal Code",
//                           type: "number",
//                           bsClass: "form-control",
//                           placeholder: "ZIP Code",
//                         },
//                       ]}
//                     />

//                     <Row>
//                       <Col md={12}>
//                         <FormGroup controlId="formControlsTextarea">
//                           <ControlLabel>About Me</ControlLabel>
//                           <FormControl
//                             rows="5"
//                             componentClass="textarea"
//                             bsClass="form-control"
//                             placeholder="Here can be your description"
//                             defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Button bsStyle="info" pullRight fill type="submit">
//                       Update Profile
//                     </Button>
//                     <div className="clearfix" />
//                   </form>
//                 }
//               />
//             </Col>
//           </Row>
//         </Grid>
//       </div>
//     );
//   }
// }

// export default UserProfile;

