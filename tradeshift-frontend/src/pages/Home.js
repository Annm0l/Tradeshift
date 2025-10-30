import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Tradeshift Portfolio</h1>
      <p className="lead mt-3">Manage your financial assets easily.</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
        <Link to="/register" className="btn btn-success mx-2">Register</Link>
      </div>
    </div>
  );
}
