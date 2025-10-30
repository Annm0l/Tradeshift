import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile"); // adjust to your backend endpoint
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <div className="card p-3 mt-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
      </div>
      <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
    </div>
  );
}
