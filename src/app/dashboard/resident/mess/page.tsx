"use client";

import ResidentSidebar from "@/components/ResidentSidebar";
import TopBar from "@/components/TopBar";
import MessMenu from "@/components/MessMenu";
import { useEffect, useState } from "react";

interface Booking {
  roomNumber: string;
  roomType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function ResidentMessPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [userName, setUserName] = useState<string>("Resident");

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      if (email) {
        try {
          // Fetch Booking
          const bookingResponse = await fetch("/api/get-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ residentId: email }),
          });
          if (bookingResponse.ok) {
            const data = await bookingResponse.json();
            setBooking(data.booking);
          }

          // Fetch User Info
          const userResponse = await fetch("/api/get-user-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUserName(userData.user.name);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-background-dark text-text-primary">
      <ResidentSidebar booking={booking || undefined} />
      <div className="flex-1 flex flex-col overflow-auto">
        <TopBar title="Mess Menu" userName={userName} />
        <main className="p-0">
          <MessMenu />
        </main>
      </div>
    </div>
  );
}
