import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import ChatNavbar from "components/Navbars/ChatNavbar";
import Footer from "components/Footer/Footer";
import ChatSidebar from "components/Sidebar/ChatSidebar.jsx";

import routes from "routes3.js";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedClasses: "dropdown show-dropdown open",
      modal: false,
    };
  }

  showModal = () => {
    this.setState({ modal: true });
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/chat") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
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
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
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
        <ChatSidebar {...this.props} routes={routes} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <ChatNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            infoCallback={this.showModal}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Chat;
