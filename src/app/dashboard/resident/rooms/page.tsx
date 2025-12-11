"use client";

import ResidentSidebar from "@/components/ResidentSidebar";
import TopBar from "@/components/TopBar";
import RoomAvailability from "@/components/RoomAvailability";
import BookRoom from "@/components/BookRoom";
import { useState, useEffect } from "react";

interface Booking {
  roomNumber: string;
  roomType: string;
}

export default function RoomsPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookRoom, setShowBookRoom] = useState(false);
  const [residentId, setResidentId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    setResidentId(email);

    if (email) {
      // Fetch User Info
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

      const fetchBooking = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('/api/get-booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ residentId: email }),
          });
          if (response.ok) {
            const data = await response.json();
            setBooking(data.booking);
          }
        } catch (error) {
          console.error('Error fetching booking:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBooking();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex h-screen bg-background-dark text-text-primary">
      <ResidentSidebar />
      <div className="flex-1 flex flex-col">
        <TopBar title="Rooms" userName={userName} />
        <main className="p-8">
          {isLoading ? (
            <p>Loading...</p>
          ) : booking ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Room</h2>
              <p>Room Type: {booking.roomType}</p>
              <p>Room Number: {booking.roomNumber}</p>
            </div>
          ) : (
            <>
              {!showBookRoom && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Book Your Room</h2>
                  <p className="text-gray-400 mb-4">
                    Welcome to MADHAN HOSTEL! As a new resident, you can book your room here.
                  </p>
                  <button
                    onClick={() => setShowBookRoom(true)}
                    className="bg-accent-purple text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Book a Room
                  </button>
                </div>
              )}
              {showBookRoom && (
                <div className="mb-8">
                  <BookRoom residentId={residentId ?? undefined} />
                </div>
              )}
            </>
          )}
          <RoomAvailability />
        </main>
      </div>
    </div>
  );
}
