import React, { useState, useEffect } from "react";

interface Carrier {
  name: string;
  logoUrl: string;
}

interface Leg {
  departure: string; // ISO date string
  arrival: string; // ISO date string
  origin: {
    name: string;
    displayCode: string;
  };
  destination: {
    city: string;
    displayCode: string;
  };
  durationInMinutes: number;
  stopCount: number;
  carriers: {
    marketing: Carrier[];
  };
}

interface Flight {
  id: string;
  legs: Leg[];
  price: {
    formatted: string; // e.g., "$123"
  };
}

interface FlightListProps {
  flights: Flight[];
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  return (
    <div className='max-w-5xl mx-auto px-4 mt-12'>
      <h2 className='text-xl font-medium mb-4'>Top Flights</h2>
      <div className='space-y-7'>
        {flights.map((flight) => (
          <div
            key={flight.id}
            className='flex flex-col md:flex-row items-center justify-between rounded-lg shadow-md p-4 border border-gray-200'
          >
            {/* Flight Legs Section */}
            <div className='flex flex-col w-full md:w-auto gap-4'>
              {flight.legs.map((leg, legIndex) => (
                <div
                  key={legIndex}
                  className='grid grid-cols-1 md:grid-cols-4 items-center gap-8'
                >
                  {/* Carrier Info */}
                  {leg.carriers?.marketing?.length > 0 && (
                    <div className='flex flex-col items-center gap-3'>
                      <img
                        src={leg.carriers.marketing[0].logoUrl}
                        alt={leg.carriers.marketing[0].name}
                        className='size-10 object-contain'
                      />
                      <span className='text-sm font-medium text-gray-700'>
                        {leg.carriers.marketing[0].name}
                      </span>
                    </div>
                  )}

                  {/* Departure and Arrival */}
                  <div className='flex flex-col items-center gap-3'>
                    <span className='text-lg font-medium text-gray-800'>
                      {new Date(leg.departure).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      -{" "}
                      {new Date(leg.arrival).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                    <span className='text-sm text-gray-500'>
                      {leg.origin.name} - {leg.destination.name}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className='flex flex-col items-center gap-3'>
                    <span className='text-md text-gray-700 font-semibold'>
                      {Math.floor(leg.durationInMinutes / 60)}hr{" "}
                      {leg.durationInMinutes % 60}min
                    </span>
                    <span className='text-sm text-gray-500'>
                      {leg.origin.displayCode} - {leg.destination.displayCode}
                    </span>
                  </div>

                  {/* Stops */}
                  <div className='text-sm text-gray-600 font-medium'>
                    {leg.stopCount === 0
                      ? "Nonstop"
                      : `${leg.stopCount} Stop${leg.stopCount > 1 ? "s" : ""}`}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Section */}
            <div className='mt-4 md:mt-0 text-right md:text-left'>
              <span className='text-lg font-bold text-gray-800'>
                {flight.price.formatted}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
