"use client";

import { useRouter } from "next/navigation";
import DashboardCard from "@/components/DashboardCard";
import {
  LayoutDashboard,
  Users,
  Building,
  FileText,
  Utensils,
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import TopBar from "@/components/TopBar";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard/admin" },
  { name: "Residents", icon: Users, path: "/dashboard/admin/residents" },
  { name: "Rooms", icon: Building, path: "/dashboard/admin/rooms" },
  { name: "Complaints", icon: FileText, path: "/dashboard/admin/complaints" },
  { name: "Mess Menu", icon: Utensils, path: "/dashboard/admin/mess" },
];

export default function AdminDashboard() {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-primary-background text-text-primary overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar title="Admin Dashboard" userName="MADHAN" role="Administrator" />
        <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-secondary-background scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome Back, MADHAN!</h1>
            <p className="text-text-secondary mb-8">Here&apos;s what&apos;s happening in your hostel today.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {navItems.map((item, index) => (
                <DashboardCard
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  onClick={() => handleCardClick(item.path)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}