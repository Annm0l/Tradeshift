import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

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
    await api.delete(`/assets/${id}`);
    fetchAssets();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold text-blue-600">Your Assets</h2>
        <button
          onClick={() => navigate("/assets/add")}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
        >
          + Add Asset
        </button>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th>Type</th>
            <th>Value</th>
            <th>Currency</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a) => (
            <tr key={a.id} className="text-center border-t">
              <td className="p-2">{a.name}</td>
              <td>{a.type}</td>
              <td>{a.value}</td>
              <td>{a.currency}</td>
              <td>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
