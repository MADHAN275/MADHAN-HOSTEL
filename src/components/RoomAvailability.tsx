"use client";

import React from 'react';
import SpotlightCard from './SpotlightCard';

const RoomAvailability = ({ bookedRooms = [] }: { bookedRooms?: string[] }) => {
  const allRooms = {
    single: Array.from({ length: 15 }, (_, i) => `1${(i + 1).toString().padStart(2, '0')}`),
    double: Array.from({ length: 10 }, (_, i) => `2${(i + 1).toString().padStart(2, '0')}`),
    four: Array.from({ length: 15 }, (_, i) => `3${(i + 1).toString().padStart(2, '0')}`),
  };

  const singleSeaterRooms = {
    available: allRooms.single.length - bookedRooms.filter(room => allRooms.single.includes(room)).length,
    rooms: allRooms.single.filter(room => !bookedRooms.includes(room)),
  };

  const twoSeaterRooms = {
    available: allRooms.double.length - bookedRooms.filter(room => allRooms.double.includes(room)).length,
    rooms: allRooms.double.filter(room => !bookedRooms.includes(room)),
  };

  const fourSeaterRooms = {
    available: allRooms.four.length - bookedRooms.filter(room => allRooms.four.includes(room)).length,
    rooms: allRooms.four.filter(room => !bookedRooms.includes(room)),
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Room Availability</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard>
          <h3 className="text-lg font-bold mb-2">Single Seater</h3>
          <p className="text-4xl font-bold">{singleSeaterRooms.available}</p>
          <p className="text-sm text-gray-400">Available Rooms</p>
          <div className="mt-4">
            <p className="font-semibold">Room Numbers:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {singleSeaterRooms.rooms.map((room) => (
                <span key={room} className="bg-gray-700 px-2 py-1 rounded-md text-xs">
                  {room}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
        <SpotlightCard>
          <h3 className="text-lg font-bold mb-2">Two Seater</h3>
          <p className="text-4xl font-bold">{twoSeaterRooms.available}</p>
          <p className="text-sm text-gray-400">Available Rooms</p>
          <div className="mt-4">
            <p className="font-semibold">Room Numbers:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {twoSeaterRooms.rooms.map((room) => (
                <span key={room} className="bg-gray-700 px-2 py-1 rounded-md text-xs">
                  {room}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
        <SpotlightCard>
          <h3 className="text-lg font-bold mb-2">Four Seater</h3>
          <p className="text-4xl font-bold">{fourSeaterRooms.available}</p>
          <p className="text-sm text-gray-400">Available Rooms</p>
          <div className="mt-4">
            <p className="font-semibold">Room Numbers:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {fourSeaterRooms.rooms.map((room) => (
                <span key={room} className="bg-gray-700 px-2 py-1 rounded-md text-xs">
                  {room}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default RoomAvailability;
