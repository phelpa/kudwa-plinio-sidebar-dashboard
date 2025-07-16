export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const getChangeColor = (value: number): string => {
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600";
  return "text-gray-500";
};

export const formatCompactNumber = (value: number): string => {
  if (Math.abs(value) >= 1e9) {
    return (value / 1e9).toFixed(1) + "B";
  }
  if (Math.abs(value) >= 1e6) {
    return (value / 1e6).toFixed(1) + "M";
  }
  if (Math.abs(value) >= 1e3) {
    return (value / 1e3).toFixed(1) + "K";
  }
  return value.toString();
};
