import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Navbar from "./common/Navbar";
import axios from "axios";
import UserTable from "./userTable";
import UserForm from "./userForm";
import config from "../config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export class RicercaClienti extends Component {
  state = {
    modalDetailsVisible: false,
    modalDetailsUncofirmed: false,
    confirmCheckModalShow: false,
    modalAlreadyConfirmed: false,
    modalUnconfirmed: false,
    clients: [],
    selectedClient: null,
    checked: false,
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

        this.setState({ clients: [] });
        this.setState({ clients: response.data });
      })
      .catch((error) => {
        // handle error
        toast("Filiale e Nag sono richiesti!");
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
    console.log(client);
  };

  handleChange = (input, isCheckbox) => {
    const client = { ...this.state.selectedClient };

    if (isCheckbox) {
      client[input.name] = input.checked;
    } else {
      client[input.name] = input.value;
    }
  };

  handleConfirmCheckModal = () => {
    this.setState({ confirmCheckModalShow: !this.state.confirmCheckModalShow });
  };

  handleConfirm = () => {
    axios
      .post(
        config.apiPostCliente,

        {
          id: this.state.selectedClient.id,
          telefono: !!this.state.selectedClient.telefono,
          email: !!this.state.selectedClient.email,
          p1: this.state.selectedClient.p1,
          p2: this.state.selectedClient.p1,
          p3: this.state.selectedClient.p3,
          p4: this.state.selectedClient.p4,
          p5: this.state.selectedClient.p5,
          p6: this.state.selectedClient.p6,
          firma: this.state.selectedClient.firma,
        },
        {
          headers: {
            Authorization: localStorage.getItem("TOKEN"),
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        // handle error
        toast("something unexpected happened");
      });
  };

  render() {
    return (
      <>
        <ToastContainer />
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
              <h3>
                {" "}
                {this.state.selectedClient && this.state.selectedClient.nome}
              </h3>
            </Modal.Header>
            <Modal.Body>
              <p>
                L'anagrafica del cliente è stata confermata in data:
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
                Chiudi
              </Button>
            </Modal.Footer>
          </Modal>

          {/*unconfirmed*/}

          <Modal
            show={this.state.modalUnconfirmed}
            onHide={this.handleModalUnconfirmed}
          >
            <Modal.Body>
              <div className="row">
                {this.state.selectedClient && (
                  <form onSubmit={this.handleConfirm}>
                    <div className="container-fluid">
                      <p> {this.state.selectedClient.nome}</p>
                      <h4 className="float-right">Campi modificabili</h4>
                      <hr />
                      <h5>NAG</h5>
                      <p>{this.state.selectedClient.nag}</p>
                      <h5>Nome di battesimo</h5>
                      <p> {this.state.selectedClient.nome}</p>
                      <h5>Data di nascita</h5>
                      <p> {this.state.selectedClient.dataNascita}</p>

                      <div className="form-check form-check-wrapper">
                        <input
                          className="form-check-input "
                          type="checkbox"
                          id="telefono"
                          name="telefono"
                          onChange={(e) => {
                            this.handleChange(e.currentTarget, true);
                          }}
                        />
                        <label className="form-check-label" htmlFor="telefono">
                          <h5>Numero di telefono</h5>
                          {this.state.selectedClient.telefono}
                        </label>
                      </div>
                      <br />
                      <div className="form-check form-check-wrapper">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="email"
                          name="email"
                          onChange={(e) => {
                            this.handleChange(e.currentTarget, true);
                          }}
                        />

                        <label className="form-check-label" htmlFor="email">
                          <h5>Email</h5>
                          {this.state.selectedClient.email}
                        </label>
                      </div>
                      <br />
                      <h5>Privacy</h5>
                      {[1, 2, 3, 4, 5, 6].map((privacyNumber) => {
                        return (
                          <div
                            key={privacyNumber}
                            className="form-check form-check-wrapper"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`id-${privacyNumber}`}
                              name={`p${privacyNumber}`}
                              onChange={(e) => {
                                this.handleChange(e.currentTarget, true);
                              }}
                            />

                            <label
                              className="form-check-label"
                              htmlFor={"id-" + privacyNumber}
                            >
                              Privacy {privacyNumber} -{" "}
                              {this.state.selectedClient[
                                `p${privacyNumber}`
                              ] ? (
                                <i className="fa fa-check"></i>
                              ) : (
                                <i className="fa fa-times"></i>
                              )}
                            </label>
                          </div>
                        );
                      })}

                      <br />
                      <div className="form-check form-check-wrapper">
                        <input
                          className="form-check-input "
                          type="checkbox"
                          id="firma"
                          name="firma"
                          onChange={(e) => {
                            this.handleChange(e.currentTarget, true);
                          }}
                        />
                        <label className="form-check-label" htmlFor="firma">
                          <h5>Firma</h5>
                          {this.state.selectedClient.firma}
                        </label>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModalUnconfirmed}>
                Chiudi
              </Button>
              <Button
                variant="success"
                onClick={(e) => {
                  this.handleConfirmCheckModal();
                }}
              >
                Conferma
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            className="modal-confirm"
            show={this.state.confirmCheckModalShow}
            onHide={this.handleConfirmCheckModal}
          >
            <Modal.Header> </Modal.Header>
            <Modal.Body>
              <p>Sicuro di confermare?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={(e) => {
                  this.handleConfirmCheckModal();
                }}
              >
                Chiudi
              </Button>
              <Button
                variant="success"
                onClick={(e) => {
                  this.handleConfirmCheckModal();
                  this.handleModalUnconfirmed();
                  this.handleModalAlreadyConfirmed();
                  this.handleConfirm();
                }}
              >
                Conferma
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}
