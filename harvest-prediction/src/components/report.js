import React, { Component } from "react";
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
                &nbsp; {this.props.serverData.TotalTU.toFixed(2)}
              </p>
            )}
          </div>
          <div className="request-row">
            <p className="request-cell bold">History Total Thermal Unit:</p>
            {this.props.populate && (
              <p className="request-cell">
                &nbsp;
                {this.props.serverData.currentTU.toFixed(2)}
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
          <tbody>
            <tr className="table-header">
              <th id="report-date">Date</th>
              <th id="report-thermal">Thermal Unit</th>
              <th id="report-volume">Volume(%)</th>
              <th id="report-embryo">Embryo(%)</th>
              <th id="report-firmness">Firmness(%)</th>
            </tr>

            {this.props.populate &&
              this.props.reportDate.map((x, i) => (
                <tr key={i} className="report-row">
                  <td>{this.props.reportDate[i]}</td>
                  <td>{this.props.serverData.resultTable.predict14Days[i]}</td>
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
              ))}
          </tbody>
        </table>
        <hr />
        {this.props.populate && (
          <LabeledHeatmap
            serverData={this.props.serverData}
            populate={this.props.populate}
            endDate={this.props.endDate}
            reportDate={this.props.reportDate}
            chartAll={this.props.chartAll}
          />
        )}
      </div>
    );
  }
}

export default Report;
