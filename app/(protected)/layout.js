import React from "react";
import Navbar from "@/components/Navbar";

export default function layout({ children }) {
  return (
    <div className="p-4 space-y-4">
      <Navbar />
      {children}
    </div>
  );
}
