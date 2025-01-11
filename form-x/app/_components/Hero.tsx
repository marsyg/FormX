"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    title: "Team Collaboration",
    description:
      "Work together seamlessly with real-time form editing and sharing capabilities. Perfect for teams of any size.",
    image: "/images/collab.jpeg",
    alt: "Team collaboration feature",
  },
  {
    title: "AI-Powered Form Generation",
    description:
      "Let our advanced AI create sophisticated forms instantly based on your requirements. Save hours of manual work.",
    image: "/images/authentication.jpeg",
    alt: "AI form generation feature",
  },
  {
    title: "Voice Input Support",
    description:
      "Enable voice commands and dictation for easier form filling. Make your forms more accessible and user-friendly.",
    image: "/images/voice.jpeg",
    alt: "Voice input feature",
  },
  {
    title: "Secure Authentication",
    description:
      "Protect your forms with enterprise-grade security. Multiple authentication methods to keep your data safe.",
    image: "/images/authentication.jpeg",
    alt: "Authentication feature",
  },
  {
    title: "Customizable Forms",
    description:
      "Design forms that match your brand. Customize every aspect from colors to layouts.",
    image: "/images/Format.jpeg",
    alt: "Customizable forms feature",
  },
  {
    title: "Smart Auto-Fill",
    description:
      "Save time with intelligent auto-fill suggestions. Our AI learns and adapts to user inputs.",
    image: "/images/Format.jpeg",
    alt: "Auto-fill feature",
  },
  {
    title: "Advanced Analytics",
    description:
      "Gain insights from comprehensive form analytics. Track submissions, completion rates, and user behavior.",
    image: "/images/Format.jpeg",
    alt: "Analytics feature",
  },
];

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!targetRef.current) return;
      const { clientX, clientY } = ev;
      targetRef.current.style.setProperty("--mouse-x", `${clientX}px`);
      targetRef.current.style.setProperty("--mouse-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      <motion.section
        ref={targetRef}
        style={{ opacity, scale }}
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-primary/20 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.06)_0%,transparent_80%)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 flex justify-center"
            >
              <Image
                src="/logo.svg"
                alt="FormX AI Logo"
                width={280}
                height={140}
                className="drop-shadow-2xl"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
            >
              Transform Ideas into{" "}
              <span className="relative">
                <span className="relative inline-block animate-text-shimmer bg-gradient-to-r from-purple-400 via-primary to-purple-400 ">
                  Intelligent Forms
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12 text-xl text-gray-300 sm:text-2xl"
            >
              Harness AI to create, customize, and deploy sophisticated forms in
              minutes. Experience the future of form building.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <a
                href="#features"
                className="group relative inline-flex items-center overflow-hidden rounded-lg bg-primary px-8 py-4 text-white transition-all duration-300 ease-out hover:bg-primary/90 focus:outline-none focus:ring active:bg-primary"
              >
                <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:-translate-x-4">
                  →
                </span>
                <span className="text-sm font-medium transition-all duration-300 group-hover:mr-4">
                  Get Started Free
                </span>
              </a>

              <a
                href="#demo"
                className="group relative inline-flex items-center overflow-hidden rounded-lg border border-current px-8 py-4 text-white transition-all duration-300 ease-out hover:text-primary focus:outline-none focus:ring"
              >
                <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:-translate-x-4">
                  →
                </span>
                <span className="text-sm font-medium transition-all duration-300 group-hover:mr-4">
                  Watch Demo
                </span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 flex items-center justify-center gap-8"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.2 + i * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="inline-block h-8 w-8 rounded-full border-2 border-white bg-gray-100"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-300">
                Trusted by <span className="font-semibold">2,000+</span> teams
                worldwide
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section id="features" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`mb-32 grid gap-8 items-center ${
                index % 2 === 0
                  ? "lg:grid-cols-[1fr_500px]"
                  : "lg:grid-cols-[500px_1fr]"
              }`}
            >
              <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
                >
                  Learn more →
                </a>
              </div>

              <motion.div
                className={`relative ${
                  index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={500}
                    height={375}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 mix-blend-multiply" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
