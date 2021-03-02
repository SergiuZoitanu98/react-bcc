import React, { Component } from "react";

class UserForm extends Component {
  state = {
    clientDetails: [],
    clients: [],
    handleRicerca: this.props.handleRicerca,
    handleRicercaFiliali: this.props.handleRicercaFiliali,
    filiali: [],
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.state.handleRicerca({
      nag: this.state.clientDetails.nag,
      branch: this.state.clientDetails.branch,
      nome: this.state.clientDetails.nome,
      dataNascita: this.state.clientDetails.dataNascita,
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const clientDetails = { ...this.state.clientDetails };
    clientDetails[input.name] = input.value;
    this.setState({ clientDetails });
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
                value={clientDetails.branch}
                onChange={this.handleChange}
                name="branch"
              >
                <option hidden>Seleziona Filiale</option>
                <option value="1">one</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
              <button className="btn btn-primary mt-2">submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;
