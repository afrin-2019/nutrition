import React, { Component } from "react";

class DeleteButton extends Component {
  state = {};

  handleDelete = props => {
    console.log("inside delete ", props);
  };
  render() {
    return (
      <button
        className="btn btn-sm btn-outline-secondary m-2"
        onClick={this.handleDelete(this.props.sel_row)}
      >
        <i className="fa fa-trash" />
      </button>
    );
  }
}

export default DeleteButton;
