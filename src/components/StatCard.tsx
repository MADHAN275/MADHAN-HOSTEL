"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  color: string;
}

export default function StatCard({ icon: Icon, label, value, trend, color }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 flex items-center space-x-4"
    >
      <div className="p-3 rounded-lg" style={{ backgroundColor: color }}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-text-muted">{label}</p>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
      </div>
      <p className="text-sm text-accent-green">{trend}</p>
    </motion.div>
  );
}
