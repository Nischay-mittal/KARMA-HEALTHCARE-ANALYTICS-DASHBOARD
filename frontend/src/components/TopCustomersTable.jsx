import React , {useState,useEffect} from "react";
import {getJSON} from "../api";
export default function TopCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getJSON("/api/top-customers?limit=5")
      .then(setCustomers)
      .catch(() => setCustomers([]));
  }, []);

  return (
    <>
      <h3>Top 5 Customers by Total Spend</h3>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Orders</th>
              <th>Total Spend (₹)</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, idx) => (
              <tr key={idx}>
                <td>{c.name}</td>
                <td>{c.orders}</td>
                <td>{Number(c.total_spend).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}