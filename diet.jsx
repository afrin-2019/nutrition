import React, { Component } from "react";
import SideToggleBar from "./sideToggleBar";
class Diet extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1 align="center">DIETS & ALLERGIES</h1>
        </div>
        <div className="sidebar">
          <SideToggleBar />
        </div>
      </React.Fragment>
    );
  }
}

export default Diet;
