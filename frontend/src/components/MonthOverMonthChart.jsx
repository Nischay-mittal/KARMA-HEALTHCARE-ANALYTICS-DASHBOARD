
import { useEffect, useState } from "react";
import { getJSON } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Label,
  ResponsiveContainer
} from "recharts";

export default function MonthOverMonthChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getJSON("/api/month-over-month?months=6")
      .then(setData)
      .catch(() => setData([]));
  }, []);

  return (
    <>
      <h3>Month-over-Month Revenue & Growth %</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month">
            <Label value="Month" position="insideBottomRight" offset={-4} />
          </XAxis>

          {/* Left axis – revenue (no label, avoids overlap) */}
          <YAxis yAxisId="left" />

          {/* Right axis – growth %, no label, ticks show % */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => `${v}%`}
          />

          <Tooltip
            formatter={(value, name) =>
              name === "mom_growth_pct"
                ? `${value}%`
                : `₹${Number(value).toLocaleString()}`
            }
          />
          <Legend />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            dot={{ r: 3 }}
            name="Revenue"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="mom_growth_pct"
            stroke="#22c55e"
            dot={{ r: 3 }}
            name="Growth %"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}