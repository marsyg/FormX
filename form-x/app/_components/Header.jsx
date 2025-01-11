"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]); // Add `path` as a dependency

  // Early return if "Form" is in the path
  if (path.includes("Form")) {
    return null;
  }

  return (
    <header className="w-full p-6 flex border shadow-sm">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <Image src="/logo.svg" width={100} height={100} alt="App Logo" />

        {/* User Actions */}
        {isSignedIn ? (
          <div className="flex items-center gap-5">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
      </div>
    </header>
  );
};

export default Header;
