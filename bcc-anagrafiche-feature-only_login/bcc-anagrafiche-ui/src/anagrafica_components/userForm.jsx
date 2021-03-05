import React, { Component } from "react";
import axios from "axios";
import config from "../config.json";

class UserForm extends Component {
  state = {
    clientDetails: [],
    clients: [],
    handleRicerca: this.props.handleRicerca,
    filiali: [],
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.state.handleRicerca({
      nag: this.state.clientDetails.nag,
      branch: this.state.clientDetails.branch,
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const clientDetails = { ...this.state.clientDetails };
    clientDetails[input.name] = input.value;
    this.setState({ clientDetails });
  };

  componentDidMount = () => {
    const jwt = localStorage.getItem("TOKEN");
    const conf = {
      headers: {
        Authorization: jwt,
      },
    };
    axios.get(config.apiFilialiEndpoint, conf).then((response) => {
      this.setState({ filiali: response.data });
    });
  };

  render() {
    const { clientDetails } = this.state;

    return (
      <div className="container-fluid mt-4 mb-4 ">
        <div className="row">
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="col-3 bootstrap-select-wrapper ">
              <select
                className="form-control "
                onChange={this.handleChange}
                name="branch"
              >
                <option hidden>Seleziona Filiale</option>
                {this.state.filiali.map((filiale) => {
                  return (
                    <option key={filiale.id} value={filiale.id}>
                      {filiale.nome}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-3 ">
              <input
                name="nag"
                value={clientDetails.nag || ""}
                onChange={this.handleChange}
                placeholder="NAG"
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-3 ">
              <input
                value={clientDetails.nome || ""}
                onChange={this.handleChange}
                name="nome"
                placeholder="Nome"
                type="text"
                className="form-control "
              />
            </div>
            <div className="col-3 ">
              <input
                value={clientDetails.dataNascita || ""}
                onChange={this.handleChange}
                type="date"
                name="dataNascita"
                className="form-control "
              />
            </div>
            <div className="col text-center">
              <button
                disabled={!clientDetails.nag}
                className="btn btn-primary mt-2"
              >
                Cerca
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;
