import React from "react";
import Navbar from "@/components/navbar";

export default function layout({ children, ...props }) {
  return (
    <div className="space-y-4">
      <Navbar className="px-6 py-4" />
      <div className="px-6 py-4 ">{children}</div>
    </div>
  );
}
