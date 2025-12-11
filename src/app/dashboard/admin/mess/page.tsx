"use client";

import AdminSidebar from "@/components/AdminSidebar";
import TopBar from "@/components/TopBar";
import MessMenu from "@/components/MessMenu";

export default function AdminMessPage() {
  return (
    <div className="flex h-screen bg-background-dark text-text-primary">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <TopBar title="Mess Menu" userName="MADHAN" role="Administrator" />
        <main className="p-0">
          <MessMenu />
        </main>
      </div>
    </div>
  );
}
