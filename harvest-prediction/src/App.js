import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Prediction from "./components/prediction";
import Appbar from "./components/appbar";

// react-fabric
// import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

function App() {
  return (
    <div className="App">
      <header>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </header>

      <div className="App-body">
        <Appbar />
        <Prediction />
      </div>
    </div>
  );
}

export default App;
