"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building,
  Utensils,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";

import FlowingMenu from './FlowingMenu';

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard/resident" },
  { name: "Book Room", icon: Building, path: "/dashboard/resident/room" },
  { name: "Payments", icon: CreditCard, path: "/dashboard/resident/payments" },
  { name: "Complaints", icon: FileText, path: "/dashboard/resident/complaints" },
  { name: "Mess Menu", icon: Utensils, path: "/dashboard/resident/mess" },
  { name: "Contact Us", icon: Phone, path: "/dashboard/resident/contact-us" },
];

interface Booking {
  roomNumber: string;
  roomType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function ResidentSidebar({ booking }: { booking?: Booking }) {
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

  const filteredNavItems = navItems.filter(
    (item) => item.name !== "Book Room" || !booking
  );

  const demoItems = filteredNavItems.map((item, index) => ({
    link: item.path,
    text: item.name,
    image: `https://picsum.photos/600/400?random=${index + 5}`
  }));

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
              <h1 className="text-xl font-bold text-text-primary">
                MADHAN HOSTEL
              </h1>
            </div>
            <div style={{ height: 'calc(100vh - 150px)', position: 'relative' }}>
              <FlowingMenu items={demoItems} />
            </div>
          </div>

          <div className="p-4">
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
