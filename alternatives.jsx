import React, { Component } from "react";
import SideToggleBar from "./sideToggleBar";
class Alternatives extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1 align="center">ALTERNATIVES</h1>
        </div>
        <div className="sidebar">
          <SideToggleBar />
        </div>
      </React.Fragment>
    );
  }
}

export default Alternatives;
