import React, { Component } from "react";

class UpdateProduct extends Component {
  state = {};

  renderItems() {
    return "name";
  }
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h4 align="center">{this.props.text}</h4>

          <table>
            <tr>
              <td>Name:</td>
              <td>
                <input type="text" />
              </td>

              <td>Unit:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Meal Category 1:</td>
              <td>
                <input type="text" />
              </td>

              <td>Meal Category 2:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>Meal Category 3:</td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </table>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default UpdateProduct;

// showPopup: false,
// togglePopup() {
//     this.setState({
//       showPopup: !this.state.showPopup
//     });
//   }

//   onClick={this.togglePopup.bind(this)}

//   {this.state.showPopup ? (
//     <UpdateProduct
//       text="Update Product"
//       closePopup={this.togglePopup.bind(this)}
//       productlist={this.state.productList}
//     />
//   ) : null}
