import React from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingBackButton({ to = "/app", label = "Back to Dashboard" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="fixed bottom-6 left-6 z-50 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200"
    >
      <span>⬅️</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
