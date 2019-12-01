import React, { Component } from "react";
import SideToggleBar from "./sideToggleBar";
class MealDB extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1 align="center">MEAL DATABASE</h1>
        </div>
        <div className="sidebar">
          <SideToggleBar />
        </div>
      </React.Fragment>
    );
  }
}

export default MealDB;
