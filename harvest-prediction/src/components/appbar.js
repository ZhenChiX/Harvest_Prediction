import React, { Component } from "react";
// react-fabric
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

const styles = {
  appbar: {
    // position: "absolute",
    top: "10vh"
  }
};
class Appbar extends Component {
  state = {};
  render() {
    return (
      <div style={styles.appbar}>
        <PrimaryButton>Prediction</PrimaryButton>
        <PrimaryButton>About</PrimaryButton>
      </div>
    );
  }
}

export default Appbar;
