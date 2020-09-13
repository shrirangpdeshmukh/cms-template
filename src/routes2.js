import Login from "views/Login2.jsx";
import ForgotPass from "views/ForgotPassword.jsx";
import ResetPassword from "views/ResetPassword.jsx";
import Test from "views/Test.jsx";
const dashboardRoutes = [
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
    path: "/test",
    name: "Test",
    component: Test,
    layout: "/auth",
  },
  {
    path: "/reset",
    name: "Reset",
    component: ResetPassword,
    layout: "/auth",
  },
];

export default dashboardRoutes;
