import React , {useState,useEffect} from "react";
import {getJSON} from "../api";
export default function BestProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getJSON("/api/best-products")
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return (
    <>
      <h3>Best-Selling Product in Each Category</h3>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Product</th>
              <th>Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={idx}>
                <td>{p.category}</td>
                <td>{p.name}</td>
                <td>{Number(p.revenue).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}