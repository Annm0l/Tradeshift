import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import FloatingBackButton from "../components/FloatingBackButton";

export default function AssetList() {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  const fetchAssets = async () => {
    try {
      const res = await api.get("/assets");
      setAssets(res.data);
    } catch (err) {
      console.error("Error fetching assets:", err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/assets/${id}`);
      fetchAssets();
    } catch (err) {
      console.error("Error deleting asset:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-black p-6 relative text-gray-900 dark:text-gray-100 transition-all duration-500">
      {/* ✅ Floating Back Button (bottom-left corner) */}
      <FloatingBackButton to="/app" label="Back to Dashboard" />

      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Your Assets
        </h2>
        <button
          onClick={() => navigate("/assets/add")}
          className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
        >
          + Add Asset
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border dark:border-gray-700 transition-all">
        <table className="w-full border-collapse">
          <thead className="bg-blue-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="text-left">Type</th>
              <th className="text-left">Value</th>
              <th className="text-left">Currency</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map((a) => (
                <tr
                  key={a.id}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm transition-all"
                >
                  <td className="p-2">{a.name}</td>
                  <td>{a.type}</td>
                  <td>₹ {a.value}</td>
                  <td>{a.currency}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No assets found. Click “Add Asset” to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
