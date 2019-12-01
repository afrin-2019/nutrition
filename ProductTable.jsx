import React, { Component } from "react";
import Filter from "./filter";

const productData = [
  { Name: "oatmeal", Unit: "Grams", Product_Category: "Fibre" },
  { Name: "Steak", Unit: "Grams", Product_Category: "Protein" },
  { Name: "Tuna", Unit: "milliGrams", Product_Category: "Carbs" }
];

class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: []
    };
  }

  headerDisplay() {
    // let td = this.props.productlist;
    console.log("props", this.props.productlist);
    let td = productData[0];
    let data = [];
    let i = 0;
    for (let x in td) {
      console.log("x", x);
      console.log("td[x]", td[x]);

      data.push(
        <th>
          {x} <Filter num={i} />
        </th>
      );
      i++;
    }
    return data;
  }

  bodyDisplay() {
    let td = productData;
    console.log(td[0]);
    let data = [],
      data1 = [];

    for (let i in td) {
      console.log("td[i]", td[i]);
      data = [];
      for (let x in td[i]) {
        data.push(<td>{td[i][x]}</td>);
      }
      data1.push(<tr>{data}</tr>);
    }

    return data1;
  }
  render() {
    return (
      <div>
        <table id="table" className="table table-bordered">
          <thead>
            <tr>{this.headerDisplay()}</tr>
          </thead>
          <tbody>{this.bodyDisplay()}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductTable;
