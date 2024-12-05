"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Datepicker } from "flowbite-react";
import { twMerge } from "tailwind-merge";
// Icons
import searchIcon from "@/assets/icons/search.svg";
import flightImg from "@/assets/images/flights_nc.svg";
import topOriginIcon from "@/assets/icons/trip_origin.svg";
import locationIcon from "@/assets/icons/location.svg";
import swapHorizIcon from "@/assets/icons/swap_horiz.svg";
import calenderIcon from "@/assets/icons/date_range.svg";

// components
import FlightList from "@/components/FlightList";
import TripDropDown from "../components/TripDropDown";
import MembersCount from "@/components/MembersCount";

const tripOptions: string[] = ["One way", "Round trip", "Multi city"];
const bussinessOptions: string[] = [
  "Economy",
  "Premium economy",
  "Bussiness",
  "First",
];

const SearchFlights = () => {
  const [isDropdownVisible1, setDropdownVisible1] = useState<boolean>(false);
  const [isDropdownVisible2, setDropdownVisible2] = useState<boolean>(false);
  const [whereFrom, setwhereFrom] = useState<string>("");
  const [whereTo, setWhereTo] = useState<string>("");
  const [flights, setFlights] = useState<any[]>([]);
  const [locationWhereFrom, setLocationWhereFrom] = useState<any[]>([]);
  const [locationWhereTo, setLocationWhereTo] = useState<any[]>([]);
  const [originSkyId, setOriginSkyId] = useState({});
  const [destinationSkyId, setDestinationSkyId] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [isFlightsLoading, setIsFlightsLoading] = useState<boolean>(false);
  const [isCalendarOpenDepature, setCalendarOpenDepature] = useState(false);
  const [isCalendarOpenReturn, setCalendarOpenReturn] = useState(false);
  const [departureDate, setDepatureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [error, setError] = useState("");

  const [swap, setSwap] = useState(false);

  const handleDateSelectReturn = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    // Format the date as yyyy-mm-dd
    const formattedDate = `${year}-${month}-${day}`;
    setReturnDate(formattedDate);
    setCalendarOpenReturn(false); // Close the calendar after selection
  };

  const handleDateSelectDeparture = (date) => {
    // Extract year, month, and day from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as yyyy-mm-dd
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate, "formatted date");

    setDepatureDate(formattedDate);
    setCalendarOpenDepature(false);
  };

  // For Location where from
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchLocationWhereFrom(whereFrom);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [whereFrom]);

  // For Location Where to
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchLocationWhereTo(whereTo);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [whereTo]);

  // Fetch location suggestions based on input
  const fetchLocationWhereFrom = async (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    const url = `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/v1/flights/searchAirport?query=${encodeURIComponent(
      trimmedQuery
    )}&locale=en-US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
      },
    };
    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed to fetch airport data.");
      const result = await response.json();
      setLocationWhereFrom(result?.data || []);
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocationWhereTo = async (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const url = `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/v1/flights/searchAirport?query=${encodeURIComponent(
      trimmedQuery
    )}&locale=en-US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
      },
    };
    try {
      setIsLoading2(true);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed to fetch airport data.");
      const result = await response.json();
      setLocationWhereTo(result?.data || []);
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setIsLoading2(false);
    }
  };

  // Handle typing in the "From" input
  const handleLocationWhereFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setwhereFrom(query);
  };

  // Handle typing in the "Where TO" input
  const handleLocationWhereTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setWhereTo(query);
  };

  const handleSwapLocation = () => {
    [setwhereFrom(whereTo), setWhereTo(whereFrom)];
    [setOriginSkyId(destinationSkyId), setDestinationSkyId(originSkyId)];
    setSwap(!swap);
  };

  const handleSearchFlights = async (): Promise<void> => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/flights/searchFlights?originSkyId=${originSkyId.skyId}&destinationSkyId=${destinationSkyId.skyId}&originEntityId=${originSkyId.entityId}&destinationEntityId=${destinationSkyId.entityId}&date=${departureDate}&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST || "",
      },
    };
    if (originSkyId && destinationSkyId && departureDate) {
      setError("");
      try {
        setIsFlightsLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Failed to fetch flight data");
        const data = await response.json();
        setFlights(data.data.itineraries); // Process flight search data
      } catch (error) {
        console.error(error);
      } finally {
        setIsFlightsLoading(false);
      }
    } else {
      setError("Please selected the above fields");
    }
  };

  return (
    <div className='container mx-auto text-center mb-6 md:pb-12'>
      <div className='w-full md:max-w-6xl md:mx-auto text-center'>
        <Image src={flightImg} alt='Flight NC Image' className='object-fill' />
      </div>
      <h2 className='mb-6 md:mb-12 text-3xl md:text-[56px]'>Flights</h2>
      <div className='max-w-5xl mx-auto mt-2 pt-2 px-4 pb-12 bg-white rounded-lg shadow-md md:shadow-custom-shadow relative'>
        <div className='mb-2 flex items-center justify-start'>
          <TripDropDown showIcon options={tripOptions} />
          <MembersCount showIcon options={bussinessOptions} />
          <TripDropDown options={bussinessOptions} />
        </div>

        <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
          <div className='flex items-center relative w-full'>
            <div className='relative border z-10 border-gray-300 rounded w-full min-h-14 flex items-center after:block after:z-10 after:absolute after:-right-6 after:bg-white after:size-9 after:rounded-full after:border after:border-gray-300'>
              <Image
                src={topOriginIcon}
                alt='Top Origin Icon'
                className=' size-4 absolute top-1/2 -translate-y-1/2 left-5'
              />
              <input
                type='text'
                placeholder='From'
                className='pl-14 p-2 w-full border-none outline-none focus:outline-none focus:ring-0'
                onFocus={() => setDropdownVisible1(true)}
                value={whereFrom}
                onChange={handleLocationWhereFrom}
              />
              {isDropdownVisible1 && (
                <div
                  className='absolute top-12 z-50 w-full mt-1 bg-white border rounded shadow-md max-h-80 overflow-y-auto'
                  onMouseDown={(e) => e.stopPropagation()} // Keep dropdown open when interacting
                >
                  {/* Dropdown Content */}
                  {isLoading ? (
                    <div className='p-3 text-center'>Loading...</div>
                  ) : locationWhereFrom.length > 0 ? (
                    locationWhereFrom.map((airport, index) => (
                      <div
                        key={index}
                        className='p-3 hover:bg-blue-100 cursor-pointer'
                        onClick={() => {
                          setDropdownVisible1(false); // Close dropdown on selection
                          setwhereFrom(airport.presentation.title); // Set the selected airport in the search field
                          setOriginSkyId(airport);
                        }}
                      >
                        <div className='font-semibold'>
                          {airport.presentation.title}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {airport.presentation.suggestionTitle},{" "}
                          {airport.presentation.subtitle}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='p-3 text-center text-gray-500'>
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='inline-block w-5 h-full bg-white z-20'></div>
            <button
              onClick={handleSwapLocation}
              disabled={whereFrom === "" && whereTo === ""}
            >
              <Image
                src={swapHorizIcon}
                alt='Swap Horiz Icon'
                className={twMerge(
                  "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 transition duration-300",
                  swap && "rotate-180"
                )}
              />
            </button>
            <div className='relative z-10 border border-gray-300 rounded w-full min-h-14 flex items-center before:absolute before:-left-6 before:z-10 before:block before:size-9 before:bg-white before:rounded-full before:border before:border-gray-300'>
              <Image
                src={locationIcon}
                alt='Top Origin Icon'
                className='size-5 absolute top-1/2 -translate-y-1/2 left-7'
              />
              <input
                type='text'
                placeholder='Where to'
                className='pl-14 p-2 w-full border-none focus:outline-none focus:ring-0'
                value={whereTo}
                onFocus={() => setDropdownVisible2(true)}
                onChange={handleLocationWhereTo}
              />
              {isDropdownVisible2 && (
                <div
                  className='absolute top-12 z-50 w-full mt-1 bg-white border rounded shadow-md max-h-80 overflow-y-auto'
                  onMouseDown={(e) => e.stopPropagation()} // Keep dropdown open when interacting
                >
                  {/* Dropdown Content */}
                  {isLoading2 ? (
                    <div className='p-3 text-center'>Loading...</div>
                  ) : locationWhereTo.length > 0 ? (
                    locationWhereTo.map((airport, index) => (
                      <div
                        key={index}
                        className='p-3 hover:bg-blue-100 cursor-pointer'
                        onClick={() => {
                          setDropdownVisible2(false); // Close dropdown on selection
                          setWhereTo(airport.presentation.title); // Set the selected airport in the search field
                          setDestinationSkyId(airport);
                        }}
                      >
                        <div className='font-semibold'>
                          {airport.presentation.title}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {airport.presentation.suggestionTitle},{" "}
                          {airport.presentation.subtitle}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='p-3 text-center text-gray-500'>
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='relative border border-gray-300 rounded w-full min-h-14 flex items-center'>
            <div className='flex items-center w-full'>
              <Image
                src={calenderIcon}
                alt='Top Origin Icon'
                className='size-6 absolute top-1/2 -translate-y-1/2 left-7'
              />
              <input
                id='datepicker-inline'
                type='text'
                value={departureDate}
                onFocus={() => setCalendarOpenDepature(true)}
                onChange={(e) => setDepatureDate(e.target.value)} // Allow manual input if needed
                placeholder='Departure'
                className='pl-16 p-2 w-full border-none rounded focus:outline-none focus:ring-0 '
              />
            </div>
            {isCalendarOpenDepature && (
              <div className='absolute top-6 z-10 left-0 mt-2'>
                <Datepicker
                  inline
                  datatype='yyyy-mm-dd'
                  onChange={(date) => handleDateSelectDeparture(date)}
                />
              </div>
            )}
            <div className='border-l-[1px] border-gray-300 w-full overflow-x-hidden'>
              <input
                id='datepicker-inline'
                type='text'
                value={returnDate}
                onFocus={() => setCalendarOpenReturn(true)}
                onChange={(e) => setReturnDate(e.target.value)} // Allow manual input if needed
                placeholder='Return'
                className='pl-4 md:pl-16 p-2 w-full border-none rounded focus:outline-none focus:ring-0 '
              />
            </div>
            {isCalendarOpenReturn && (
              <div className='absolute top-6 z-10 right-0 mt-2'>
                <Datepicker
                  inline
                  datatype='yyyy-mm-dd'
                  onChange={(date) => handleDateSelectReturn(date)}
                />
              </div>
            )}
          </div>
        </div>
        {error && <p className='text-red-500 text-sm mt-4'>{error}</p>}
        <div className='absolute -bottom-5 left-1/2 -translate-x-1/2'>
          <button
            onClick={handleSearchFlights}
            className='px-3 py-2 bg-primary text-white text-sm font-medium rounded-full flex items-center transition hover:bg-blue-600'
          >
            <Image src={searchIcon} alt='Search Icon' className='mr-2 size-6' />
            Search
          </button>
        </div>
      </div>
      {/* Display Flight Data */}
      {/* {flights.length > 0 && (
        <FlightList flights={flights} />
      )} */}
      {isFlightsLoading ? (
        <p className='text-lg text-gray-600 text-center max-w-5xl mx-auto px-4 mt-12'>
          Loading flights, please wait...
        </p>
      ) : (
        // Display Flight Data
        <>{flights.length > 0 && <FlightList flights={flights} />}</>
      )}
    </div>
  );
};

export default SearchFlights;
