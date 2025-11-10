import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      if (res.status === 200) {
        setMessage("✅ Registered successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch {
      setError("⚠️ User already exists.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" placeholder="Full Name" value={form.name}
            onChange={handleChange} required className="border rounded-lg px-3 py-2" />
          <input name="email" type="email" placeholder="Email" value={form.email}
            onChange={handleChange} required className="border rounded-lg px-3 py-2" />
          <input name="password" type="password" placeholder="Password" value={form.password}
            onChange={handleChange} required className="border rounded-lg px-3 py-2" />
          <button type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Register
          </button>
        </form>
        {message && <p className="text-green-600 text-center mt-3">{message}</p>}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/" className="text-blue-500 underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
