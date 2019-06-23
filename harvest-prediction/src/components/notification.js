import React, { Component } from "react";

class Notification extends Component {
  state = {
    notification: true,
    error: {
      errorMessageTitle: "Invalid Input",
      errorMessage1: "Please provide valid input",
      errorMessage2:
        "The prediction date must be greater than the start date(Ideally within a year to get an accuracte forecast)"
    }
  };
  onClose = () => {
    this.props.close();
  };
  render() {
    return this.state.notification && this.props.notification ? (
      <div className="notification">
        <i
          onClick={this.onClose}
          className="fas fa-times-circle"
          style={{ float: "right", cursor: "pointer" }}
        />
        <h4>
          <i
            className="fas fa-bug"
            style={{ float: "left", padding: "0 0.5em" }}
          />
          Error Message: {this.state.error.errorMessage}
        </h4>
        <p>{this.state.error.errorMessage1}</p>
        <p>{this.state.error.errorMessage2}</p>
      </div>
    ) : null;
  }
}

export default Notification;
