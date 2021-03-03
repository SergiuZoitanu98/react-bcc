import React, { Component } from "react";
class UnconfirmedModalBody extends Component {
  state = {
    client: this.props.client,
  };

  handleChange = ({ currentTarget: input }) => {
    const client = { ...this.state.client };
    client[input.name] = input.value;
    this.setState({ client });
  };

  render() {
    return (
      <form action={this.handleSubmit}>
        <div className="container-fluid">
          <h5>NAG</h5>
          <p>{this.state.client.nag}</p>
          <h5>Nome di battesimo</h5>
          <p> {this.state.client.nome}</p>
          <h5>Data di nascita</h5>
          <p> {this.state.client.dataNascita}</p>
          <h5>Numero di telefono</h5>
          <div className="form-check">
            <input
              className="form-check-input "
              type="checkbox"
              value="numeroTelefono"
              id="telefono"
              name="numeroDiTelefono"
            />
            <label className="form-check-label" htmlFor="telefono">
              {this.state.client.telefono}
            </label>
          </div>
          <h5>Email</h5>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="email"
              id="email"
              name="email"
            />
            <label className="form-check-label" htmlFor="email">
              {this.state.client.email}
            </label>
          </div>
          <h5>Privacy</h5>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="privacy1"
              id="p1"
              name="privacy1"
            />
            <label className="form-check-label" htmlFor="p1">
              Privacy 1 {this.state.client.p1}
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="privacy2"
              id="p2"
              name="privacy2"
            />
            <label className="form-check-label" htmlFor="p2">
              Privacy 2{this.state.client.p2}
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="privacy3"
              id="p3"
              name="privacy3"
            />
            <label className="form-check-label" htmlFor="p3">
              Privacy 3 {this.state.client.p3}
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="privacy4"
              id="p4"
              name="privacy4"
            />
            <label className="form-check-label" htmlFor="p4">
              Privacy 4 {this.state.client.p4}
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="privacy5"
              id="p5"
              name="privacy5"
            />
            <label className="form-check-label" htmlFor="p5">
              Privacy 5 {this.state.client.p5}
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="privacy6"
              id="p6"
              name="privacy6"
            />
            <label className="form-check-label" htmlFor="p6">
              Privacy 6 {this.state.client.p6}
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="privacy7"
              id="p7"
              name="privacy7"
            />
            <label className="form-check-label" htmlFor="p7">
              Privacy 7 {this.state.client.p7}
            </label>
          </div>
          <br />
        </div>
      </form>
    );
  }
}

export default UnconfirmedModalBody;
