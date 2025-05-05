"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const formatPrice = (price) => {
  return price.toLocaleString("en-CA");
};

export default function MarketComparisonChart({ currentPrice, comparisons }) {
  // Prepare data including the current property
  const data = [
    {
      name: "This Property",
      description: "Current listing price",
      price: currentPrice,
    },
    ...comparisons,
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-lg font-bold text-emerald-600">
            ${formatPrice(payload[0].value)}
          </p>
          <p className="text-sm text-gray-600">
            {payload[0].payload.description}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 100,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            tickMargin={30}
            tick={{
              fill: "#4B5563",
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <YAxis
            tickFormatter={(value) => `$${formatPrice(value)}`}
            width={90}
            tick={{
              fill: "#4B5563",
              fontSize: 12,
            }}
            tickMargin={10}
            axisLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <ReferenceLine
            y={currentPrice}
            stroke="#10B981"
            strokeDasharray="3 3"
            label={{
              value: "Current Price",
              position: "right",
              fill: "#10B981",
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
