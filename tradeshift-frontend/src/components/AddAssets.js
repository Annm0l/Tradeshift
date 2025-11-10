import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import FloatingBackButton from "../components/FloatingBackButton";

export default function AddAssets() {
  const navigate = useNavigate();

  // ✅ Static predefined suggestions
  const assetSuggestions = ["TCS", "Infosys", "Reliance", "HDFC", "Bitcoin", "Ethereum"];
  const typeSuggestions = ["Stock", "Crypto", "Mutual Fund", "Bond"];

  const [asset, setAsset] = useState({
    name: "",
    type: "",
    value: "",
    currency: "INR",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setAsset({ ...asset, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/assets", asset);
      setMsg("✅ Asset added successfully!");
      setTimeout(() => navigate("/assets"), 1000);
    } catch (err) {
      console.error("Error adding asset:", err);
      setMsg("❌ Failed to add asset. Check backend.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-black transition-all duration-500 relative text-gray-900 dark:text-gray-100">
      {/* ✅ Floating Back Button */}
      <FloatingBackButton to="/app" label="Back to Dashboard" />

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md transition-all duration-300">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6 text-center">
          Add Asset
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name field with suggestions */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Asset Name
            </label>
            <input
              list="assetOptions"
              name="name"
              placeholder="e.g. TCS, Bitcoin..."
              value={asset.name}
              onChange={handleChange}
              required
              className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <datalist id="assetOptions">
              {assetSuggestions.map((a, i) => (
                <option key={i} value={a} />
              ))}
            </datalist>
          </div>

          {/* Type field with suggestions */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Type
            </label>
            <input
              list="typeOptions"
              name="type"
              placeholder="Stock / Crypto / Bond"
              value={asset.type}
              onChange={handleChange}
              required
              className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <datalist id="typeOptions">
              {typeSuggestions.map((t, i) => (
                <option key={i} value={t} />
              ))}
            </datalist>
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Value (₹)
            </label>
            <input
              type="number"
              name="value"
              placeholder="Investment amount"
              value={asset.value}
              onChange={handleChange}
              required
              className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Currency
            </label>
            <select
              name="currency"
              value={asset.currency}
              onChange={handleChange}
              className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
          >
            Add Asset
          </button>
        </form>

        {msg && (
          <p
            className={`mt-3 text-center font-medium ${
              msg.startsWith("✅")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
