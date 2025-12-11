"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Building,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Utensils,
} from "lucide-react";
import { useRouter } from "next/navigation";

import FlowingMenu from './FlowingMenu';

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard/admin" },
  { name: "Residents", icon: Users, path: "/dashboard/admin/residents" },
  { name: "Rooms", icon: Building, path: "/dashboard/admin/rooms" },
  { name: "Complaints", icon: FileText, path: "/dashboard/admin/complaints" },
  { name: "Mess Menu", icon: Utensils, path: "/dashboard/admin/mess" },
];

const demoItems = navItems.map((item, index) => ({
  link: item.path,
  text: item.name,
  image: `https://picsum.photos/600/400?random=${index + 1}`
}));

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    router.push("/");
  };

  const handleClearAllocations = async () => {
    if (window.confirm("Are you sure you want to clear all room allocations? This action cannot be undone.")) {
      try {
        const response = await fetch('/api/clear-allocations', {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('All room allocations have been cleared.');
        } else {
          alert('Failed to clear room allocations. Please try again.');
        }
      } catch (error) {
        console.error('Error clearing room allocations:', error);
        alert('An error occurred while clearing room allocations.');
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-1/2 -translate-y-1/2 p-1 bg-accent-purple rounded-full text-white z-50 transition-all duration-300 ease-in-out ${
          isCollapsed ? "left-4" : "left-[15.5rem]"
        }`}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
      <motion.div
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed md:relative bg-white/5 backdrop-blur-lg border-r border-white/10 h-screen flex flex-col justify-between z-40 ${
          isCollapsed ? "w-0" : "w-64"
        }`}
      >
        <div className={`h-full flex flex-col justify-between overflow-hidden ${isCollapsed ? "invisible" : ""}`}>
          <div>
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-bold text-text-primary">MADHAN HOSTEL</h1>
            </div>
            <div style={{ height: 'calc(100vh - 200px)', position: 'relative' }}>
              <FlowingMenu items={demoItems} />
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={handleClearAllocations}
              className="flex items-center px-6 py-4 text-text-secondary hover:bg-red-500/50 hover:text-text-primary transition-colors w-full"
            >
              <Trash2 className="w-6 h-6" />
              <span className="ml-4">Clear Allocations</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-4 text-text-secondary hover:bg-white/10 hover:text-text-primary transition-colors w-full"
            >
              <LogOut className="w-6 h-6" />
              <span className="ml-4">Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
