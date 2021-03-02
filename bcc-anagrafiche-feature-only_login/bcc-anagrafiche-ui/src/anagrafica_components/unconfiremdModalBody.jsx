import React, { Component } from "react";
class UnconfirmedModalBody extends Component {
  state = {
    client: this.props.clients,
  };
  render() {
    console.log("cliente", this.state.client);
    return (
      <div>
        <p>{this.state.client.nag}</p>
        <p> {this.state.client.nome}</p>
        <p> {this.state.client.dataNascita}</p>
        <p> {this.state.client.telefono}</p>
        <p> {this.state.client.email}</p>
      </div>
    );
  }
}

export default UnconfirmedModalBody;
