import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    // ✅ Load from localStorage on first render
    return localStorage.getItem("darkMode") === "true";
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isDashboard =
    location.pathname === "/app" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/";

  // 🌓 Apply dark mode to document & save in localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md flex-wrap gap-3 transition-all">
      {/* ✅ Logo + App Name */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/app")}
      >
        <img src="/logo.png" alt="TradeShift Logo" className="h-8 w-8" />
        <h1 className="font-semibold text-xl tracking-wide">TradeShift</h1>
      </div>

      {/* ✅ Navigation Links + Actions */}
      <div className="flex items-center gap-5 text-sm md:text-base font-medium">
        <Link to="/app" className="hover:text-gray-200">
          Dashboard
        </Link>
        <Link to="/assets" className="hover:text-gray-200">
          Assets
        </Link>
        <Link to="/trade" className="hover:text-gray-200">
          Buy / Sell
        </Link>
        <Link to="/trades" className="hover:text-gray-200">
          History
        </Link>

        {/* 🌓 Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded-md transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
