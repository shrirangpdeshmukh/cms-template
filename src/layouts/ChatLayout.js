import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import ChatNavbar from "components/Navbars/ChatNavbar";
import Footer from "components/Footer/Footer";
import ChatSidebar from "components/Sidebar/ChatSidebar.jsx";
import axios from "../axios-root";
import io from "socket.io-client";
//import routes from "routes3.js";
import { withCookies } from "react-cookie";
import Test from "../views/Test.jsx";

// import Card from "components/Card/CommentCard.jsx";
// import ChatInput from "components/ChatInput/ChatInput";
// import ChatModal from "components/ChatModal/ChatModal.js";
// import { Grid } from "react-bootstrap";
//  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYwMzYyNzQzMCwiZXhwIjoxNjExNDAzNDMwfQ.ztSZ9gVXpCszeO0KgZNL26wAXhYgd8377l264ZoWbz0`
//      const socket = io.connect(`http://localhost:5000`, {
//         query:{token}
//       })

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedClasses: "dropdown show-dropdown open",
      modal: false,
      error: false,
      tasks: [],
      routes: [],

      topic: null,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(document.location.search);

    // console.log(params);

    const topicId = this.props.match.params.topicId;
    axios
      .get(`/board/topics/${topicId}/tasks/`)
      .then((response) => {
        console.log(response);
        // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYwMzYyNzQzMCwiZXhwIjoxNjExNDAzNDMwfQ.ztSZ9gVXpCszeO0KgZNL26wAXhYgd8377l264ZoWbz0`
        //    const socket = io.connect(`http://localhost:5000`, {
        //       query:{token}
        //    })
        const routes = [];
        response.data.tasks.forEach((task) => {
          return routes.push({
            path: `/${task.id}`,
            name: task.heading,
            component: Test,
            layout: `/chat/${topicId}`,
            icon: "pe-7s-news-paper",
            id: task.id,
          });
        });
        console.log(routes);
        this.setState({
          tasks: response.data.tasks,
          routes: routes,
          topic: topicId,
        });
        console.log(this.props.cookies);
      })
      .catch((err) => this.setState({ error: true }));
  }

  showModal = () => {
    this.setState({ modal: true });
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === `/chat/${this.state.topic}`) {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <Test
                {...props}
                topicId={this.state.topic}
                taskId={prop.id}
                modalData={this.state.modal}
                hideModal={this.hideModal}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < this.state.routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          this.state.routes[i].layout + this.state.routes[i].path
        ) !== -1
      ) {
        return this.state.routes[i].name;
      }
    }
    return "Brand";
  };

  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="">
        <ChatSidebar {...this.props} routes={this.state.routes} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <ChatNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            infoCallback={this.showModal}
          />
          {/* <div
        className="content"
        style={{
          position: " relative",
          minHeight: "100vh",
          fontSize: "1.1em",
        }}
      >
        <Grid style={{ paddingBottom: "30px" }}>
          {modal}
          {chat}
          <ChatInput />
        </Grid>
      </div> */}
          <Switch>{this.getRoutes(this.state.routes)}</Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withCookies(Chat);
