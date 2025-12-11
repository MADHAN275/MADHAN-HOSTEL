"use client";

import AdminSidebar from "@/components/AdminSidebar";
import TopBar from "@/components/TopBar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/SpotlightCard";

interface Complaint {
  _id: string;
  resident: { name: string };
  room: { roomNumber: string };
  createdAt: string;
  description: string;
  status: string;
}

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/get-complaints");
      if (response.ok) {
        const data = await response.json();
        setComplaints(data.complaints);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleResolveComplaint = async (id: string) => {
    try {
      const response = await fetch(`/api/resolve-complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        fetchComplaints();
      }
    } catch (error) {
      console.error("Error resolving complaint:", error);
    }
  };

  return (
    <div className="flex h-screen bg-background-dark text-text-primary">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title="All Complaints" userName="MADHAN" role="Administrator" />
        <main className="flex-1 overflow-y-auto p-8">
          {isLoading ? (
            <div className="text-center text-text-secondary animate-pulse">
              Loading complaints...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complaints.map((complaint) => (
                <SpotlightCard
                  key={complaint._id}
                  className="rounded-xl p-6 border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm"
                  spotlightColor="rgba(255, 255, 255, 0.15)"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {complaint.resident.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Room {complaint.room.roomNumber}
                      </p>
                    </div>
                    <span className="text-xs text-text-muted bg-white/10 px-2 py-1 rounded">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-text-primary mb-6 min-h-[3rem]">
                    {complaint.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        complaint.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-green-500/20 text-green-400 border border-green-500/30"
                      }`}
                    >
                      {complaint.status}
                    </span>
                    {complaint.status === "pending" && (
                      <Button
                        onClick={() => handleResolveComplaint(complaint._id)}
                        variant="secondary"
                        size="sm"
                        className="hover:bg-primary hover:text-white transition-colors"
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
