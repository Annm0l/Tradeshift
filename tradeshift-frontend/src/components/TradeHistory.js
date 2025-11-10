import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "./Navbar";
import FloatingBackButton from "../components/FloatingBackButton";

export default function TradeHistory() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all trades from backend
  const fetchHistory = async () => {
    try {
      const res = await api.get("/trades");
      setTrades(res.data);
    } catch (err) {
      console.error("Error fetching trade history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-50 dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-all duration-500 relative">
        {/* ✅ Floating Back Button */}
        <FloatingBackButton to="/app" label="Back to Dashboard" />

        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
          📊 Trade History
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 max-w-5xl mx-auto border border-gray-200 dark:border-gray-700 transition-all">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading trades...
            </p>
          ) : trades.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No trades executed yet.
            </p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead className="bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-gray-200">
                <tr>
                  <th className="p-2 text-left">Symbol</th>
                  <th className="p-2 text-center">Side</th>
                  <th className="p-2 text-center">Quantity</th>
                  <th className="p-2 text-center">Price</th>
                  <th className="p-2 text-center">Total</th>
                  <th className="p-2 text-center">Date / Time</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((t, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-center"
                  >
                    <td className="p-2 font-medium text-gray-800 dark:text-gray-200">
                      {t.symbol}
                    </td>
                    <td
                      className={`p-2 font-bold ${
                        t.side === "BUY"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {t.side}
                    </td>
                    <td className="p-2">{t.quantity}</td>
                    <td className="p-2">₹{t.price}</td>
                    <td className="p-2 font-medium text-gray-700 dark:text-gray-300">
                      ₹{(t.quantity * t.price).toFixed(2)}
                    </td>
                    <td className="p-2 text-gray-600 dark:text-gray-400">
                      {new Date(t.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
