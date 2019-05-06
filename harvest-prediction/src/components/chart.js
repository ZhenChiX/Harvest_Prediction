import React, { PureComponent } from "react";
import {
  LineChart,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
  ResponsiveContainer
} from "recharts";

export default class Example extends PureComponent {
  render() {
    const { chartAll } = this.props;
    console.log(chartAll);
    return (
      <div style={{ width: "95%", height: 350, margin: "1em auto" }}>
        <ResponsiveContainer>
          <LineChart
            data={chartAll}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              angle={-30}
              label={{
                value: "14 Days Prediction",
                position: "insideBottom",
                offset: 40
              }}
            />
            <YAxis
              label={{
                value: "Volume",
                angle: -90,
                offset: -20,
                position: "left"
              }}
            />
            <Tooltip />
            <Line
              name="Volume %"
              type="monotone"
              dataKey="volume"
              stroke="#8884d8"
              animationDuration={300}
            />
            <Line
              name="Embryo %"
              type="monotone"
              dataKey="embryo"
              stroke="#82ca9d"
              animationDuration={300}
            />
            <Legend verticalAlign="top" />
            <Line
              name="Firmness %"
              type="monotone"
              dataKey="firmness"
              stroke="#ffc658"
              animationDuration={300}
            />
            <Brush height={15} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
