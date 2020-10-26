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
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import AllUsers from "views/AllUsers.jsx";
import Icons from "views/Icons.jsx";
import Announcements from "views/Announcements.jsx";
import Login from "views/Login.jsx";
import Topics from "views/Topics.jsx";
import Test from "views/Test.jsx";

const dashboardRoutes = [
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
    path: "/test",
    name: "Test",
    icon: "pe-7s-user",
    component: Test,
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
];

export default dashboardRoutes;
