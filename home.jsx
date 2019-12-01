import React, { Component } from "react";

import Admin from "./adminComponent";

import SideToggleBar from "./sampleSideBar";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <SideToggleBar />
        <Admin />
      </React.Fragment>
    );
  }
}

export default Home;
