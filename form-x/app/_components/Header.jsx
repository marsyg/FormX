"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  if (path.includes("Form")) {
    return null;
  }

  return (
    <header className="w-full p-6 flex border shadow-sm">
      <div className="flex w-full items-center justify-between">
        <motion.div
          initial={{ scale: 1.5, rotate: 0, opacity: 0 }}
          animate={{
            scale: [1.5, 0.5, 1],
            rotate: [0, 360, 0],
            opacity: [0, 1, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          className="relative mx-9 w-auto h-auto overflow-hidden"
        >
          <Image src="/logo.svg" width={100} height={100} alt="App Logo" />
        </motion.div>

        {isSignedIn ? (
          <div className="flex items-center gap-5">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignUpButton>
            <Button>Get Started</Button>
          </SignUpButton>
        )}
      </div>
    </header>
  );
};

export default Header;
