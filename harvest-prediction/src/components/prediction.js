import React, { Component } from "react";
// import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
// import { disableBodyScroll } from "@uifabric/utilities";
import Report from "./report";
import LabeledHeatmap from "./chart";

import { TeachingBubble } from "office-ui-fabric-react/lib/TeachingBubble";
import Notification from "./notification";

const serverData = {
  currentTU: 1052.88,
  TotalTU: 2514.91537,
  StartDate: "04012019",
  resultTable: {
    predict14Days: [
      1067.38,
      1082.88,
      1099.88,
      1112.38,
      1124.88,
      1138.38,
      1154.38,
      1171.38,
      1190.38,
      1209.88,
      1229.38,
      1249.38,
      1268.88,
      1284.88
    ],
    pred14DaysVolume: [
      99.92,
      99.93,
      99.94,
      99.94,
      99.95,
      99.95,
      99.96,
      99.97,
      99.97,
      99.97,
      99.98,
      99.98,
      99.98,
      99.99
    ],
    pred14DaysEmbyro: [
      29.32,
      31.09,
      33.04,
      34.49,
      35.94,
      37.5,
      39.35,
      41.31,
      43.49,
      45.7,
      47.89,
      50.09,
      52.2,
      53.89
    ],
    pred14DaysFirmness: [
      62.01,
      63.09,
      64.25,
      65.09,
      65.91,
      66.78,
      67.79,
      68.84,
      69.98,
      71.12,
      72.22,
      73.32,
      74.36,
      75.18
    ]
  }
};
let url = "http://45.33.57.20:3000/wudb";
// let url = "http://dummy.restapiexample.com/api/v1/employee/20972";

// let url ="http://45.33.57.20:3000/r?startDate=04012019&endDate=04282019&zipcode=93280"
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
      reportDate: [],
      notification: false,
      returnAPI: null,
      populate: false
      // serverData: serverData
    };
  }
  //SMOOTH SCROLL TO ELEMENT//
  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //INPUT VALIDATION LOGIC//
  inputValidation = () => {
    let endDate = new Date(this.state.endDate);
    let startDate = new Date(this.state.startDate);
    let daysGap = (endDate - startDate) / 86400000;
    console.log("Day's Gap:" + daysGap);

    if (daysGap < 1 || daysGap >= 365) {
      this.setState({
        notification: true
      });
      console.log("not in range");
    } else {
      this.setState(
        {
          serverData: serverData
        },
        () => {
          this.setState({ populate: true });
          this.dateAddOne();
          console.log(this.state);
          this.scrollToMyRef();
        }
      );
    }
  };
  // ONE BUTTON TO RULE THEM ALL //
  fetchResult = e => {
    e.preventDefault();
    // this.scrollToMyRef();
    this.inputValidation();
    // this.fetchAPI();
    // this.setState(
    //   {
    //     serverData: serverData
    //   },
    //   () => {
    //     this.setState({ populate: true });
    //     this.dateAddOne();
    //     console.log(this.state);
    //   }
    // );
  };

  //ADD ONE DAY TO PREDICTION DATE//
  dateAddOne = () => {
    let tomorrow = new Date(this.state.endDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let dateArray = [tomorrow.toLocaleDateString()];
    for (
      let i = 0;
      i < this.state.serverData.resultTable.predict14Days.length;
      i++
    ) {
      tomorrow.setDate(tomorrow.getDate() + 1);
      let newDate = tomorrow.toLocaleDateString();
      dateArray = [...dateArray, newDate];
      this.setState({
        reportDate: dateArray
      });
    }
  };

  //GET FETCH
  fetchAPI = async () => {
    try {
      let response = await fetch(url, {
        mode: "cors",
        headers: {
          AccessControlAllowOrigin: "*"
        }
      });
      let returnAPI = await response.json();
      console.log(returnAPI);
      this.setState({ returnAPI: returnAPI });
      console.log(this.state);
    } catch (e) {
      console.log(e.message);
      console.log("something went wrong");
    }
  };
  // CLOSE NOTIFICATION
  closeNotification = () => {
    this.setState({ notification: false });
  };

  // fetchAPI2 = () => {
  //   fetch(url)
  //     .then(function(response) {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then(function(response) {
  //       console.log("ok");
  //       console.log(response);
  //       let returnAPI = response;
  //       this.setState({ returnAPI: { returnAPI } });
  //       console.log(this.state);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // };
  render() {
    return (
      <div className="App-layout ">
        <div className="container prediction">
          <h2>Harvest Prediction</h2>
          <form onSubmit={this.fetchResult}>
            <fieldset style={styles.fieldset}>
              <legend style={styles.legend}>Start Date</legend>
              <TextField
                type="sub"
                name="startDate"
                onChange={this.onChange}
                type="date"
                min="1900-01-01"
                max="9999-12-31"
                required
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
                max="9999-12-31"
                required
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
                selected
                required
              >
                <option value="" selected disabled hidden>
                  -- Select an option --
                </option>
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
                <option value="97124" text="97124 / Hillsboro,OR">
                  97124 / Hillsboro,OR
                </option>
              </select>
              <span style={styles.inputSpan}>Select a ZIP Code</span>
            </fieldset>
            {this.state.notification ? (
              <Notification
                notification={this.state.notification}
                close={this.closeNotification}
              />
            ) : null}
            <PrimaryButton type="submit">Predict</PrimaryButton>
          </form>
        </div>

        <div id={"pepe"} className="container request">
          <div className="arrowBubble left" />
          <h2>Request</h2>
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

          <h2>Report</h2>
          <Report
            dateAddOne={this.dateAddOne}
            reportDate={this.state.reportDate}
            endDate={this.state.endDate}
            serverData={this.state.serverData}
            populate={this.state.populate}
          />
        </div>

        {/* <div className="container heatmap">
          <div className="arrowBubble up" />
      
        </div> */}
      </div>
    );
  }
}

export default Prediction;
