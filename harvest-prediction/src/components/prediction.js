import React, { Component } from "react";
import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";
import { Callout } from "office-ui-fabric-react/lib/Callout";

const styles = {
  fieldset: {
    maxWidth: "300px",
    borderRadius: "10px",
    border: "#DDDDDD solid 2px",
    margin: "1em"
  },

  legend: {
    textAlign: "left",
    color: "black",
    fontWeight: "bold"
  },
  inputDate: {
    display: "block"
  },
  inputSpan: {
    background: "#F3F3F3",
    display: "block",

    margin: "1em -0.5em -0.5em -0.5em",
    textAlign: "center",
    color: "#C0C0C0",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "1em",
    borderRadius: "3px"
  }
};

class Prediction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <h3>Harvest Prediction</h3>
        {/* <form>
          <fieldset>
            <legend>Input your input</legend>
            <label for="input1">
              <span>Start Date</span>
              <input type="date" name="input1" />
            </label>
            <label for="input2">
              <span>End Date</span>
              <input name="input2" />
            </label>
          </fieldset>
        </form> */}

        <form>
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Start Date</legend>
            {/* <input type="date" /> */}

            {/* <DatePicker
              label="Start date"
              isRequired={false}
              allowTextInput={true}
              onSelectDate={this._onSelectDate}
              formatDate={this._onFormatDate}
              parseDateFromString={this._onParseDateFromString}
            /> */}
            <input style={styles.inputDate} type="date" />

            <span style={styles.inputSpan}>Enter/Select a start date</span>
          </fieldset>

          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>End Date</legend>
            <input style={styles.inputDate} type="date" />
            <span style={styles.inputSpan}>Enter/Select a end date</span>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Prediction;
