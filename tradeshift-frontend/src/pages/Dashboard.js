import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import MarketDataWidget from "../components/MarketDataWidget";

export default function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    totalInvested: 0,
    totalProfit: 0,
    assetCount: 0,
  });
  const [assets, setAssets] = useState([]);

  const fetchSummary = async () => {
    try {
      const res = await api.get("/assets");
      const list = res.data || [];

      setAssets(list);
      const totalInvested = list.reduce((sum, a) => sum + (a.value || 0), 0);
      const totalProfit = list.reduce(
        (sum, a) => sum + (a.value * 0.1 || 0),
        0
      );

      setSummary({
        totalInvested,
        totalProfit,
        assetCount: list.length,
      });
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const pieData = assets.map((a) => ({
    name: a.name,
    value: a.value,
  }));

  const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#3B82F6"];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-gray-500">Total Invested</h3>
            <p className="text-2xl font-semibold text-blue-600">
              ₹ {summary.totalInvested.toFixed(2)}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-gray-500">Profit / Gain</h3>
            <p className="text-2xl font-semibold text-green-600">
              ₹ {summary.totalProfit.toFixed(2)}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <h3 className="text-gray-500">Total Assets</h3>
            <p className="text-2xl font-semibold text-indigo-600">
              {summary.assetCount}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 text-center mb-3">
              Asset Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 text-center mb-3">
              Asset Values
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pieData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/*  Live Market Data Widget */}
        <div className="max-w-3xl mx-auto mb-10">
          <MarketDataWidget />
        </div>

        {/*  Asset Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/assets/add")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md"
          >
            + Add New Asset
          </button>
        </div>
      </div>
    </>
  );
}
