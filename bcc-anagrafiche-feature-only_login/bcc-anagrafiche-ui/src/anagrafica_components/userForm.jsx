import React, { Component } from "react";
import axios from "axios";
import config from "../config.json";
import Joi from "joi-browser";

class UserForm extends Component {
  state = {
    clientDetails: [],
    clients: [],
    handleRicerca: this.props.handleRicerca,
    filiali: [],
    inputFields: {
      filiali: "",
      nag: "",
    },
    errors: {},
  };

  schema = {
    nag: Joi.string()

      .min(3)
      .max(6)
      .required()
      .label("NAG"),
  };

  validate = () => {
    const result = Joi.validate(this.state.inputFields, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
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
      <div className="row">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="col-3">
            <select
              className="form-control "
              onChange={this.handleChange}
              name="branch"
              error={this.state.errors.filialeId}
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
              error={this.state.errors.nag}
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
              className="form-control ml-0"
            />

            <button
              disabled={!clientDetails.nag}
              className="btn btn-primary ml-2"
            >
              Cerca
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserForm;
