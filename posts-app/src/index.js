import React, { Component } from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

// Components
import AppHeader from "./AppHeader";
// import AppFooter from "./AppFooter";
import AppFooter from "./AppFooterFunctionalComponent";
import AppContent from "./AppContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.handlePostChange = this.handlePostChange.bind(this);
    this.state = { posts: [] };
  }

  handlePostChange(posts) {
    this.setState({ posts: posts });
  }

  render() {
    const myProps = {
      title: "My Cool App!",
      subject: "My subject",
      favorite_color: "red",
    }

    return (
      <div className="app">
        <AppHeader
          { ...myProps }
          posts={this.state.posts}
          handlePostChange={this.handlePostChange}
        />
        <AppContent
          posts={this.state.posts}
          handlePostChange={this.handlePostChange}
        />
        <AppFooter acme={"Acme Ltd."} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"))