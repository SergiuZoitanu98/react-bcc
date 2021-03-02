import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Navbar from "./common/Navbar";
import axios from "axios";
import UserTable from "./userTable";
import UserForm from "./userForm";
import UnconfirmedModalBody from "./unconfiremdModalBody";
import config from "../config.json";
export class RicercaClienti extends Component {
  state = {
    modalDetailsVisible: false,
    modalDetailsUncofirmed: false,
    modalAlreadyConfirmed: false,
    modalUnconfirmed: false,
    clients: [],
    selectedClient: null,
    filiali: [],
  };

  handleRicerca = (data) => {
    const jwt = localStorage.getItem("TOKEN");
    const conf = {
      headers: {
        Authorization: "Bearer " + jwt,
      },
      params: data,
    };
    axios
      .get(config.apiClienteEndpoint, conf)
      .then((response) => {
        var date = new Date(response.data[0].filiali.lastModify);
        response.data[0].filiali.lastModify =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
        //da togliere stati duplicati
        this.setState({ clients: [] });
        this.setState({ clients: response.data });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  handleModalDetailsUncofirmed = () => {
    this.setState({
      modalDetailsUncofirmed: !this.state.modalDetailsUncofirmed,
    });
  };

  handleDetailsModalVisible = () => {
    this.setState({ modalDetailsVisible: !this.state.modalDetailsVisible });
  };

  handleUnconfirmed = () => {
    this.setState({ modalAlreadyConfirmed: this.state.modalAlreadyConfirmed });
  };

  handleModalAlreadyConfirmed = () => {
    this.setState({ modalAlreadyConfirmed: !this.state.modalAlreadyConfirmed });
  };

  handleModalUnconfirmed = () => {
    this.setState({ modalUnconfirmed: !this.state.modalUnconfirmed });
  };

  checkClient = (client) => {
    this.setState({ selectedClient: client });
    if (client.confermato) {
      this.setState({ modalAlreadyConfirmed: true });
    } else {
      this.setState({ modalUnconfirmed: true });
    }
  };
  render() {
    return (
      <>
        <div id="main">
          <Navbar></Navbar>
          <h3 className=" mt-2">RICERCA CLIENTI</h3>
          <UserForm handleRicerca={this.handleRicerca} />

          {this.state.clients.length > 0 && (
            <div className="row">
              <UserTable
                checkClient={this.checkClient}
                clients={this.state.clients}
              />
            </div>
          )}

          <Modal
            show={this.state.modalAlreadyConfirmed}
            onHide={this.handleModalAlreadyConfirmed}
          >
            <Modal.Header>
              {" "}
              <h3>Attenzione!</h3>
            </Modal.Header>
            <Modal.Body>
              <p>
                L'anagrafica del cliente è già stata confermata in data:
                <b>
                  {this.state.selectedClient &&
                    this.state.selectedClient.filiali.lastModify}
                </b>
              </p>
              <p>
                Il codice identificativo assegnato è:
                <b>
                  {" "}
                  {this.state.selectedClient &&
                    this.state.selectedClient.codice}
                </b>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={this.handleModalAlreadyConfirmed}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/*unconfirmed*/}

          <Modal
            show={this.state.modalUnconfirmed}
            onHide={this.handleModalUnconfirmed}
          >
            <Modal.Header>
              {" "}
              <h3>Non Confermato!</h3>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <UnconfirmedModalBody
                  checkClient={this.checkClient}
                  client={this.state.selectedClient}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModalUnconfirmed}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}
