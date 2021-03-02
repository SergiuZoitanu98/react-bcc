import React, { Component } from "react";
class UnconfirmedModalBody extends Component {
  state = {
    client: this.props.client,
  };
  render() {
    return (
      <div>
        <div>
          <h5>NAG</h5>
          <p>{this.state.client.nag}</p>
          <h5>Nome di battesimo</h5>
          <p> {this.state.client.nome}</p>
          <h5>Data di nascita</h5>
          <p> {this.state.client.dataNascita}</p>
          <h5>Numero di telefono</h5>
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              {this.state.client.telefono}
            </label>
          </div>
          <h5>Email</h5>
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              {this.state.client.email}
            </label>
          </div>
          <h5>Privacy</h5>
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Privacy 1 {this.state.client.p1}
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Privacy 2{this.state.client.p2}
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Privacy 3 {this.state.client.p3}
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Privacy 4 {this.state.client.p4}
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Privacy 5 {this.state.client.p5}
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Privacy 6 {this.state.client.p6}
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Privacy 7 {this.state.client.p7}
            </label>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default UnconfirmedModalBody;
