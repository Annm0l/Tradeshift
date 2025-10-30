import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function MarketDataWidget() {
  const [data, setData] = useState([]);

  const fetchMarketData = async () => {
    try {
      const res = await api.get("/marketdata");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching market data:", err);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000); // auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-blue-600 mb-3 text-center">
        Live Market Data
      </h3>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th>Symbol</th>
            <th>Price (₹)</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.symbol} className="text-center border-t">
              <td>{item.symbol}</td>
              <td>{item.price}</td>
              <td>{item.time.split(" ")[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
