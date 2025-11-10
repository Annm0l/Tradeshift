import React from "react";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="pt-16">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
