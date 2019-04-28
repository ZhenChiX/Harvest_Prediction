import React from "react";
import "./App.css";
import Prediction from "./components/prediction";
import Appbar from "./components/appbar";
// react-fabric
import { initializeIcons } from "@uifabric/icons";
initializeIcons();

function App() {
  return (
    <div className="App">
      <header>
        <div className="App-header">
          <h2 className="App-title">Harvest Predition</h2>
          <img
            src="https://www.plantsciences.ucdavis.edu/themes/contrib/sitefarm_one/images/uc-logo-white.svg"
            className="Uc-logo"
          />
        <Appbar />
        </div>
      </header>

      <div className="App-body">
        <Prediction />
      </div>
    </div>
  );
}

export default App;
