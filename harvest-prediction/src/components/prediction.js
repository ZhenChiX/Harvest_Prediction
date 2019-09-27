import React, { Component } from "react";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { DatePicker } from "office-ui-fabric-react";
import Report from "./report";
import Notification from "./notification";

const DayPickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],

  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],

  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],

  shortDays: ["S", "M", "T", "W", "T", "F", "S"],
  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year",
  closeButtonAriaLabel: "Close date picker",
  isRequiredErrorMessage: "Start date is required.",
  invalidInputErrorMessage: "Invalid date format."
};

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

  select: {
    width: "100%",
    height: "2em",
    margin: 0,
    padding: "0 0 0 .5em",
    cursor: "pointer",
    WebkitAppearance: "menulist-button"
  }
};

class Prediction extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      startDate: "",
      endDate: "",
      startDateDemo: "",
      endDateDemo: "",
      zipcode: "",
      reportDate: [],
      notification: false,
      populate: false,
      serverData: null,
      stations: null,

      errorValidation: {
        errorMessageTitle: "Invalid Input",
        errorMessage1: "Please provide valid input",
        errorMessage2:
          "The prediction date must be greater than the start date(Ideally within a year to get an accuracte forecast)"
      },

      errorTimeOut: {
        errorMessageTitle: "Request Timeout",
        errorMessage1: "Oops,something went wrong.",
        errorMessage2: "PLEASE TRY AGAIN LATER."
      },
      errorStatus: {
        errorMessageTitle: "",
        errorMessage1: "Oops,something went wrong.",
        errorMessage2: "WE'LL BE RIGHT BACK !!! "
      }
    };
  }

  // RENDER DROP DOWN LIST FOR LOCATION SELECT
  componentDidMount() {
    this.fetchAPI_Stations();
  }

  // LOAD LOCATIONS FROM REST API
  fetchAPI_Stations = async () => {
    const url = "https://pistachio.plantsciences.ucdavis.edu:8888/wudb";
    let response = await fetch(url);
    let returnAPI = await response.json();
    if (returnAPI) {
      this.setState({
        stations: returnAPI
      });
    }
  };
  //GET FETCH 10 DAYS PREDICTION
  fetchAPI = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 5000);

    console.log(signal);
    const url = `https://pistachio.plantsciences.ucdavis.edu:8888/r?startDate=${this.state.startDate}&endDate=${this.state.endDate}&zipcode=${this.state.zipcode}`;

    try {
      let response = await fetch(url, { signal });
      let returnAPI = await response.json();
      if (response.ok) {
        this.setState({ serverData: returnAPI, populate: true });
        console.log(`Status: ${response.status}  `);
      }
      if (!response.ok) {
        this.setState({
          notification: true,
          errorValidation: {
            errorMessageTitle: response.status,
            errorMessage1: this.state.errorStatus.errorMessage1,
            errorMessage2: this.state.errorStatus.errorMessage2
          }
        });
        console.log(
          `${response.status}: Oops,something went wrong! WE'LL BE RIGHT BACK`
        );
      }
    } catch (e) {
      this.setState({
        notification: true,
        errorValidation: {
          errorMessageTitle: e.toString(),
          errorMessage1: this.state.errorTimeOut.errorMessage1,
          errorMessage2: this.state.errorTimeOut.errorMessage2
        }
      });
      console.log(e);
      console.log("Oops,something went wrong! WE'LL BE RIGHT BACK");
    }
  };
  //SMOOTH SCROLL TO ELEMENT//
  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

  //COMPONENT ON CHANGE UPDATE
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state)
  };
  //STORE DATAPICKER DATE
  getStartDate = date => {
    let formatDate = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    this.setState({ startDateDemo: date, startDate: formatDate });
  };

  getEndDate = date => {
    let formatDate = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    this.setState({ endDateDemo: date, endDate: formatDate });
  };

  onFormatDate = date => {
    return `${date.getMonth() + 1} - ${date.getDate()} - ${date.getFullYear()}`;
  };
  //INPUT VALIDATION LOGIC//
  inputValidation = () => {
    let endDate = new Date(this.state.endDate);
    let startDate = new Date(this.state.startDate);
    let daysGap = (endDate - startDate) / 86400000;
    this.setState({ daysGap: daysGap });

    if (daysGap < 0) {
      this.setState({
        notification: true
      });
      console.log("not in range");
    } else {
      this.fetchAPI().then(() => {
        if (this.state.populate === true) {
          this.dateAddOne();
          this.combineData();
          this.scrollToMyRef();
        }
      });
    }
  };
  // ONE BUTTON TO RULE THEM ALL //
  fetchResult = e => {
    e.preventDefault();
    this.inputValidation();
  };

  // FORMAT DATE FROM API CALL //
  formatDate = date => {
    return date.replace(/[-]/g, "/");
  };

  //STORE CONSECUTIVE PREDICTION DATE IN ARRAY//
  dateAddOne = () => {
    let formatDate = this.formatDate(this.state.endDate);
    let tomorrow = new Date(formatDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let dateArray = [tomorrow.toLocaleDateString()];
    for (
      let i = 0;
      i < this.state.serverData.resultTable.predict14Days.length - 1;
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
  // CLOSE NOTIFICATION
  closeNotification = () => {
    this.setState({ notification: false });
  };
  // ONLY GETTING MM/DD
  getMMDD = str => {
    let formatDate = str.split("");
    formatDate.splice(-5, 5);
    return formatDate.join("");
  };

  combineData = () => {
    let chartAll = [];
    for (let i in this.state.serverData.resultTable.predict14Days) {
      chartAll.push({
        day: parseInt(i) + 1,
        name: this.state.reportDate[i],
        date: this.getMMDD(this.state.reportDate[i]),
        thermal: this.state.serverData.resultTable.predict14Days[i],
        volume: this.state.serverData.resultTable.pred14DaysVolume[i],
        embryo: this.state.serverData.resultTable.pred14DaysEmbyro[i],
        firmness: this.state.serverData.resultTable.pred14DaysFirmness[i]
      });
    }
    this.setState({
      chartAll: chartAll
    });
  };
  render() {
    return (
      <div className="App-layout ">
        <div className="container prediction">
          <h2>Harvest Prediction</h2>
          <form onSubmit={this.fetchResult}>
            <fieldset style={styles.fieldset}>
              <legend style={styles.legend}>Start Date</legend>
              <DatePicker
                name="startDateDemo"
                data-name="THIS IS MY NAME"
                placeholder="Select a start date"
                isRequired={true}
                // allowTextInput={true}
                strings={DayPickerStrings}
                value={this.state.startDateDemo}
                onSelectDate={this.getStartDate}
                formatDate={this.onFormatDate}
              />
              <span style={styles.inputSpan}>Enter/Select a start date</span>
            </fieldset>

            <fieldset style={styles.fieldset}>
              <legend style={styles.legend}>End Date</legend>
              <DatePicker
                name="endDateDemo"
                placeholder="Select a end date"
                isRequired={true}
                // allowTextInput={true}
                strings={DayPickerStrings}
                value={this.state.endDateDemo}
                onSelectDate={this.getEndDate}
                formatDate={this.onFormatDate}
              />
              <span style={styles.inputSpan}>Enter/Select a end date</span>
            </fieldset>

            <fieldset style={styles.fieldset}>
              <legend style={styles.legend}>ZIP Code</legend>
              <select
                onChange={this.onChange}
                name="zipcode"
                style={styles.select}
                required
              >
                <option value="" hidden>
                  -- Select an option --
                </option>
                {this.state.stations !== null &&
                  this.state.stations.map((x, i) => (
                    <option
                      key={i}
                      value={x.zipcode}
                      text={`${x.zipcode} / ${x.name}`}
                    >
                      {`${x.zipcode} / ${x.name}`}
                    </option>
                  ))}
              </select>
              <span style={styles.inputSpan}>Select a ZIP Code</span>
            </fieldset>

            {this.state.notification ? (
              <Notification
                errorValidation={this.state.errorValidation}
                notification={this.state.notification}
                close={this.closeNotification}
              />
            ) : null}
            <PrimaryButton type="submit">Predict</PrimaryButton>
          </form>
        </div>

        <div className="container request">
          <div className="arrowBubble left" />
          <h2>Request</h2>
          <p>Calculation by the thermal unit formula and the R model</p>
          <hr />
          <div className="request-table">
            <div className="request-row">
              <p className="request-cell bold">Bloom Date:</p>
              <p className="request-cell" style={styles.resultP}>
                {this.state.startDate}
              </p>
            </div>
            <div className="request-row">
              <p className="request-cell bold">End Date:</p>
              <p className="request-cell" style={styles.resultP}>
                {this.state.endDate}
              </p>
            </div>

            <div className="request-row">
              <p className="request-cell bold">Cultivar:</p>
              <p className="request-cell" style={styles.resultP}>
                Kerman
              </p>
            </div>
            <div className="request-row">
              <p className="request-cell bold">Model Selection:</p>
              <p className="request-cell" style={styles.resultP}>
                Pistachio_Model_3
              </p>
            </div>
            <div className="request-row">
              <p className="request-cell bold">ZIP Code:</p>
              <p className="request-cell" style={styles.resultP}>
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
            chartAll={this.state.chartAll}
          />
        </div>
      </div>
    );
  }
}

export default Prediction;
