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
    show: false,
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
        for (let i = 0; i < response.data.length; i++) {
          let date = new Date(response.data[i].lastModify);
          response.data[i].lastModify = date.toLocaleDateString();
        }
        for (let i = 0; i < response.data.length; i++) {
          let date2 = new Date(response.data[i].dataNascita);
          response.data[i].dataNascita = date2.toLocaleDateString();
        }

        this.setState({ clients: [] });
        this.setState({ clients: response.data });
      })
      .catch((error) => {
        // handle error
        toast.error("Nessuna corrispondenza trovata");
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
  displayMessage = () => {
    toast.success("Cliente confermato");
  };

  hideButtons = () => {
    var x = document.getElementById("myDiv");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
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
          <h3 className="text-left pt-2 pl-2">RICERCA CLIENTI</h3>
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
              {" "}
              <p>
                L'anagrafica del cliente è stata confermata in data:
                <b>
                  {this.state.selectedClient &&
                    this.state.selectedClient.lastModify}
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
                          {this.state.selectedClient.firma ? (
                            <i className="fa fa-check"></i>
                          ) : (
                            <i className="fa fa-times"></i>
                          )}
                        </label>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div id="myDiv">
                <Button
                  className="mr-2"
                  variant="success"
                  onClick={(e) => {
                    this.handleConfirmCheckModal();
                    this.hideButtons();
                  }}
                >
                  Conferma
                </Button>
                <Button
                  variant="secondary"
                  onClick={this.handleModalUnconfirmed}
                >
                  Chiudi
                </Button>
              </div>
              {this.state.confirmCheckModalShow ? (
                <div>
                  Sicuro di voler confermare?
                  <button
                    type="button"
                    class="btn btn-primary btn-sm ml-2"
                    onClick={(e) => {
                      this.handleConfirmCheckModal();
                      this.handleModalUnconfirmed();
                      this.handleModalAlreadyConfirmed();
                      this.handleConfirm();
                      this.displayMessage();
                    }}
                  >
                    Si
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm ml-2"
                    onClick={(e) => {
                      this.handleConfirmCheckModal();
                      this.hideButtons();
                    }}
                  >
                    No
                  </button>
                </div>
              ) : (
                ""
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}
