import React, { Component } from "react";

class Notification extends Component {
  state = {
    notification: true
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
          Error Message: Invalid Input
        </h4>
        <p>Please provide valid input </p>
        <p>
          The prediction date must be greater than the start date(Ideally within
          a year to get an accuracte forecast)
        </p>
      </div>
    ) : null;
  }
}

export default Notification;
