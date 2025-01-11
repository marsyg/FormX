"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    !path.includes("Form") && (
      <div className="w-full p-6 border shadow-sm">
        <div className="flex items-center justify-between">
          <Image src={"/logo.svg"} width={50} height={50} alt="image" />
          {isSignedIn ? (
            <div className="flex items-center gap-5">
              <Link href={"/dashboard"}>
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
      </div>
    )
  );
};
export default Header;
