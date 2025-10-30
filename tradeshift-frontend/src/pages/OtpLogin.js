import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function OtpLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState("send"); // "send" or "verify"
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //  Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await api.post("/mobile/send-otp", { phone });
      setMessage("OTP sent successfully. Please check your SMS.");
      setStep("verify");
    } catch (err) {
      setMessage("Failed to send OTP. Check number or try again.");
    } finally {
      setLoading(false);
    }
  };

  //  Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await api.post("/mobile/verify-otp", { phone, otp });
      if (res.data.token) {
        login(res.data.token);
        setMessage("✅ Login successful!");
        navigate("/app");
      } else {
        setMessage("❌ Invalid response from server.");
      }
    } catch (err) {
      setMessage("❌ Invalid OTP or expired. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="TradeShift" className="h-12" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Login with OTP
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Secure login via your mobile number
        </p>

        {step === "send" ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your 10-digit mobile number"
              required
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-green-600 to-green-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>
        )}

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
