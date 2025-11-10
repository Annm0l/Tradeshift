import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axiosConfig";
import StockSearchDashboard from "../components/StockSearchDashboard";
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

      {/* ✅ Background supports light & dark mode */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-black transition-all duration-500 p-6 pb-32 text-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8">
          Dashboard
        </h1>

        {/* 🧭 Stock Search Section */}
        <div className="max-w-2xl mx-auto mb-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center mb-4">
            Search Stocks
          </h2>
          <StockSearchDashboard />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
            <h3 className="text-gray-500 dark:text-gray-400">Total Invested</h3>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              ₹ {summary.totalInvested.toFixed(2)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
            <h3 className="text-gray-500 dark:text-gray-400">Profit / Gain</h3>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
              ₹ {summary.totalProfit.toFixed(2)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center">
            <h3 className="text-gray-500 dark:text-gray-400">Total Assets</h3>
            <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
              {summary.assetCount}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center mb-3">
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center mb-3">
              Asset Values
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pieData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Market Data Widget */}
        <div className="max-w-3xl mx-auto mb-10">
          <MarketDataWidget />
        </div>

        {/* 🔥 Action Buttons */}
        <div className="text-center flex flex-col sm:flex-row justify-center gap-4 mt-8 fixed bottom-6 left-0 right-0 z-50">
          <button
            onClick={() => navigate("/assets/add")}
            className="bg-blue-600 dark:bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 shadow-md transition"
          >
            + Add New Asset
          </button>

          <button
            onClick={() => navigate("/trade")}
            className="bg-green-600 dark:bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 shadow-md transition"
          >
            💹 Buy / Sell Stocks
          </button>

          <button
            onClick={() => navigate("/trades")}
            className="bg-gray-600 dark:bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 shadow-md transition"
          >
            📜 View Trade History
          </button>
        </div>
      </div>
    </>
  );
}
