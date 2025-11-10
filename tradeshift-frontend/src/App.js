import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import AssetList from "./components/AssetList";
import AddAssets from "./components/AddAssets";
import TradeForm from "./components/TradeForm";
import TradeHistory from "./components/TradeHistory";
import OtpLogin from "./pages/OtpLogin";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp-login" element={<OtpLogin />} />

          {/* Protected routes */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assets"
            element={
              <ProtectedRoute>
                <AssetList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assets/add"
            element={
              <ProtectedRoute>
                <AddAssets />
              </ProtectedRoute>
            }
          />

          {/* ✅ Trade routes */}
          <Route
            path="/trade"
            element={
              <ProtectedRoute>
                <TradeForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trades"
            element={
              <ProtectedRoute>
                <TradeHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
