import React, { Component } from "react";
import SideToggleBar from "./sideToggleBar";
class Admin extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <SideToggleBar />
        <h1 align="center">Hello Admin!</h1>;
      </React.Fragment>
    );
  }
}

export default Admin;
