import React, { Component } from "react";
class UserTable extends Component {
  state = {
    clients: this.props.clients,
    checkClient: this.props.checkClient,
  };
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Cab</th>
            <th scope="col">Nag</th>
            <th scope="col">Nome</th>
            <th scope="col">Data di nascita</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {this.state.clients.map((client) => {
            return (
              <tr key={client.id}>
                <th scope="row">{client.cab}</th>
                <td>{client.nag}</td>
                <td>{client.nome}</td>
                <td>{client.dataNascita}</td>
                <td>
                  <li
                    onClick={() => {
                      this.state.checkClient(client);
                    }}
                    className={
                      this.state.checkClient
                        ? "fa fa-search fa-lg"
                        : "fa fa-pencil fa-lg"
                    }
                  >
                    Dettagli
                  </li>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default UserTable;
