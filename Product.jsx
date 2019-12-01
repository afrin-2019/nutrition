import React, { Component } from "react";
import ProductTable from "./ProductTable";
import axios from "axios";

let res, res1, productList, response;
class Product extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  async refreshList() {
    // res = await axios.get(`/User_Id`);
    // console.log("res", res.data.express);
    // // res.then(x => console.log(x));
    // res1 = await res.data.express;
    // //return res1;
    return new Promise(resolve => resolve(axios.get(`/User_Id`)));
  }

  callRefresh = async () => {
    let res = await axios.get(`/User_Id`);
    console.log("res in function", res.data.express);
    return res.data.express;
  };

  callRefresh1 = async () => {
    const res1 = {
      then: function(resolve) {
        let val = axios.get(`/User_Id`);
        resolve(val);
      }
    };
    console.log("res1", await res1);
  };
  callRefresh2 = async () => {
    let res1 = new Promise((res, rej) => {
      let val = axios.get(`/User_Id`);
      res(val);
    });

    console.log("res1", await res1);
  };

  render() {
    this.callRefresh2();

    //const response = this.refreshList();

    //console.log("response", Promise.resolve(response));

    return (
      <div>
        <ProductTable productlist={response} />
      </div>
    );
  }
}

export default Product;
