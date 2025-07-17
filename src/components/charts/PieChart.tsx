import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { ChartData } from "../../types/dashboard";
import { formatCurrency } from "../../utils/formatters";

interface PieChartComponentProps {
  data: ChartData[];
  title: string;
}

const colors = [
  "#698AC5",
  "#B09280",
  "#EAE62F",
  "#262626",
  "#FBFAFA",
  "#8B5A2B",
  "#A3B18A",
  "#588157",
  "#3A5A40",
  "#344E41",
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  title,
}) => {
  const chartData = data
    .filter((item) => typeof item.values === "number" && item.values !== 0)
    .map((item) => ({
      name: item.name,
      value: Math.abs(item.values as number),
    }));

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-light-brown rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-dark-gray">{data.name}</p>
          <p className="text-sm text-soft-blue">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-light-brown p-6">
      <h3 className="text-lg font-semibold text-dark-gray mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${((percent || 0) * 100).toFixed(0)}%`
            }
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
