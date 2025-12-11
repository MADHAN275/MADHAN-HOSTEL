"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React, { useRef } from "react";

interface DashboardCardProps {
  name: string;
  icon: LucideIcon;
  onClick: () => void;
  index: number;
}

export default function DashboardCard({ name, icon: Icon, onClick, index }: DashboardCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center, normalized to [-0.5, 0.5]
    const xPct = (event.clientX - centerX) / width;
    const yPct = (event.clientY - centerY) / height;
    
    x.set(xPct);
    y.set(yPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  
  const gradientX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const gradientY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  
  const background = useMotionTemplate`radial-gradient(400px circle at ${gradientX} ${gradientY}, rgba(255,255,255,0.15), transparent 40%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        perspective: 1000,
      }}
      onClick={onClick}
      className="cursor-pointer group h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-accent-blue/20"
      >
        {/* Spotlight Overlay */}
        <motion.div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
                background
            }}
        />

        <div className="flex flex-col items-center text-center relative z-10 h-full justify-center" style={{ transform: "translateZ(30px)" }}>
          <div className="mb-6 p-4 rounded-full bg-white/5 ring-1 ring-white/10 group-hover:bg-accent-blue/20 group-hover:ring-accent-blue/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            <Icon className="w-10 h-10 text-white/80 group-hover:text-accent-blue group-hover:scale-110 transition-all duration-300" />
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-white/100 transition-colors">{name}</h2>
          <p className="text-sm text-gray-400 mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-medium">
             Open {name}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
