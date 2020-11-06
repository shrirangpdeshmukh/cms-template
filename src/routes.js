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
import Dashboard from "views/Dashboard";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList";
import AllUsers from "views/AllUsers";
import Icons from "views/Icons";
import Announcements from "views/Announcements";
import Topics from "views/Topics";
import SignUP from "views/SignUp";

import Login from "views/Login.js";
import ForgotPass from "views/ForgotPassword.jsx";
import ResetPassword from "views/ResetPassword";

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/demo",
    name: "Topics",
    icon: "pe-7s-graph",
    component: Topics,
    layout: "/admin",
  },
  {
    path: "/user/:id",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "My Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin",
  },

  {
    path: "/leaderboard",
    name: "Leaderboard",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/allUsers",
    name: "All Users",
    icon: "pe-7s-news-paper",
    component: AllUsers,
    layout: "/admin",
  },

  {
    path: "/announcements",
    name: "Announcements",
    icon: "pe-7s-bell",
    component: Announcements,
    layout: "/admin",
  },

  {
    path: "/signup",
    name: "Add New Users",
    icon: "pe-7s-users",
    component: SignUP,
    layout: "/admin",
  },
];

export const authRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: ForgotPass,
    layout: "/auth",
  },
  {
    path: "/reset",
    name: "Reset",
    component: ResetPassword,
    layout: "/auth",
  },
];
