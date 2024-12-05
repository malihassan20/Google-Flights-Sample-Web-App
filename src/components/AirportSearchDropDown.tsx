"use client";
import { useState, useEffect } from "react";

const AirportSearchDropdown = () => {
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false); // Controls dropdown visibility
    const [searchQuery, setSearchQuery] = useState<string>(""); // Search input
    const [airports, setAirports] = useState<any[]>([]); // List of airports
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchAirports(searchQuery);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    // Fetch airport data
    const fetchAirports = async (searchQuery: string) => {
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/flights/searchAirport?query=${encodeURIComponent(
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
            setAirports(result?.data || []);
        } catch (error) {
            console.error("Error fetching airports:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search field changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchQuery(searchValue);
    };

    return (
        <div
            className="relative w-full max-w-md mx-auto"
            onMouseDown={(e) => e.stopPropagation()} // Prevent closing on dropdown interactions
        >
            {/* Primary Search Field */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setDropdownVisible(true)}
                placeholder="Search for an airport"
                className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {/* Dropdown */}
            {isDropdownVisible && (
                <div
                    className="absolute z-50 w-full mt-1 bg-white border rounded shadow-md max-h-80 overflow-y-auto"
                    onMouseDown={(e) => e.stopPropagation()} // Keep dropdown open when interacting
                >
                    {/* Dropdown Content */}
                    {isLoading ? (
                        <div className="p-3 text-center">Loading...</div>
                    ) : airports.length > 0 ? (
                        airports.map((airport, index) => (
                            <div
                                key={index}
                                className="p-3 hover:bg-blue-100 cursor-pointer"
                                onClick={() => {
                                    setDropdownVisible(false); // Close dropdown on selection
                                    setSearchQuery(airport.presentation.title); // Set the selected airport in the search field
                                }}
                            >
                                <div className="font-semibold">{airport.presentation.title}</div>
                                <div className="text-sm text-gray-500">
                                    {airport.presentation.suggestionTitle},{" "}
                                    {airport.presentation.subtitle}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-3 text-center text-gray-500">No results found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AirportSearchDropdown;


