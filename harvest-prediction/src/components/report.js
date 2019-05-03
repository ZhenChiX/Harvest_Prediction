import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import LabeledHeatmap from "./chart";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populate: false
    };
  }

  render() {
    // if (!this.props.serverData)
    return (
      <div>
        <hr />
        <table id="report-table">
          <tr className="table-header">
            <th id="report-date">Date</th>
            <th id="report-thermal">Thermal Unit</th>
            <th id="report-volume">Volume(%)</th>
            <th id="report-embryo">Embryo(%)</th>
            <th id="report-firmness">Firmness(%)</th>
          </tr>

          {this.props.populate &&
            this.props.reportDate.map(
              (x, i) => (
                this.props.dateAddOne,
                (
                  <tr key={i} className="report-row">
                    <td>{this.props.reportDate[i]}</td>
                    <td>
                      {this.props.serverData.resultTable.predict14Days[i]}
                    </td>
                    <td>
                      {this.props.serverData.resultTable.pred14DaysVolume[i]}
                    </td>
                    <td>
                      {this.props.serverData.resultTable.pred14DaysEmbyro[i]}
                    </td>
                    <td>
                      {this.props.serverData.resultTable.pred14DaysFirmness[i]}
                    </td>
                  </tr>
                )
              )
            )}
        </table>
        <hr />
        <LabeledHeatmap />
      </div>
    );
  }
}

export default Report;
