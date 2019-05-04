import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { curveCatmullRom } from "d3-shape";
import {
  XYPlot,
  XAxis,
  YAxis,
  HeatmapSeries,
  LabelSeries,
  Hint,
  makeWidthFlexible,
  HexbinSeries,
  ChartLabel,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  MarkSeries,
  Highlight,
  Crosshair,
  Voronoi,
  DiscreteColorLegend,
  FlexibleXYPlot
} from "react-vis";
import { autobind } from "@uifabric/utilities";

// magic numbers chosen for design
const sizeRange = [5, 13];
// const margin = { "1em"auto };
const width = 600;
const height = 600;

const ITEMS = [
  {
    title: "Volume %",
    // color: "#45aeb1",
    strokeStyle: "dashed",
    strokeLinejoin: "round",
    strokeWidth: 3
  },
  {
    title: "Embryo %",
    //  color: "#f93",
    strokeDasharray: "7, 3"
  },
  { title: "Firmness %", strokeWidth: 3 }
];

const styles = {
  chart: {
    // margin: "1em auto"
  }
};
// const FlexibleXYPlot = makeVisFlexible(XYPlot);
export default class LabeledHeatmap extends Component {
  state = {
    value: null,
    height: 0,
    width: 0,
    selectedPointId: null,
    hoveredNode: null
  };

  _forgetValue = () => {
    this.setState({
      value: null
    });
  };

  _rememberValue = value => {
    this.setState({ value });
  };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  render() {
    const { value } = this.state;
    const {
      crosshairValues,
      selectedPointId,
      hoveredNode,
      showVoronoi
    } = this.state;
    const exampleColorScale = scaleLinear();
    let { endDate } = this.props;
    console.log(this.props);
    const {} = this.state;
    return (
      <div className="report-charts">
        {/* ANOTHER CHART */}

        <XYPlot
          className="report-lineChart"
          style={styles.chart}
          width={width}
          height={height}
        >
          {/* <FlexibleXYPlot style={styles.chart}> */}
          <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
          <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
          <XAxis
            // tickValues={this.props.reportDate}
            // tickValues={[0, 1, 2, 3]}
            // tickFormat={d => this.props.reportDate[d]}
            tickLabelAngle={-30}
            // tickTotal={14}
            title="14 Days Prediction"
            style={{
              line: { stroke: "#ADDDE1" },
              ticks: { stroke: "#ADDDE1" },
              text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
            }}
          />
          <YAxis title="Volume %" />
          <LineSeries
            className="first-series"
            data={this.props.chartData1}
            animation={{
              damping: 9,
              stiffness: 300
            }}
            style={{
              strokeLinejoin: "round",
              strokeWidth: 3
            }}
           
          />
          <LineSeries
            className="third-series"
            curve={"curveMonotoneX"}
            data={this.props.chartData2}
            strokeDasharray="7, 3"
            animation={{
              damping: 9,
              stiffness: 300
            }}
            
          />
          <LineSeries
            className="fourth-series"
            curve={curveCatmullRom.alpha(0.7)}
            data={this.props.chartData3}
            animation={{
              damping: 9,
              stiffness: 300
            }}
            strokeWidth="3"
            onNearestXY={(value, { index }) =>
              this.setState({
                selectedPointId: index,
                crosshairValues: [value]
                
              })
            }
          />

          {crosshairValues && <Crosshair values={crosshairValues} />}
        </XYPlot>
        {/* </FlexibleXYPlot> */}
        <div className="report-legends">
          <DiscreteColorLegend items={ITEMS} />
        </div>
      </div>
    );
  }
}
