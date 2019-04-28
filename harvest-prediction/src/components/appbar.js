import React, { Component } from "react";
// react-fabric
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

class Appbar extends Component {
  state = {};
  render() {
    return (
      <div className="App-bar">
        <div className="App-wrapper">
          <ul>
            <li className="App-menu_list">
              <PrimaryButton
                className="App-menu_button"
                iconProps={{
                  iconName: "chevronUpSmall",
                  style: { transform: "rotate(90deg)" }
                }}
              >
                Prediction
              </PrimaryButton>
            </li>
            <li className="App-menu_list">
              <PrimaryButton
                className="App-menu_button"
                iconProps={{
                  iconName: "chevronUpSmall",
                  style: { transform: "rotate(90deg)" }
                }}
              >
                About
              </PrimaryButton>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Appbar;
