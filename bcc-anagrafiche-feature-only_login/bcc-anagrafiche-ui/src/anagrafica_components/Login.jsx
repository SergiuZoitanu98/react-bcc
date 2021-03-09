import React, { Component } from "react";

import { ROUTES } from "../anagrafica_components/common/Constants";
export class Login extends Component {
  state = {
    login: {
      username: "",
      password: "",
    },
  };

  onChange = (e) => {
    let login = { ...this.state.login };
    login[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ login });
  };
  componentDidMount() {
    if (
      localStorage.getItem("TOKEN") !== null &&
      localStorage.getItem("TOKEN") !== undefined &&
      localStorage.getItem("TOKEN").length > 0
    ) {
      console.log("");
      this.props.history.replace(
        window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI
      );
    }
  }
  render() {
    const { login } = this.state;
    return (
      <div className="backgroundLogin">
        <div className="container">
          <div className="card card-container">
            <div className="login-icon">
              <img
                src="https://www.ireth.it/wp-content/uploads/2016/05/BCC_News.png"
                className="img-responsive"
                alt=""
              />
            </div>
            <form className="form-signin">
              <input
                className="form-control formUser"
                placeholder="Username"
                name="username"
                onClick={() =>
                  window.parent.postMessage(
                    {
                      command: "displayKeyboard",
                      data: { input: this.state.login.username },
                    },
                    "*"
                  )
                }
                value={login.username}
                onChange={(e) => this.onChange(e)}
                required
                autoFocus
              />
              <input
                type="password"
                className="form-control formUser"
                placeholder="Password"
                onClick={() =>
                  window.parent.postMessage({ command: "hideKeyboard" }, "*")
                }
                name="password"
                value={login.password}
                onChange={(e) => this.onChange(e)}
                required
              />
            </form>
            <div className="button-container">
              <button
                className="btn btn-lg btn-success btn-block btn-signin btn-login"
                type="button"
                onClick={() => this.props.handleLogin(login)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
