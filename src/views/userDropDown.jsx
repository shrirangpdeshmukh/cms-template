import React, { Component } from "react";
import styles from './styles/userDropDown.module.css';

export class userDropDown extends Component {
    render() {
        
        return(
            <div className = {styles.dropdown}>
            <button className ={styles.dropbtn}>{this.props.title}</button>
            <div className={styles.dropdown_content}>
               
                <a href="/">Award Points points</a>
                <a href="/admin">Change Designation</a>
                <a href="/">Change Role</a>
                
                <a href="/">Blacklist</a>
                <a href="/">Delete User</a>
                
            </div>
            </div>
        )
    }
};

export default userDropDown;