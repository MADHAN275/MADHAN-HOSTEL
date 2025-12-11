"use client";

import TopBar from "@/components/TopBar";
import BookRoom from "@/components/BookRoom";
import { useEffect, useState } from "react";
import ResidentSidebar from "@/components/ResidentSidebar";

export default function RoomPage() {
  const [residentId, setResidentId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email && email !== residentId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResidentId(email);
    }

    if (email) {
      fetch("/api/get-user-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUserName(data.user.name);
        })
        .catch((err) => console.error("Error fetching user info:", err));
    }
  }, [residentId]);

  return (
    <div className="flex h-screen bg-background-dark text-text-primary">
      <ResidentSidebar />
      <div className="flex-1 flex flex-col">
        <TopBar title="Book a Room" userName={userName} />
        <main className="p-8">
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Book a Room</h2>
            {residentId && <BookRoom residentId={residentId} />}
          </div>
        </main>
      </div>
    </div>
  );
}
