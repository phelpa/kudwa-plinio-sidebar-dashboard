import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartData } from "../../types/dashboard";
import { formatCurrency, formatCompactNumber } from "../../utils/formatters";

interface ComposedChartComponentProps {
  data: ChartData[];
  dateArray: string[];
  title: string;
}

interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const colors = ["#dc2626", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];

const ComposedChartComponent: React.FC<ComposedChartComponentProps> = ({
  data,
  dateArray,
  title,
}) => {
  const chartData = dateArray.map((date, index) => {
    const dataPoint: ChartDataPoint = { name: date };
    data.forEach((series) => {
      if (Array.isArray(series.values)) {
        dataPoint[series.name] = series.values[index] || 0;
      }
    });
    return dataPoint;
  });

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-dark-gray">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-dark-gray mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            stroke="#9ca3af"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            stroke="#9ca3af"
            tickFormatter={(value) => formatCompactNumber(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {data.map((series, index) => {
            if (series.chartType === "line") {
              return (
                <Line
                  key={series.name}
                  type="monotone"
                  dataKey={series.name}
                  stroke={colors[index % colors.length]}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              );
            } else {
              return (
                <Bar
                  key={series.name}
                  dataKey={series.name}
                  fill={colors[index % colors.length]}
                  stackId="a"
                />
              );
            }
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComposedChartComponent;
