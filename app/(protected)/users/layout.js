import { Heading } from "@radix-ui/themes";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="space-y-2">
      <Heading>User</Heading>
      {children}
    </div>
  );
}
