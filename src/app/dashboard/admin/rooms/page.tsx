"use client";

import RoomAvailability from "@/components/RoomAvailability";
import AdminSidebar from "@/components/AdminSidebar";
import TopBar from "@/components/TopBar";
import { useState, useEffect } from "react";

export default function RoomsPage() {
  const [bookedRooms, setBookedRooms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const response = await fetch('/api/get-all-bookings');
        if (response.ok) {
          const data = await response.json();
          setBookedRooms(data.bookings.map((booking: { roomNumber: string }) => booking.roomNumber));
        }
      } catch (error) {
        console.error('Error fetching booked rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookedRooms();
  }, []);

  return (
    <div className="flex h-screen bg-background-dark text-text-primary">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <TopBar title="Rooms" userName="MADHAN" role="Administrator" />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-secondary-background scrollbar-track-transparent">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <RoomAvailability bookedRooms={bookedRooms} />
          )}
        </main>
      </div>
    </div>
  );
}
