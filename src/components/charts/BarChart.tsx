import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartData } from "../../types/dashboard";
import { formatCurrency, formatCompactNumber } from "../../utils/formatters";

interface BarChartComponentProps {
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

const colors = ["#698AC5", "#B09280", "#EAE62F", "#262626"];

const BarChartComponent: React.FC<BarChartComponentProps> = ({
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
        <div className="bg-white p-3 border border-light-brown rounded-lg shadow-lg">
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
    <div className="bg-white rounded-lg shadow-sm border border-light-brown p-6">
      <h3 className="text-lg font-semibold text-dark-gray mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
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
          {data.map((series, index) => (
            <Bar
              key={series.name}
              dataKey={series.name}
              fill={colors[index % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
