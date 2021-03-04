import React, { Component } from "react";
class UnconfirmedModalBody extends Component {
  state = {
    client: this.props.client,
    handleConfirm: this.props.handleConfirm,
    confirmCheckModalShow: false,
  };

  handleChange = (input, isCheckbox) => {
    const client = { ...this.state.client };
    console.log(input.name);
    if (isCheckbox) {
      client[input.name] = input.checked;
    } else {
      client[input.name] = input.value;
    }
    console.log(client);
    this.setState({ client });
  };

  render() {
    console.log(this.state.client);
    return <></>;
  }
}

export default UnconfirmedModalBody;
