import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo + App Name */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="TradeShift Logo" className="h-8 w-8" />
        <h1 className="font-semibold text-xl tracking-wide">TradeShift</h1>
      </div>

      {/*  Navigation Links */}
      <div className="flex gap-4 text-sm md:text-base">
        <Link to="/app" className="hover:text-gray-200">
          Dashboard
        </Link>
        <Link to="/assets" className="hover:text-gray-200">
          Assets
        </Link>
        <Link to="/trades" className="hover:text-gray-200">
          Trades
        </Link>
        <button onClick={handleLogout} className="hover:text-gray-200">
          Logout
        </button>
      </div>
    </nav>
  );
}
