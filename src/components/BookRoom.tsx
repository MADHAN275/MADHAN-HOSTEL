"use client";

import { useState, useEffect } from "react";
import Stepper, { Step } from './Stepper';

interface Booking {
  roomNumber: string;
  roomType: string;
}

interface Resident {
  _id: string;
  email: string;
}

interface AvailableRooms {
  [key: string]: string[];
}

interface BookRoomProps {
  residentId?: string;
}

export default function BookRoom({ residentId }: BookRoomProps) {
  const [roomType, setRoomType] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [availableRooms, setAvailableRooms] = useState<AvailableRooms | null>(null);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [selectedResident, setSelectedResident] = useState(residentId || "");
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (residentId) {
        try {
          const response = await fetch("/api/get-booking", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ residentId }),
          });
          if (response.ok) {
            const data = await response.json();
            setBooking(data.booking);
          }
        } catch (error) {
          console.error("Error fetching booking:", error);
        }
      }
    };

    fetchBooking();

    const fetchAvailableRooms = async () => {
      try {
        const response = await fetch("/api/get-available-rooms");
        if (response.ok) {
          const data = await response.json();
          setAvailableRooms(data.availableRooms);
        } else {
          console.error("Failed to fetch available rooms");
        }
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    };

    fetchAvailableRooms();

    if (!residentId) {
      const fetchResidents = async () => {
        try {
          const response = await fetch("/api/get-residents");
          if (response.ok) {
            const data = await response.json();
            setResidents(data);
          } else {
            console.error("Failed to fetch residents");
          }
        } catch (error) {
          console.error("Error fetching residents:", error);
        }
      };

      fetchResidents();
    }
  }, [residentId]);

  const handleConfirmBooking = async () => {
    if (!selectedResident) {
      alert("Please select a resident.");
      return;
    }

    try {
      const response = await fetch("/api/book-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          residentId: selectedResident,
          roomType,
          roomNumber: selectedRoom,
        }),
      });

      if (response.ok) {
        alert(
          `You have successfully booked room ${selectedRoom} for ${selectedResident}!`
        );
      } else {
        const data = await response.json();
        alert(data.message || "Failed to book room. Please try again.");
      }
    } catch (error) {
      console.error("Error booking room:", error);
      alert("An error occurred while booking the room.");
    }
  };

  if (booking) {
    return (
      <div className="bg-white/10 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Your Booking</h3>
        <p>
          You have already booked room{" "}
          <span className="font-bold">{booking.roomNumber}</span> (
          {booking.roomType}).
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 p-6 rounded-lg">
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={() => {
            handleConfirmBooking();
        }}
        backButtonText="Previous"
        nextButtonText="Next"
      >
        <Step>
          <h3 className="text-lg font-bold mb-4">Book the room</h3>
          {!residentId && (
            <>
              <h3 className="text-lg font-bold mb-4">Select a Resident</h3>
              <select
                value={selectedResident}
                onChange={(e) => setSelectedResident(e.target.value)}
                className="bg-gray-700 p-2 rounded-md w-full mb-4"
              >
                <option value="">Select a resident</option>
                {residents.map((resident) => (
                  <option key={resident._id} value={resident.email}>
                    {resident.email}
                  </option>
                ))}
              </select>
            </>
          )}
        </Step>
        <Step>
          <h3 className="text-lg font-bold mb-4">Select Room Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setRoomType("single")}
              className="bg-accent-purple/50 p-4 rounded-lg hover:bg-accent-purple"
            >
              Single Seater
            </button>
            <button
              onClick={() => setRoomType("double")}
              className="bg-accent-purple/50 p-4 rounded-lg hover:bg-accent-purple"
            >
              Two Seater
            </button>
            <button
              onClick={() => setRoomType("four")}
              className="bg-accent-purple/50 p-4 rounded-lg hover:bg-accent-purple"
            >
              Four Seater
            </button>
          </div>
        </Step>
        <Step>
          {availableRooms && roomType && (
            <div>
              <h3 className="text-lg font-bold mb-4">Select a Room</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {availableRooms[roomType].map((room: string) => (
                  <button
                    key={room}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-2 rounded-md ${selectedRoom === room ? 'bg-accent-purple' : 'bg-gray-700 hover:bg-accent-purple'}`}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Step>
        <Step>
          <h3 className="text-lg font-bold mb-4">Confirm Booking</h3>
          <p>
            You have selected room{" "}
            <span className="font-bold">{selectedRoom}</span> for{" "}
            <span className="font-bold">{selectedResident}</span>.
          </p>
        </Step>
      </Stepper>
    </div>
  );
}
