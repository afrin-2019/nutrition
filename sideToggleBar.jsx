import React, { Component } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Link } from "react-router-dom";
//import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./react-sidenav.css";

class SideToggleBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <SideNav>
          <SideNav.Toggle />
          <SideNav.Nav>
            <NavItem>
              <NavIcon>
                <i className="fa fa-fw" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>
                <Link to="/productdb">Product Database</Link>
              </NavText>
            </NavItem>

            <NavItem>
              <NavIcon>
                <i className="fa fa-fw" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>
                <Link to="/mealdb">Meal Database</Link>
              </NavText>
            </NavItem>

            <NavItem>
              <NavIcon>
                <i className="fa fa-fw" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>
                <Link to="/alternatives">Alternatives</Link>
              </NavText>
            </NavItem>

            <NavItem>
              <NavIcon>
                <i className="fa fa-fw" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>
                <Link to="/diet">Diets & Allergies</Link>
              </NavText>
            </NavItem>

            <NavItem>
              <NavIcon>
                <i className="fa fa-fw" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>
                <Link to="/supplement">Supplement stack</Link>
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </React.Fragment>
    );
  }
}

export default SideToggleBar;
