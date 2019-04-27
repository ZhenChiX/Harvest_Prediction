import React, { Component } from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import {
  TextField,
  MaskedTextField
} from "office-ui-fabric-react/lib/TextField";
import { disableBodyScroll } from "@uifabric/utilities";

const styles = {
  fieldset: {
    maxWidth: "300px",
    borderRadius: "10px",
    border: "#DDDDDD solid 2px",
    margin: "1em auto"
  },

  legend: {
    textAlign: "left",
    color: "black",
    fontWeight: "bold"
  },

  inputSpan: {
    background: "#F3F3F3",
    display: "block",
    margin: "1em -0.5em -0.5em -0.5em",
    textAlign: "center",
    color: "rgba(130,130,130,1)",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "1em",
    borderRadius: "3px"
  },
  resultP: {
    // fontWeight: "bold"
  },
  select: {
    width: "100%",
    height: "2em",
    margin: 0,
    padding: "0 0 0 .5em",
    cursor: "pointer",
    webkitAppearance: "menulist-button"
  }
};

class Prediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   startDate: "",
      //   endDate: "",
      zipcode: ""
    };
  }
  onChange = e => {
    // e.preventDefault();
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <div className="App-layout ">
        <div className="container prediction">
          <h3>Harvest Prediction</h3>
          <form>
            <fieldset style={styles.fieldset}>
              <legend style={styles.legend}>Start Date</legend>
              <TextField
                name="startDate"
                onChange={this.onChange}
                type="date"
                min="1000-01-01"
                max="9999-12-31"
                iconProps={{
                  iconName: "DateTime",
                  style: { color: "rgba(130,130,130)" }
                }}
              />

              <span style={styles.inputSpan}>Enter/Select a start date</span>
            </fieldset>

            <fieldset style={styles.fieldset}>
              <legend style={styles.legend}>End Date</legend>
              <TextField
                name="endDate"
                onChange={this.onChange}
                type="date"
                min="1000-01-01"
                max="9999-12-31"
                iconProps={{
                  iconName: "DateTime",
                  style: { color: "rgba(130,130,130)" }
                }}
              />

              <span style={styles.inputSpan}>Enter/Select a end date</span>
            </fieldset>

            <fieldset style={styles.fieldset}>
              <legend style={styles.legend}>ZIP Code</legend>
              <select
                onChange={this.onChange}
                name="zipcode"
                style={styles.select}
                select
                defaultValue="90003"
              >
                <option value="90001">90001</option>
                <option value="90002">90002</option>
                <option value="90003">90003</option>
                <option value="90004">90004</option>
              </select>
              <span style={styles.inputSpan}>Select a ZIP Code</span>
            </fieldset>
            <PrimaryButton>Predict</PrimaryButton>
          </form>
        </div>

        <div className="container request">
          <div className="arrowBubble left" />
          <h3>Request</h3>
          <hr />
          <div className="result-table">
            <div className="result-row">
              <p className="result-cell">Bloom Date:</p>
              <p className="result-cell" style={styles.resultP}>
                {this.state.startDate}
              </p>
            </div>
            <div className="result-row">
              <p className="result-cell">End Date:</p>
              <p className="result-cell" style={styles.resultP}>
                {this.state.endDate}
              </p>
            </div>
            <div className="result-row">
              <p className="result-cell">Cultivar:</p>
              <p className="result-cell" style={styles.resultP}>
                XXXXX
              </p>
            </div>
            <div className="result-row">
              <p className="result-cell">Model Selection:</p>
              <p className="result-cell" style={styles.resultP}>
                XXXXX
              </p>
            </div>
            <div className="result-row">
              <p className="result-cell">ZIP Code:</p>
              <p className="result-cell" style={styles.resultP}>
                {this.state.zipcode}
              </p>
            </div>
          </div>
          <hr />
        </div>
        <div className="container report">
          <div className="arrowBubble up" />

          <h3>Report</h3>
        </div>
      </div>
    );
  }
}

export default Prediction;
