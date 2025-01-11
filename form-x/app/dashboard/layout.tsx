"use client";
import { SignedIn } from "@clerk/nextjs";

import React from "react";
import { ReactNode } from "react";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SignedIn>
      <div className="flex">{children}</div>
    </SignedIn>
  );
}

export default DashboardLayout;
