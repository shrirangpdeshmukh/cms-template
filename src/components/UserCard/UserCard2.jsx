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
import styles from "./UserCard2.module.css";
import { FaHashtag } from "react-icons/fa";

export class UserCard extends Component {
    componentDidMount() {
        const name = this.props.name;
        const names = name.split(' ');
        console.log(names);
        const displayName = names[0].charAt(0) + names[1].charAt(0);
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillText(displayName, canvas.width/2, canvas.height/2);
    }
  render() {
    
    return (
        <div className={styles.insta_main}>
        <div className={styles.insta_wrapper}>
          <div className={styles.insta_banner}>
            {/* <canvas width="320" height="200" style= {{backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ');"}}></canvas> */}
            <canvas width="320" height="200" style= {{backgroundColor: "skyblue"}}></canvas>
            {/* <canvas width="320" height="200"  style = {{backgroundImage: "url('./../assets/img/test.png')"}}></canvas> */}
          </div>
          <div className={styles.insta_details}>
            <div className={styles.insta_dp}>
              {/* <canvas width="150" height="150"  style= {{backgroundImage: "./../assets/img/neuro.jpg"}}></canvas> */}
              <canvas ref = "canvas" width="150" height="150"  style = {{backgroundColor: "red"}} id = "Name"></canvas>
            </div>
            <div className={styles.insta_name}>
            <h2>{this.props.name} <span>{this.props.email}</span></h2>
            </div>
            <div className={styles.insta_followers_wrap}>
              <div className={styles.insta_follow}>
                <h2>{this.props.rank}<span>Rank</span></h2>
              </div>
              <div className={styles.insta_follow}>
                <h2>{this.props.points}<span>Points</span></h2>
              </div>
            </div>
            <div className={styles.insta_button}>
              <div>
                  <p>
                  <b><u>Role:</u></b> <br/> 
                  {this.props.role}<br/>
                  <b><u>Designation:</u></b> <br/>
                  {this.props.designation}
                  </p>
              </div>
            </div>
            
            <div className={styles.insta_bio}>
            <p><b><u>Bio:</u></b></p>
            <br/>
            <p>{this.props.bio}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
