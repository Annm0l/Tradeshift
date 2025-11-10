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
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-500">
      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 text-center">
        Live Market Data
      </h3>

      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="p-2">Symbol</th>
            <th className="p-2">Price (₹)</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.symbol}
                className="text-center border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-2 font-medium text-gray-800 dark:text-gray-100">
                  {item.symbol}
                </td>
                <td
                  className={`p-2 font-semibold ${
                    item.price > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.price}
                </td>
                <td className="p-2 text-gray-600 dark:text-gray-400">
                  {item.time.split(" ")[3]}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center text-gray-500 dark:text-gray-400 py-3"
              >
                Loading live data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
