import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // date: this.data.StartDate
    };
  }

  componentDidMount() {}

  render() {
    const data = [
      {
        currentTU: 0,
        TotalTU: 2577.27554,
        StartDate: "3/3/2019",
        resultTable: [
          [
            17,
            32.5,
            48,
            61,
            73,
            85,
            98.5,
            113,
            124.5,
            135.5,
            146.5,
            156.5,
            168.5,
            181.5
          ],
          [
            0.59,
            1.1,
            1.9,
            2.85,
            3.99,
            5.43,
            7.39,
            9.94,
            12.27,
            14.74,
            17.43,
            20.04,
            23.35,
            27.1
          ],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [
            0.31,
            0.39,
            0.47,
            0.55,
            0.64,
            0.74,
            0.86,
            1.01,
            1.14,
            1.28,
            1.44,
            1.59,
            1.78,
            2.01
          ]
        ]
      }
    ];
    return (
      <div>
        <h3 />
        <table id="report-table">
          <tr className="table-header">
            <th id="report-date">Date</th>
            <th id="report-heat">Heat Unit</th>
            <th id="report-volume">Volume(%)</th>
            <th id="report-embryo">Embryo(%)</th>
            <th id="report-firmness">Firmness(%)</th>
          </tr>

          {data[0].resultTable[0].map(
            (x, i) => (
              this.props.dateAddOne,
              (
                <tr key={i} className="report-row">
                  <td>{this.props.reportDate[i]}</td>
                  <td>{x}</td>
                  <td>{data[0].resultTable[1][i]}</td>
                  <td>{data[0].resultTable[2][i]}</td>
                  <td>{data[0].resultTable[3][i]}</td>
                </tr>
              )
            )
          )}
        </table>
      </div>
    );
  }
}

export default Report;