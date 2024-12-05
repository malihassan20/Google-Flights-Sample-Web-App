import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import personIcon from "@/assets/icons/person.svg";

interface MembersCount {
  options?: string[];
  showIcon?: boolean;
}

const MembersCount: React.FC<MembersCount> = ({ showIcon }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button
        ref={buttonRef}
        className={twMerge(
          "flex items-center rounded px-1 sm:px-3 py-2 transitions w-max",
          "hover:bg-gray-100",
          "active:bg-blue-100",
          "focus:border-b-2 focus:border-blue-500 rounded-bl-none rounded-br-none focus:bg-blue-100",
          isOpen && "rounded-bl-none rounded-br-none"
        )}
        onClick={toggleDropdown}
      >
        {showIcon && (
          <Image
            src={personIcon}
            alt='Selected Option Icon'
            className='mr-1 size-6'
          />
        )}
        <span className='mx-1 sm:mx-2 text-sm text-gray-600'>{count}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20px'
          viewBox='0 -960 960 960'
          width='20px'
          className={twMerge(
            "transition-transform duration-300",
            isOpen ? "transform rotate-180" : "transform rotate-0",
            isOpen ? "text-blue-500" : "text-gray-500"
          )}
        >
          <path d='M480-384 288-576h384L480-384Z' />
        </svg>
      </button>
      {/* Dropdown menu */}
      {isOpen && (
        <ul
          ref={dropdownRef}
          className={twMerge(
            "bg-white shadow-md p-4 absolute z-30 mt-1 rounded-md space-y-6",
            isOpen ? "w-full" : "w-auto",
            `w-[${buttonWidth}px]`
          )}
        >
          <li className={twMerge("w-full cursor-pointer")}>
            <div className={twMerge("flex items-center justify-between w-full")}>
              <span className='text-left pr-6 text-secondary'>
                Adults
              </span>
              <div className='flex items-center'>
                <button className='rounded bg-gray-300 px-4 py-1 text-xl size-7 flex items-center justify-center'>
                  -
                </button>
                <span className='mx-2 sm:mx-4'>{count}</span>
                <button className='rounded bg-gray-300 px-4 py-1 text-xl size-7 flex items-center justify-center'>
                  +
                </button>
              </div>
            </div>
          </li>
          <li className={twMerge("w-full cursor-pointer")}>
            <div className={twMerge("flex items-center justify-between w-full")}>
              <span className='flex flex-col items-start pr-6 text-secondary'>
                <span>
                  Childrens
                </span>
                <span className="text-xs">
                  Aged 2 - 11
                </span>
              </span>
              <div className='flex items-center'>
                <button className='rounded bg-gray-300 px-4 py-1 text-xl size-7 flex items-center justify-center'>
                  -
                </button>
                <span className='mx-2 sm:mx-4'>{count}</span>
                <button className='rounded bg-gray-300 px-4 py-1 text-xl size-7 flex items-center justify-center'>
                  +
                </button>
              </div>
            </div>
          </li>
          <li
            className={twMerge(
              "w-full cursor-pointer"
            )}
          >
            <div className={twMerge("flex items-center justify-between w-full")}>
              <span className='flex flex-col items-start pr-6 text-secondary'>
                <span>
                  Infants
                </span>
                <span className="text-xs">
                  In seat
                </span>
              </span>
              <div className='flex items-center'>
                <button className='rounded bg-gray-300 px-4 py-1 text-xl size-7 flex items-center justify-center'>
                  -
                </button>
                <span className='mx-2 sm:mx-4'>{count}</span>
                <button className='rounded bg-gray-300 px-4 py-1 text-xl size-7 flex items-center justify-center'>
                  +
                </button>
              </div>
            </div>
          </li>
          <li
            className={twMerge(
              "w-full cursor-pointer"
            )}
          >
            <div className={twMerge("flex items-center justify-between w-full")}>
              <span className='flex flex-col items-start pr-6 text-secondary'>
                <span>
                  Infants
                </span>
                <span className="text-xs">
                  On leap
                </span>
              </span>
              <div className='flex items-center'>
                <button className='rounded bg-gray-300 px-4 py-1 text-xl size-7 flex items-center justify-center'>
                  -
                </button>
                <span className='mx-2 sm:mx-4'>{count}</span>
                <button className='rounded bg-gray-300 px-4 py-1 text-xl size-7 flex items-center justify-center'>
                  +
                </button>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MembersCount;
