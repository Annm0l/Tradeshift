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

          {/* Protected routes */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/otp-login" element={<OtpLogin />} />


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

          {/* 🟢 Trade History route */}
          <Route
            path="/trades"
            element={
              <ProtectedRoute>
                <TradeHistory />
              </ProtectedRoute>
            }
          />
          <Route
           path="/trades"
           element={
              <ProtectedRoute>
              <TradeForm />
                <TradeHistory />
                </ProtectedRoute> }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
