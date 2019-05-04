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
    return (
      <div>
        <hr />
        <div className="request-table">
          <div className="request-row">
            <p className="request-cell bold">Recommended Total Thermal Unit:</p>
            {this.props.populate && (
              <p className="request-cell">
                &nbsp; {this.props.serverData.TotalTU}
              </p>
            )}
          </div>
          <div className="request-row">
            <p className="request-cell bold">History Total Thermal Unit:</p>
            {this.props.populate && (
              <p className="request-cell">
                &nbsp;
                {this.props.serverData.currentTU}
              </p>
            )}
          </div>
        </div>
        <div className="report-note">
          <small>&nbsp;Volume SD: 1% &nbsp;</small>
          <small>&nbsp;Embryo SD: 2% &nbsp;</small>
          <small>&nbsp;Firmness SD: 2% &nbsp;</small>
        </div>
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
        {this.props.populate && (
          <LabeledHeatmap
            serverData={this.props.serverData}
            populate={this.props.populate}
            chartData1={this.props.chartData1}
            chartData2={this.props.chartData2}
            chartData3={this.props.chartData3}
            endDate={this.props.endDate}
            reportDate={this.props.reportDate}

          />
        )}
      </div>
    );
  }
}

export default Report;
