import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AddAssets() {
  const navigate = useNavigate();


  const assetSuggestions = ["TCS", "Infosys", "Reliance", "HDFC", "Bitcoin", "Ethereum"];
  const typeSuggestions = ["Stock", "Crypto", "Mutual Fund", "Bond"];

  const [asset, setAsset] = useState({
    name: "",
    type: "",
    value: "",
    currency: "INR",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setAsset({ ...asset, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/assets", asset);
      setMsg(" Asset added successfully!");
      setTimeout(() => navigate("/assets"), 1000);
    } catch (err) {
      console.error("Error adding asset:", err);
      setMsg("Failed to add asset. Check backend.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Add Asset
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name field with suggestions */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Asset Name</label>
            <input
              list="assetOptions"
              name="name"
              placeholder="e.g. TCS, Bitcoin..."
              value={asset.name}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            <datalist id="assetOptions">
              {assetSuggestions.map((a, i) => (
                <option key={i} value={a} />
              ))}
            </datalist>
          </div>

          {/* Type field with suggestions */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Type</label>
            <input
              list="typeOptions"
              name="type"
              placeholder="Stock / Crypto / Bond"
              value={asset.type}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            <datalist id="typeOptions">
              {typeSuggestions.map((t, i) => (
                <option key={i} value={t} />
              ))}
            </datalist>
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Value (₹)</label>
            <input
              type="number"
              name="value"
              placeholder="Investment amount"
              value={asset.value}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Currency</label>
            <select
              name="currency"
              value={asset.currency}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
            >
              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Asset
          </button>
        </form>

        {msg && <p className="mt-3 text-center text-gray-600">{msg}</p>}
      </div>
    </div>
  );
}
