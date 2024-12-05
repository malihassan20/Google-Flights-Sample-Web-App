import React from "react";
import Image from "next/image";
import Link from "next/link";

import worldIcon from "@/assets/icons/world.svg";
import locationOnIcon from "@/assets/icons/location_on.svg";
import currencyIcon from "@/assets/icons/universal-currency.svg";

interface FooterLink {
  label: string,
  href: string
}

const footerLink: FooterLink[] = [
  {
    label: "About",
    href: "#",
  },
  {
    label: "Privacy",
    href: "#",
  },
  {
    label: "Terms",
    href: "#",
  },
  {
    label: "Join our studies",
    href: "#",
  },
  {
    label: "Feedback",
    href: "#",
  },
  {
    label: "Help Center",
    href: "#",
  },
];

function Footer() {
  return (
    <footer className='border-t border-gray-300'>
      <div className="max-w-5xl mx-auto px-4">
        <div className='flex flex-wrap items-center justify-center gap-4 my-7'>
          <div className='border border-black/40 rounded-full group px-4 py-1 flex items-center group transition hover:bg-indigo-50'>
            <Image src={worldIcon} alt='World Icon' className='mr-2 size-5' />
            <div className='font-medium text-sm text-blue-500 group-hover:text-blue-700'>
              <span>Language</span>
              <span className="mx-1">&middot;</span>
              <span>English (United States)</span>
            </div>
          </div>
          <div className='border border-black/40 rounded-full group px-4 py-1 flex items-centergroup transition hover:bg-indigo-50'>
            <Image src={locationOnIcon} alt='Location Icon' className='mr-2 size-5' />
            <div className='font-medium text-sm text-blue-500'>
              <span>Location</span>
              <span className="mx-1">&middot;</span>
              <span>Pakistan</span>
            </div>
          </div>
          <div className='border border-black/40 rounded-full group px-4 py-1 flex items-center group transition hover:bg-indigo-50'>
            <Image
              src={currencyIcon}
              alt='Universal Currency Icon'
              className='mr-2 size-5'
            />
            <div className='font-medium text-sm text-blue-500 flex items-center'>
              <span>Currency</span>
              <span className="mx-1">&middot;</span>
              <span>PKR</span>
            </div>
          </div>
        </div>
        <div className='text-center text-[#70757a]'>
          <p className='text-sm'>
            Current language and currency options applied: English (United States)
            - Pakistan - PKR
          </p>
          <p className='text-sm'>
            Displayed currencies may differ from the currencies used to purchase
            flights.
          </p>
          <p className='my-4 text-sm'>
            Prices are final prices and include all taxes and fees, including
            payment fees for the cheapest common payment method (which may differ
            depending on the provider). Additional charges may apply for other
            types of payment, luggage, meals, WLAN or other additional services.
            Prices, availability and travel details are provided based on the
            latest information received from our partners. This information is
            reflected in the results within a period of less than 24 hours.
            Additional conditions may also be applied by our partners. You should
            then check prices and conditions with the services providers before
            booking.
          </p>
        </div>
        <div className='flex items-center justify-center flex-wrap gap-4 mt-3 mb-7 h-9'>
          {footerLink.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className='text-sm text-blue-500 p-2 transition duration-300 hover:underline'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
