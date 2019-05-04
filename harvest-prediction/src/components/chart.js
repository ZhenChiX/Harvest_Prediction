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
  Voronoi
} from "react-vis";
import { autobind } from "@uifabric/utilities";
const data2 = [
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 }
];

const DATA = [
  { x: 1, y: 4, size: 2 },
  { x: 1, y: 5, size: 18 },
  { x: 1, y: 10, size: 5 },
  { x: 1, y: 11, size: 29 },
  { x: 1, y: 13.9, size: 5 },
  { x: 1, y: 14, size: 20 },
  { x: 1.5, y: 11.8, size: 25 },
  { x: 1.7, y: 9, size: 30 },
  { x: 2, y: 5, size: 11 },
  { x: 2.1, y: 11.8, size: 28 },
  { x: 2.4, y: 7.9, size: 14 },
  { x: 2.4, y: 13.5, size: 20 },
  { x: 2.7, y: 13.7, size: 14 },
  { x: 2.9, y: 7.7, size: 26 },
  { x: 3, y: 5.4, size: 6 }
].map((d, id) => ({ ...d, id }));

const getDomain = (data, key) => {
  const { min, max } = data.reduce(
    (acc, row) => ({
      min: Math.min(acc.min, row[key]),
      max: Math.max(acc.max, row[key])
    }),
    { min: Infinity, max: -Infinity }
  );
  return [min, max];
};

// magic numbers chosen for design
const sizeRange = [5, 13];
const margin = { top: 10, left: 40, bottom: 40, right: 10 };
const width = 600;
const height = 600;

// Intentionally using explicit sales here to show another way of using the voronoi
const x = scaleLinear()
  .domain(getDomain(DATA, "x"))
  .range([0, width]);
const y = scaleLinear()
  .domain(getDomain(DATA, "y"))
  .range([height, 0]);
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default class LabeledHeatmap extends Component {
  state = {
    value: null,
    height: 0,
    width: 0,
    selectedPointId: null,
    showVoronoi: true
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
    const { crosshairValues, selectedPointId, showVoronoi } = this.state;
    const exampleColorScale = scaleLinear();
    //   .domain([min, (min + max) / 2, max])
    //   .range(["orange", "white", "cyan"]);

    // const ratio = 0.5;
    // console.log(this.props.serverData);
    return (
      <div className="report-heatmap">
        {/* <label style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={showVoronoi}
            onChange={() => this.setState({ showVoronoi: !showVoronoi })}
          />
          Show Voronoi
        </label>
        <FlexibleXYPlot
          onMouseLeave={() =>
            this.setState({ selectedPointId: null, crosshairValues: null })
          }
          width={width}
          height={width}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries
            className="mark-series-example"
            colorType="literal"
            data={DATA}
            onNearestXY={(value, { index }) =>
              this.setState({
                selectedPointId: index,
                crosshairValues: [value]
              })
            }
            getColor={({ id }) =>
              selectedPointId === id ? "#FF6633" : "#0099FF"
            }
            sizeRange={sizeRange}
          />
          {crosshairValues && <Crosshair values={crosshairValues} />}
          {showVoronoi && (
            <Voronoi
              extent={[
                [margin.left, margin.top],
                [width - margin.right, height - margin.bottom]
              ]}
              nodes={DATA}
              polygonStyle={{ stroke: "rgba(0, 0, 0, .2)" }}
              x={d => x(d.x)}
              y={d => y(d.y)}
            />
          )}
        </FlexibleXYPlot> */}
        {/* ANOTHER CHART */}
        <XYPlot width={width} height={width}>
          <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
          <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
          <XAxis
            title="14 Days Prediction"
            style={{
              line: { stroke: "#ADDDE1" },
              ticks: { stroke: "#ADDDE1" },
              text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
            }}
          />
          <YAxis title="Volume" />
          <LineSeries
            className="first-series"
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 5 },
              { x: 3, y: 3 },
              { x: 4, y: 12 },
              { x: 5, y: 12 },
              { x: 6, y: 12 },
              { x: 7, y: 12 },
              { x: 8, y: 12 },
              { x: 9, y: 52 },
              { x: 10, y: 14 },
              { x: 12, y: 112 },
              { x: 13, y: 132 },
              { x: 14, y: 132 }
            ]}
            style={{
              strokeLinejoin: "round",
              strokeWidth: 4
            }}
            // onNearestXY={(value, { index }) =>
            //   this.setState({
            //     selectedPointId: index,
            //     crosshairValues: [value]
            //   })
            // }
          />
          <LineSeries className="second-series" data={null} />
          <LineSeries
            className="third-series"
            curve={"curveMonotoneX"}
            data={[
              { x: 1, y: 10 },
              { x: 2, y: 4 },
              { x: 3, y: 2 },
              { x: 4, y: 15 }
            ]}
            strokeDasharray="7, 3"
          />
          <LineSeries
            className="fourth-series"
            curve={curveCatmullRom.alpha(0.5)}
            data={[
              { x: 1, y: 7 },
              { x: 2, y: 11 },
              { x: 3, y: 9 },
              { x: 4, y: 2 }
            ]}
          />
          {crosshairValues && <Crosshair values={crosshairValues} />}
        </XYPlot>
      </div>
    );
  }
}
