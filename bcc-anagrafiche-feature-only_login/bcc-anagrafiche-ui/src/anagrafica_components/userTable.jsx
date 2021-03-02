import React, { Component } from "react";
class UserTable extends Component {
  state = {
    clients: this.props.clients,
    checkClient: this.props.checkClient,
  };
  render() {
    console.log(this.state);
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Cab</th>
            <th scope="col">Nag</th>
            <th scope="col">Nome</th>
            <th scope="col">dataNascita</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.clients.map((client) => {
            return (
              <tr>
                <th scope="row">{client.cab}</th>
                <td>{client.nag}</td>
                <td>{client.nome}</td>
                <td>{client.dataNascita}</td>
                <td>
                  <button
                    onClick={() => {
                      this.state.checkClient(client);
                    }}
                    className="btn btn-success"
                  >
                    Details
                  </button>
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
