import React, { Component } from "react";
// import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
// import { disableBodyScroll } from "@uifabric/utilities";
import Report from "./report";

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
    this.myRef = React.createRef();
    this.state = {
      startDate: "",
      endDate: "",
      zipcode: "",
      reportDate: []
    };
  }
  //SMOOTH SCROLL TO ELEMENT//
  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
    console.log(this.state);
  };
  fetchResult = e => {
    e.preventDefault();
    this.scrollToMyRef();
    this.dateAddOne();
  };

  // ADD ONE DAY TO PREDICTION DATE//
  dateAddOne = () => {
    let tomorrow = new Date(this.state.endDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let dateArray = [tomorrow.toLocaleDateString()];
    for (let i = 0; i < 13; i++) {
      tomorrow.setDate(tomorrow.getDate() + 1);
      let newDate = tomorrow.toLocaleDateString();
      dateArray = [...dateArray, newDate];
      this.setState({
        reportDate: dateArray
      });
    }
  };

  render() {
    {
      console.log(this.state);
    }
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
                min="1900-01-01"
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
                min="1900-01-01"
                // min={this.state.startDate}
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
                pepe="showpepe"
                onChange={this.onChange}
                name="zipcode"
                style={styles.select}
                select
                defaultValue="93234"
              >
                <option value="93234" text="93234 / Huron,CA">
                  93234 / Huron,CA
                </option>
                <option value="93280" text="93280 / Wasco,CA">
                  93280 / Wasco,CA
                </option>
                <option value="93640" text="93640 / Mendota,CA">
                  93640 / Mendota,CA
                </option>
                <option value="93648" text="93648 / Parlier,CA">
                  93648 / Parlier,CA
                </option>
                <option value="95912" text="95912 / Arbuckle,CA<">
                  95912 / Arbuckle,CA
                </option>
                <option value="97124" text="97124 / Hillsboro">
                  97124 / Hillsboro
                </option>
              </select>
              <span style={styles.inputSpan}>Select a ZIP Code</span>
            </fieldset>
            <PrimaryButton onClick={this.fetchResult}>Predict</PrimaryButton>
          </form>
        </div>

        <div className="container request">
          <div className="arrowBubble left" />
          <h3>Request</h3>
          <p>Calculation by the thermal unit formula and the R model</p>
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
                Kerman
              </p>
            </div>
            <div className="result-row">
              <p className="result-cell">Model Selection:</p>
              <p className="result-cell" style={styles.resultP}>
                Pistachio_Model_3
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
        <div ref={this.myRef} className="container report">
          <div className="arrowBubble up" />

          <h3>Report</h3>
          <Report
            dateAddOne={this.dateAddOne}
            reportDate={this.state.reportDate}
            endDate={this.state.endDate}
          />
        </div>
      </div>
    );
  }
}

export default Prediction;
