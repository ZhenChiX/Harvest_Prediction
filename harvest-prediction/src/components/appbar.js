import React, { Component } from "react";
// react-fabric
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import logo from "../../src/logo.svg";

const styles = {
  //   appbar: {
  //     position: "relative",
  //     top: "30px",
  //     zIndex: 1024,
  //     width: "100vw"
  //   },
  //   wrapper: {
  //     margin: "0 auto",
  //     width: "100vw"
  //   },
  //   menu: {
  //     width: "200px",
  //     fontSize: "1.5em"
  // height: "1.5em"
  //   }
};
class Appbar extends Component {
  state = {};
  render() {
    return (
      <div className="App-bar">
        <div className="App-wrapper" style={styles.wrapper}>
          <PrimaryButton
            className="App-menu"
            iconProps={{
              iconName: "chevronUpSmall",
              style: { transform: "rotate(90deg)" }
            }}
          >
            Prediction
          </PrimaryButton>
          <img src={logo} className="App-logo" alt="logo" />
          <PrimaryButton
            className="App-menu"
            iconProps={{
              iconName: "chevronUpSmall",
              style: { transform: "rotate(90deg)" }
            }}
          >
            About
          </PrimaryButton>
        </div>
      </div>
    );
  }
}

export default Appbar;
