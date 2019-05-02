import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
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
  LineSeries
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
const FlexibleXYPlot = makeWidthFlexible(XYPlot);
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const data = alphabet.reduce((acc, letter1, idx) => {
  return acc.concat(
    alphabet.map((letter2, jdx) => ({
      x: `${letter1}1`,
      y: `${letter2}2`,
      color: (idx + jdx) % Math.floor(jdx / idx) || idx
    }))
  );
}, []);
const { min, max } = data.reduce(
  (acc, row) => ({
    min: Math.min(acc.min, row.color),
    max: Math.max(acc.max, row.color)
  }),
  { min: Infinity, max: -Infinity }
);

export default class LabeledHeatmap extends Component {
  state = {
    value: false,
    height: 0,
    width: 0
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
    const exampleColorScale = scaleLinear()
      .domain([min, (min + max) / 2, max])
      .range(["orange", "white", "cyan"]);

    const ratio = 0.5;
    return (
      <div className="report-heatmap">
        <FlexibleXYPlot
          xType="ordinal"
          xDomain={alphabet.map(letter => `${letter}1`)}
          yType="ordinal"
          yDomain={alphabet.map(letter => `${letter}2`).reverse()}
          margin={50}
          height={this.state.height * ratio}
          width={700}
        >
          <XAxis orientation="top" />
          <YAxis />
          <HeatmapSeries
            colorType="literal"
            getColor={d => exampleColorScale(d.color)}
            style={{
              stroke: "white",
              strokeWidth: "2px",
              rectStyle: {
                rx: 10,
                ry: 10
              }
            }}
            className="heatmap-series-example"
            data={data}
            onValueMouseOver={v => this.setState({ value: v })}
            onSeriesMouseOut={v => this.setState({ value: false })}
          />
          <LabelSeries
            style={{ pointerEvents: "none" }}
            data={data}
            labelAnchorX="middle"
            labelAnchorY="baseline"
            getLabel={d => `${d.color}`}
          />
          {value !== false && <Hint value={value} />}
        </FlexibleXYPlot>
        <XYPlot
          xDomain={[40, 100]}
          yDomain={[1.5, 8]}
          width={300}
          getX={d => d.waiting}
          getY={d => d.eruptions}
          onMouseLeave={() => this.setState({ hoveredNode: null })}
          height={300}
        >
          <HexbinSeries
            animation
            className="hexbin-example"
            style={{
              stroke: "#125C77",
              strokeLinejoin: "round"
            }}
            onValueMouseOver={d => this.setState({ hoveredNode: d })}
            colorRange={["white", "black"]}
            radius={15}
            data={data2}
          />
        </XYPlot>

        <XYPlot height={300} width={300}>
          <VerticalGridLines
          />
          <HorizontalGridLines
          />
          <XAxis />
          <YAxis />
          <LineSeries
         
            data={data2}
          />
        </XYPlot>
      </div>
    );
  }
}
