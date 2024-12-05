import Link from "next/link";
import React from "react";

function FindCheapFlight() {
  return (
    <section className='my-12'>
      <div className="max-w-5xl mx-auto px-4">
        <h3 className='text-xl font-medium text-[#202124]'>
          Find cheap flights on popular routes
        </h3>
        <div className='mt-4 grid md:grid-cols-3 gap-3'>
          <div className=''>
            <ul className='space-y-2 text-blue-500 '>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to London
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Rome
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Tokyo
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Los Angeles
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Istanbul
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className='space-y-2 text-blue-500 '>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Paris
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Milan
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Rome
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Marrakech
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Bangkok
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className='space-y-2 text-blue-500 '>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Dubai
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Pakistan
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to India
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to Orlando
                </Link>
              </li>
              <li>
                <Link href={"#"} className='text-sm hover:text-blue-600'>
                  Flight From New York to London
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FindCheapFlight;
