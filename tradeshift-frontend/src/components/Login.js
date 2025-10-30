import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tab, setTab] = useState("email"); // "email" or "mobile"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  // EMAIL LOGIN
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.token) {
        login(res.data.token);
        navigate("/app");
      }
    } catch {
      setMsg("Invalid email or password");
    }
  };

  //  MOBILE OTP FLOW
  const sendOtp = async () => {
    try {
      await api.post("/mobile/send-otp", { phone });
      setMsg("OTP sent successfully!");
    } catch {
      setMsg("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await api.post("/mobile/verify-otp", { phone, otp });
      if (res.data.token) {
        login(res.data.token);
        navigate("/app");
      }
    } catch {
      setMsg("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="TradeShift" className="h-12 drop-shadow-md" />
        </div>

        {/*  Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setTab("email")}
            className={`w-1/2 py-2 font-semibold ${
              tab === "email"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-400"
            }`}
          >
            Email Login
          </button>
          <button
            onClick={() => setTab("mobile")}
            className={`w-1/2 py-2 font-semibold ${
              tab === "mobile"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-400"
            }`}
          >
            Mobile OTP
          </button>
        </div>

        {/* Email Login */}
        {tab === "email" && (
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="border p-2 rounded-lg"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="border p-2 rounded-lg"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        )}

        {/*  Mobile OTP Login */}
        {tab === "mobile" && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter mobile number"
              className="border p-2 rounded-lg"
            />

            <div className="flex gap-2">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="border p-2 rounded-lg flex-1"
              />
              <button
                onClick={sendOtp}
                className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Send OTP
              </button>
            </div>

            <button
              onClick={verifyOtp}
              className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify & Login
            </button>
          </div>
        )}

        {/*  Message */}
        {msg && <p className="text-center text-gray-600 mt-4">{msg}</p>}

        {/*  Register Link */}
        <div className="my-6 border-t"></div>
        <p className="text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
