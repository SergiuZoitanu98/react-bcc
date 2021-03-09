import React, { Component } from "react";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
class UserTable extends Component {
  state = {
    clients: this.props.clients,
    checkClient: this.props.checkClient,
    pageSize: 5,
    count: this.props.clients.length,
    currentPage: 1,
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const clients = paginate(
      this.state.clients,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Nag</th>
              <th scope="col">Cab</th>
              <th scope="col">Data di nascita</th>
              <th scope="col">Dettagli</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              return (
                <tr key={client.id}>
                  <th scope="row">{client.nome}</th>
                  <td>{client.nag}</td>
                  <td>{client.cab}</td>

                  <td>{client.dataNascita}</td>
                  <td>
                    <li
                      onClick={() => {
                        this.state.checkClient(client);
                      }}
                      className={
                        client.confermato
                          ? "fa fa-search fa-lg"
                          : "fa fa-pencil fa-lg"
                      }
                    ></li>
                  </td>
                </tr>
              );
            })}
            <Pagination
              itemsCount={this.state.count}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </tbody>
        </table>
      </>
    );
  }
}

export default UserTable;
