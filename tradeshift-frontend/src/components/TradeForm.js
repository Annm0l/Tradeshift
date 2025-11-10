import React, { useState } from "react";
import api from "../api/axiosConfig";
import FloatingBackButton from "../components/FloatingBackButton";

export default function TradeForm({ onTrade }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [side, setSide] = useState("BUY");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const total = quantity && price ? (quantity * price).toFixed(2) : 0;

  const openConfirm = (type) => {
    setSide(type);
    setConfirmVisible(true);
  };

  const executeTrade = async () => {
    setLoading(true);
    setMessage("");
    setConfirmVisible(false);

    try {
      const res = await api.post("/trades", {
        symbol: symbol.toUpperCase(),
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        side,
      });

      setMessage(`✅ ${side} Successful: ${res.data.symbol} | ₹${total}`);
      setSymbol("");
      setQuantity("");
      setPrice("");
      if (onTrade) onTrade();
    } catch (err) {
      console.error("Trade Error:", err);
      setMessage("❌ Trade failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-black flex justify-center items-center relative text-gray-900 dark:text-gray-100 transition-all duration-500">
      {/* ✅ Floating Back Button */}
      <FloatingBackButton to="/app" label="Back to Dashboard" />

      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h1 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          💹 Buy / Sell Stocks
        </h1>

        {/* Stock Form */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Stock Symbol (e.g. TCS)"
            className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per unit"
              className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Total */}
          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg flex justify-between items-center border dark:border-gray-700 transition">
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              Total:
            </span>
            <span className="text-blue-700 dark:text-blue-400 font-bold text-lg">
              ₹ {total}
            </span>
          </div>

          {/* Buy / Sell Buttons */}
          <div className="flex gap-4 justify-center mt-4">
            <button
              type="button"
              onClick={() => openConfirm("BUY")}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md w-full transition transform hover:scale-105"
            >
              {loading && side === "BUY" ? "Processing..." : "🟢 BUY"}
            </button>

            <button
              type="button"
              onClick={() => openConfirm("SELL")}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md w-full transition transform hover:scale-105"
            >
              {loading && side === "SELL" ? "Processing..." : "🔴 SELL"}
            </button>
          </div>
        </div>

        {/* Success / Error Message */}
        {message && (
          <p
            className={`mt-6 text-center font-medium ${
              message.startsWith("✅")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* 🧩 Confirmation Popup */}
      {confirmVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full text-center animate-fadeIn transition-all">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Confirm Trade
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to{" "}
              <span
                className={`font-bold ${
                  side === "BUY"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {side}
              </span>{" "}
              <span className="font-semibold">{quantity}</span> shares of{" "}
              <span className="font-semibold">{symbol.toUpperCase()}</span> at ₹
              {price} each? <br />
              Total:{" "}
              <span className="text-blue-700 dark:text-blue-400 font-bold">
                ₹ {total}
              </span>
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={executeTrade}
                className={`${
                  side === "BUY"
                    ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                    : "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                } text-white px-5 py-2 rounded-md font-medium transition`}
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmVisible(false)}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-md font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
