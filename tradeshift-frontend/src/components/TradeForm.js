import React, { useState } from "react";
import api from "../api/axiosConfig";

export default function TradeForm({ onTrade }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [side, setSide] = useState("BUY");
  const [message, setMessage] = useState("");

  const handleTrade = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/trades/execute", {
        symbol,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        side,
      });
      setMessage(`Trade executed successfully: ${res.data.symbol} (${side})`);
      setSymbol("");
      setQuantity("");
      setPrice("");
      if (onTrade) onTrade();
    } catch (err) {
      console.error("Trade error:", err);
      setMessage("Failed to execute trade. Try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto mb-8">
      <h2 className="text-lg font-semibold text-blue-600 mb-4 text-center">
        Execute Trade
      </h2>
      <form onSubmit={handleTrade} className="flex flex-col gap-3">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Symbol (e.g. TCS)"
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          className="border p-2 rounded-lg"
        />
        <select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Execute
        </button>
      </form>
      {message && (
        <p className="text-center text-green-600 mt-3 font-medium">{message}</p>
      )}
    </div>
  );
}
