import React, { Component } from "react";
import SideToggleBar from "./sideToggleBar";
//import BootstrapTable from "react-bootstrap-table-next";
import withFixedColumns from "react-table-hoc-fixed-columns";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import DeleteButton from "./DeleteButton";
import $ from "jquery";
import TableFilter from "react-table-filter";
import "react-table-filter/lib/styles.css";
import Filter from "./filter";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { OverlayPanel } from "primereact/overlaypanel";
const ReactTableFixedColumns = withFixedColumns(ReactTable);
let filterArray = [];
let uniqueArray = [];
let tabIndex = 0;
class ProductDB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      selectedRows: [],
      checked: false,
      index_val: "",
      checkAll: false,
      rowObj: [],
      editable: false,
      updated_value: "",
      searchBox: false,
      searchValue: "",
      searchName: [],
      visible: false,
      filteredProductList: [],
      filteredProductList_New: [],
      label: null
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  refreshList() {
    axios.get(`/User_Id`).then(res => {
      console.log(res.data.express);
      //database record is assigned to productlist

      this.setState({ productList: res.data.express });
      //productlist updated with the value of ischecked as false

      const updatedList = this.state.productList.map(product => {
        return {
          ...product,
          isChecked: false
        };
      });

      this.setState({ productList: updatedList });
      console.log(this.state.productList);
    });
  }
  //component gets value from database and display it on screen
  componentDidMount() {
    this.refreshList();
  }

  handleDelete = () => {
    //backend call to delete the products.
    let new_rowObj = { Product: [] };
    this.state.selectedRows.map(product => {
      new_rowObj.Product.push({ Name: product });
      console.log("new", new_rowObj);
    });
    axios.delete(`/delete/product`, { data: new_rowObj }).then(res => {
      console.log("deleted response ", res);
      this.refreshList();
    });
  };

  handleProductSelect = event => {
    let rows = this.state.selectedRows;
    let check = event.target.checked;
    let checked_rows = event.target.value;
    let newVal = [];
    this.state.productList.find(
      item => item.Name === event.target.name
    ).isChecked = event.target.checked; //making isChecked as true
    if (check) {
      newVal = [...rows, checked_rows];
      console.log("new array is " + newVal);
      this.setState({
        selectedRows: newVal
      });
    } else {
      var index = rows.indexOf(checked_rows);
      if (index > -1) {
        rows.splice(index, 1);
        this.setState({ selectedRows: rows });
      }
    }

    if (newVal.length === this.state.productList.length) {
      this.setState({ checkAll: true });
    } else {
      this.setState({ checkAll: false });
    }
  };

  handleSelectAll = e => {
    //let newVal = this.state.selectedRows;
    let product = this.state.productList;
    let allChecked = this.state.checkAll;

    let newVal = [];
    if (e.target.value === "checkAll") {
      product.forEach(item => {
        item.isChecked = e.target.checked; //isChecked value is given to all checkbox
        allChecked = e.target.checked;
        if (e.target.checked) {
          newVal = [...newVal, item.Name];
        } else {
          newVal = [];
        }

        console.log("all selected ", newVal);
      });
      console.log("new val is ", newVal);
      this.setState({
        productList: product,
        checkAll: allChecked,
        selectedRows: newVal
      });
    }
  };

  handleUpdate = (e, name, field_name) => {
    let temp = e.target.textContent;
    console.log(temp);
    this.setState({ updated_value: temp });
    console.log(field_name);
    let req_Obj = {};
    let first_val = {};
    let second_val = {};
    first_val["Name"] = name;
    second_val[field_name] = temp;
    req_Obj = Object.assign(first_val, second_val);
    console.log("req is", req_Obj);
    axios
      .put(`/update/product`, { data: req_Obj })
      .then(res => console.log(res));
    this.refreshList();
  };

  renderItems() {
    // let filteredProductList = this.state.productList;
    // if (this.state.searchName.length === 0) {
    //   filteredProductList = this.state.productList;
    // }

    // console.log("filtered list", filteredProductList);
    //this.setState({ filteredProductList: filteredProductList });
    return this.state.productList.map((item, i) => (
      <tr key={i} style={item.isChecked ? { background: "#d3d3d3" } : null}>
        <td>
          <input
            type="checkbox"
            name={item.Name}
            value={item.Name}
            checked={item.isChecked || ""}
            onChange={this.handleProductSelect}
          />
        </td>
        <td contentEditable="false" suppressContentEditableWarning={true}>
          {item.Name}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Unit")}
        >
          {item.Unit}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Meal_Category_1")}
        >
          {item.Meal_Category_1}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Meal_Category_2")}
        >
          {item.Meal_Category_2}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Meal_Category_3")}
        >
          {item.Meal_Category_3}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Kcal")}
        >
          {item.Kcal}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Carbs")}
        >
          {item.Carbs}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Fats")}
        >
          {item.Fats}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Proteins")}
        >
          {item.Proteins}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Calcium")}
        >
          {item.Calcium}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Iron")}
        >
          {item.Iron}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Pottassium")}
        >
          {item.Pottassium}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "VitaminA")}
        >
          {item.VitaminA}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "VitaminC")}
        >
          {item.VitaminC}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Exclude_in")}
        >
          {item.Exclude_in}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Increment_size")}
        >
          {item.Increment_size}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Max_amount_per_meal")}
        >
          {item.Max_amount_per_meal}
        </td>
        <td
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={e => this.handleUpdate(e, item.Name, "Min_amount_per_meal")}
        >
          {item.Min_amount_per_meal}
        </td>
      </tr>
    ));
  }

  toggleFilter = () => {
    //console.log();
    const val = this.state.searchBox;
    this.setState({ searchBox: !val });
    // this.setState({ headerName: header });
  };

  handleFilter = e => {
    this.setState({ searchValue: e.target.value });
  };

  onClick = (label, num) => {
    filterArray = [];
    uniqueArray = [];
    tabIndex = num;
    this.setState({ visible: true });
    this.setState({ label: label });
    console.log("after clicking yes ", this.state.productList[1]);
    let table = document.getElementById("table");
    let tr = table.getElementsByTagName("tr");

    let td;
    for (let i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[num];
      console.log("display", tr[i].style.display);
    if(tr[i].style.display!=="none"){
      filterArray.push({ Name: td.innerText }); }
    
      // console.log(td.innerText);
    }
  
    console.log("filter array", filterArray);
    uniqueArray = filterArray
      .map(e => e["Name"])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => filterArray[e])
      .map(e => filterArray[e]);
    console.log("unique Array", uniqueArray);
  };
  onYes = e => {
    let table = document.getElementById("table");
    let tr = table.getElementsByTagName("tr");
    // tr.style.display = "none";

    let td,
      txtVal,
      final = [],
      temp;

    for (let i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[tabIndex];
      if (td) {
        txtVal = td.textContent || td.innerText;
        temp = false;
        this.state.searchName.map(searchname => {
          if (txtVal.indexOf(searchname.Name) !== -1) {
            // final.push(tr[i]);
            console.log(
              "txtVal-" + txtVal + "searchname-" + searchname.Name + "i" + i
            );
            tr[i].style.display = "";
            temp = true;
          } else {
            if (temp === false) {
              tr[i].style.display = "none";
            }
          }
        });

        // if (this.state.searchName.length === 0) {
        //   tr[i].style.display = "";
        // }
      }
      console.log("final", final);
    }
    //  $(final).show();
    this.setState({ visible: false });
  };
  onHide() {
    this.setState({ filteredProductList_New: this.state.searchName });
    console.log("inside onHide");
    let table = document.getElementById("table");
    let tr = table.getElementsByTagName("tr");
    // console.log(tr[num].innerText);

    let td;
    for (let i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[tabIndex];
      if (this.state.searchName === td.innerText) {
        tr[i].style.display = "";
      }
      // console.log(td.innerText);
    }
    // console.log("inside ", this.state.filteredProductList_New);
    let filtered_Val = {};
    filtered_Val = this.state.searchName.map(name => {
      return name.Name;
    });
    console.log("filtered_val", filtered_Val);
    let newfilterVal = filtered_Val.map(name => {
      return this.state.productList.filter(productname => {
        return productname.Name.indexOf(name) !== -1;
      });
    });

    // let newfilterVal = this.state.productList.filter(productname => {
    //   return productname.Name.indexOf(filtered_Val) !== -1;
    //  });
    console.log("new tried ", newfilterVal);
    let newfilterVal1 = [];
    newfilterVal.map(val => {
      newfilterVal1.push(val);
    });
    console.log("new tried 1 ", newfilterVal1);
    this.setState({ visible: false });
  }

  filter = e => {
    let filterVal = [];
    filterVal.push(e.value);
    this.setState({ searchName: filterVal });
    console.log(this.state.searchName);
  };

  render() {
    const footer = (
      <div>
        <Button label="Yes" icon="pi pi-check" onClick={this.onYes} />
        <Button
          label="No"
          icon="pi pi-times"
          onClick={this.onHide}
          className="p-button-secondary"
        />
      </div>
    );
    return (
      <React.Fragment>
        <div className="container">
          <h2 align="center">PRODUCT DATABASE </h2>
          <div>
            <button className="btn btn-sm btn-outline-secondary m-2">
              <i className="fa fa-edit" />
            </button>

            <button
              className="btn btn-sm btn-outline-secondary m-2"
              onClick={() => {
                if (window.confirm("Delete the product ?")) {
                  this.handleDelete();
                }
              }}
            >
              <i className="fa fa-trash" />
            </button>

            <label>Add Product :</label>
            <button className="btn btn-sm btn-outline-secondary m-2">
              Manual
            </button>
            <button className="btn btn-sm btn-outline-secondary m-2">
              From Database
            </button>
            <button className="btn btn-sm btn-outline-secondary m-2">
              Upload Excel
            </button>
            <button className="btn btn-sm btn-outline-secondary m-2">
              Export
            </button>
          </div>

          <table id="table" className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    type="checkbox"
                    value="checkAll"
                    checked={this.state.checkAll}
                    onChange={this.handleSelectAll}
                  />
                </th>
                <th scope="col" filterkey="name">
                  Name
                  <div className="content-section implementation">
                    <Dialog
                      header="godfather"
                      visible={this.state.visible}
                      style={{ width: "50vw" }}
                      footer={footer}
                      onHide={this.onHide}
                      maximizable
                    >
                      <div className="content-section implementation">
                        <ListBox
                          // option={this.state.productList._id}
                          optionLabel="Name"
                          value={this.state.searchName}
                          options={uniqueArray}
                          onChange={e =>
                            this.setState({ searchName: e.target.value })
                          }
                          multiple={true}
                          filter={true}
                        />
                      </div>
                    </Dialog>
                    <Button
                      className="p-button-secondary"
                      icon="fa fa-filter"
                      onClick={() => this.onClick("Name", 1)}
                    />
                  </div>
                </th>
                <th scope="col">
                  Unit
                  <div className="content-section implementation">
                    {/*  <Dialog
                      header="godfather"
                      visible={this.state.visible}
                      style={{ width: "50vw" }}
                      footer={footer}
                      onHide={this.onHide}
                      maximizable
                    >
                      <div className="content-section implementation">
                        <ListBox
                          key={this.state.label}
                          optionLabel={this.state.label}
                          value={this.state.searchName}
                          options={this.state.productList}
                          onChange={e =>
                            this.setState({ searchName: e.target.value })
                          }
                          multiple={true}
                        />
                      </div>
                    </Dialog> */}
                    <Button
                      className="p-button-secondary"
                      icon="fa fa-filter"
                      onClick={() => this.onClick("Unit", 2)}
                    />
                  </div>
                </th>
                <th scope="col">
                  Meal Category 1
                  <div className="content-section implementation">
                    <Button
                      className="p-button-secondary"
                      icon="fa fa-filter"
                      onClick={() => this.onClick("Meal_Category_1", 3)}
                    />
                  </div>
                </th>
                <th scope="col">
                  Meal Category 2<i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Meal Category 3<i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Kcal(100g)
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Carbs(100g)
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Fats
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Proteins
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Calcium
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Iron
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Pottasium
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Vitamin A
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Vitamin C
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Exclude in
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Increment Size
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Max amount per meal
                  <i className="fa fa-filter" />
                </th>
                <th scope="col">
                  Min amount per meal
                  <i className="fa fa-filter" />
                </th>
              </tr>
            </thead>

            <tbody className="pointer">{this.renderItems()}</tbody>
          </table>

          {/* <ReactTable
            data={this.state.productList}
            columns={[
              {
                Header: "",
                style: {
                  textAlign: "center"
                },
                Cell: props => {
                  return (
                    <input
                      type="checkbox"
                      name={props.original.Name}
                      value={props.original.Name}
                      onChange={this.handleProductSelect}
                    />
                  );
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header: "Product",
                columns: [
                  {
                    Header: "Menu",
                    accessor: "Name"
                  },
                  {
                    Header: "Unit",
                    accessor: "Unit"
                  },
                  {
                    Header: "Meal Category 1",
                    accessor: "Meal_Category_1"
                  },
                  {
                    Header: "Meal Category 2",
                    accessor: "Meal_Category_2"
                  },
                  {
                    Header: "Meal Category 3",
                    accessor: "Meal_Category_3"
                  }
                ]
              }
              // {
              //   Header: "Macronutrients",
              //   columns: [
              //     {
              //       Header: "Kcal"
              //     },
              //     {
              //       Header: "Carbs"
              //     },
              //     {
              //       Header: "Fats"
              //     },
              //     {
              //       Header: "Proteins"
              //     }
              //   ]
              // },
              // {
              //   Header: "Micronutrients",
              //   columns: [
              //     {
              //       Header: "All vitamins & Minerals",
              //       columns: [
              //         {
              //           Header: "Menu"
              //         },
              //         {
              //           Header: "Unit"
              //         },
              //         {
              //           Header: "Meal Category 1"
              //         },
              //         {
              //           Header: "Meal Category 2"
              //         },
              //         {
              //           Header: "Meal Category 3"
              //         }
              //       ]
              //     }
              //   ]
              // }
            ]}
            defaultPageSize={4}
            className="-striped -highlight"
            style={{
              height: "400px",
              overflow: "auto"
            }}
            showPagination={false}
          /> */}
        </div>
        <div className="sidebar">
          <SideToggleBar />
        </div>
      </React.Fragment>
    );
  }
}

export default ProductDB;
