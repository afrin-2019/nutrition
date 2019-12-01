import React, { Component } from "react";

class Login extends Component {
  state = {
    userName: "",
    password: "",
    errors: [],
    loggedIn: false,
    userType: ""
  };

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div>
          <div className="container login-container">
            <div className="row">
              <div className="col-md-6 login-form-1">
                <h3>Login</h3>
                <form onSubmit={this.handleAdminRights}>
                  {errors.map(error => (
                    <p key={error}>{error}</p>
                  ))}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="UserName"
                      onChange={evt =>
                        this.setState({ userName: evt.target.value })
                      }
                      value={this.state.userName}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password "
                      onChange={evt =>
                        this.setState({ password: evt.target.value })
                      }
                      value={this.state.password}
                    />
                  </div>
                  <div className="form-group">
                    <input type="submit" className="btnSubmit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleRedirect = value => {
    const loggedIn = true;
    const userType = value;
    console.log("user type is " + userType);
    this.setState({ loggedIn });
    this.setState({ userType });

    this.props.history.push(`/${userType}`);
  };

  handleAdminRights = e => {
    e.preventDefault();
    const { userName, password } = this.state;

    const errors = validate(userName, password);
    console.log(errors);
    if (errors.length > 0) {
      this.setState({ errors });

      if (errors[0] === "Login Success") {
        this.handleRedirect("admin");
      }
      if (errors[0] === "Login Success for coach") {
        this.handleRedirect("coach");
      }
      if (errors[0] === "Login Success for client") {
        this.handleRedirect("client");
      }
    }
  };
}

function validate(userName, password) {
  const errors = [];
  // if (userName !== "admin") {
  //   errors.push("Access Denied.Username incorrect");
  // }
  // if (password !== "admin") {
  //   errors.push("Access Denied.password incorrect");
  // }
  if (userName === "admin" && password === "admin") {
    errors.push("Login Success");
  }
  if (userName === "coach" && password === "coach") {
    errors.push("Login Success for coach");
  }
  if (userName === "client" && password === "client") {
    errors.push("Login Success for client");
  }

  return errors;
}

export default Login;
