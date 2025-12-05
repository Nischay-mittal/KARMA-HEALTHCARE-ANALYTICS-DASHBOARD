
import { useEffect, useState } from "react";
import { getJSON } from "../api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Label,
  ResponsiveContainer
} from "recharts";

export default function MonthlyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getJSON("/api/sales-by-month?months=6")
      .then(setData)
      .catch(() => setData([]));
  }, []);

  return (
    <>
      <h3>Total Revenue per Month (Last 6 Months)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month">
            <Label value="Month" position="insideBottomRight" offset={-4} />
          </XAxis>
          {/* no Y-axis label to avoid overlap */}
          <YAxis />
          <Tooltip
            formatter={(value) => `₹${Number(value).toLocaleString()}`}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.25}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}