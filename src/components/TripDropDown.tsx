import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import smallCheckIcon from "@/assets/icons/check_small.svg";
import flatArrowIcon from "@/assets/icons/trending_flat.svg";

interface FlightSearchDropdownProps {
  options: string[];
  showIcon?: boolean;
  iconMapping?: { [key: string]: string }; // Mapping for dynamic icon based on selected option
}

const FlightSearchDropdown: React.FC<FlightSearchDropdownProps> = ({
  options,
  showIcon,
  iconMapping,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(0);

  // Update the button width on render
  useLayoutEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option); // Update the selected value
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className={twMerge(
          "flex items-center rounded px-1 sm:px-3 py-2 transitions w-max text-sm text-gray-600",
          "hover:bg-gray-100",
          "active:bg-blue-100",
          "focus:border-b-2 focus:border-blue-500 rounded-bl-none rounded-br-none focus:bg-blue-100",
          isOpen && "rounded-bl-none rounded-br-none"
        )}
        onClick={toggleDropdown}
      >
        {showIcon && (
          <Image
            src={flatArrowIcon}
            alt="Selected Option Icon"
            className="mr-0 size-6"
          />
        )}
        <span className="mx-1 sm:mx-2 text-ellipsis truncate w-[30px]  xs:w-auto">
          {selectedOption}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          className={twMerge(
            "transition-transform duration-300",
            isOpen ? "transform rotate-180" : "transform rotate-0",
            isOpen ? "text-blue-500" : "text-gray-500"
          )}
        >
          <path d="M480-384 288-576h384L480-384Z" />
        </svg>
      </button>
      {/* Dropdown menu */}
      {isOpen && (
        <ul
          ref={dropdownRef}
          className={twMerge(
            "bg-white shadow-md py-2 absolute z-30 mt-1 rounded-md",
            isOpen ? "w-full" : "w-auto",
            `w-[${buttonWidth}px]`
          )}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={twMerge(
                "text-center py-2 w-full hover:bg-gray-100 cursor-pointer",
                selectedOption === option && "bg-blue-200"
              )}
              onClick={() => handleSelectOption(option)}
            >
              <div
                className={twMerge(
                  "flex items-center justify-center px-5 w-max"
                )}
              >
                {selectedOption === option ? (
                  <Image
                    src={smallCheckIcon}
                    alt="Small Check Icon"
                    className="size-8"
                  />
                ) : (
                  <div className="size-8" />
                )}
                <span className="whitespace-nowrap text-gray-600">{option}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlightSearchDropdown;
