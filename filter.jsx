import React, { Component } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";

let filterArray = [],
  uniqueArray = [],
  tabIndex;
class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: [],
      newFilter: []
    };
  }

  onYes = e => {
    console.log("yes clicked");
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
        console.log(this.state.searchName);
        this.state.searchName.map(searchname => {
          console.log(txtVal + searchname);
          // if (txtVal.indexOf(searchname) !== -1) {
          // final.push(tr[i]);
          if (txtVal === searchname) {
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
    }
  };

  onfilterCall = e => {
    //this.op.toggle(e);

    filterArray = [];
    uniqueArray = [];
    tabIndex = this.props.num;
    let table = document.getElementById("table");
    let tr = table.getElementsByTagName("tr");

    let td;
    for (let i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[this.props.num];
      console.log("display", tr[i].style.display);
      if (tr[i].style.display !== "none") {
        filterArray.push({ label: td.innerText, value: td.innerText });
      }
    }

    console.log("filter array", filterArray);
    uniqueArray = filterArray
      .map(e => e["label"])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => filterArray[e])
      .map(e => filterArray[e]);

    console.log("in function", filterArray);
    this.setState({ newFilter: uniqueArray });
    document.getElementById("myDropdown").classList.toggle("show");
  };

  render() {
    const cars = [
      { label: "Audi", value: "Audi" },
      { label: "BMW", value: "BMW" },
      { label: "Fiat", value: "Fiat" },
      { label: "Honda", value: "Honda" },
      { label: "Jaguar", value: "Jaguar" },
      { label: "Mercedes", value: "Mercedes" },
      { label: "Renault", value: "Renault" },
      { label: "VW", value: "VW" },
      { label: "Volvo", value: "Volvo" }
    ];

    return (
      <div>
        <Button
          className="p-button-secondary"
          icon="fa fa-filter"
          onClick={e => this.onfilterCall(e, this.props.num)}
          // onClick={e => this.op.toggle(e) && this.onClick("Name", 1)}
        />
        <div id="myDropdown" className="dropdown-content">
          <ListBox
            //optionLabel="Name"
            value={this.state.searchName}
            options={uniqueArray}
            onChange={e => this.setState({ searchName: e.target.value })}
            multiple={true}
            filter={true}
          />

          <Button label="Yes" icon="pi pi-check" onClick={this.onYes} />
          <Button
            label="No"
            icon="pi pi-times"
            className="p-button-secondary"
          />
        </div>
        {/* <OverlayPanel
          ref={el => (this.op = el)}
          showCloseIcon={true}
          dismissable={true}
        >
          <div className="content-section implementation">
            <ListBox
              //optionLabel="Name"
              value={this.state.searchName}
              options={this.state.newFilter}
              onChange={e => this.setState({ searchName: e.target.value })}
              multiple={true}
              filter={true}
            />
            <div>
              <Button label="Yes" icon="pi pi-check" onClick={this.onYes} />
              <Button
                label="No"
                icon="pi pi-times"
                className="p-button-secondary"
              />
            </div>
          </div>
        </OverlayPanel> */}
      </div>
    );
  }
}

export default Toggle;
