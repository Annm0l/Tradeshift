import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "./Navbar";

export default function TradeHistory() {
  const [trades, setTrades] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/trades/history");
      setTrades(res.data);
    } catch (err) {
      console.error("Error fetching trade history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Trade History
        </h1>

        <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>Symbol</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Side</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t, i) => (
                <tr key={i} className="text-center border-t">
                  <td>{t.symbol}</td>
                  <td>{t.quantity}</td>
                  <td>₹{t.price}</td>
                  <td
                    className={`font-semibold ${
                      t.side === "BUY" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.side}
                  </td>
                  <td>{t.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {trades.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No trades executed yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
