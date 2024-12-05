"use client";
import { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";

import calenderMonthIcon from "@/assets/icons/calendar_month.svg";
import timeLineIcon from "@/assets/icons/timeline.svg";
import notificationAddIcon from "@/assets/icons/notification_add.svg";
import dateBenifitImage from '@/assets/images/dates_benefits_light.svg'
import priceInsightImage from '@/assets/images/price_insights_benefits_light.svg'
import trackingPriceImage from '@/assets/images/tracking_prices_benefits_light.svg'

// Define the type for an insight
interface Insight {
  id: number;
  icon: string; // Path to the icon
  title: string;
  description: string;
  contentTitle: string;
  contentText: string;
  contentImage: string
}

// Array of insights
const insights: Insight[] = [
  {
    id: 1,
    icon: calenderMonthIcon,
    title: "Find the cheapest days to fly",
    description:
      "The Date grid and Price graph make it easy to see the best flight deals.",
    contentTitle: "Insightful tools help you choose your trip dates",
    contentText:
      "If your travel plans are flexible, use the form above to start searching for a specific trip. Then, play around with the Date grid and Price graph options on the Search page to find the cheapest days to get to your destination – and back again for round trips.",
    contentImage: dateBenifitImage
  },
  {
    id: 2,
    icon: timeLineIcon,
    title: "See the whole picture with price insights",
    description:
      "Price history and trend data show you when to book to get the best price on your flight.",
    contentTitle: "Get smart insights about flight prices",
    contentText:
      "Real-time insights can tell you if a fare is lower or higher than usual, and if the fare you’re seeing is a good price. So, you don’t have to worry about paying too much for a flight or missing out on the cheapest time to book. On some routes, you might also see historical data that helps you better understand how flight prices vary over time.",
    contentImage: priceInsightImage
  },
  {
    id: 3,
    icon: notificationAddIcon,
    title: "Track prices for a trip",
    description:
      "Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop.",
    contentTitle:
      "Monitor flight prices and make sure you never miss a price change",
    contentText:
      "Effortlessly track prices for specific travel dates or for any dates, if your plans are flexible, to uncover the best deals. You can easily set up tracking for multiple routes while searching for flights and opt-in to receive email updates when the price changes. Once that's done, you can come back to your Tracked Flights page to monitor prices whenever you like, or relax knowing you’ll never miss a flight deal.",
    contentImage: trackingPriceImage
  },
];

export default function FindBestDeal() {
  const [selectedInsight, setSelectedInsight] = useState<Insight>(insights[0]); // Default to the first card

  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const handleToggle = (faqIndex: number) => {
    // Toggle the selected index; if clicked again, close the accordion
    setSelectedIndex((prevIndex) => (prevIndex === faqIndex ? null : faqIndex));
  };

  return (
    <>
      <section className="hidden lg:block py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-medium text-[#202124]">
            Useful tools to help you find the best deals
          </h2>
          <div className="mt-6 px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)] gap-14">
            {/* Left Section */}
            <div className="grid grid-rows-3 gap-6">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className='relative bg-blue-50 p-6 rounded-2xl border border-gray-200  flex items-start cursor-pointer min-h-[calc(100%-40px)]'
                  onClick={() => setSelectedInsight(insight)} // Update selected card
                >
                  {/* Tooltip Arrow */}
                  {selectedInsight.id === insight.id && (
                    <div className="absolute -right-4 top-1/2  transform -translate-y-1/2">
                      <div className="size-8 bg-blue-50 rotate-45 border border-b-transparent border-l-transparent  border-gray-200"></div>
                    </div>
                  )}
                  <Image
                    src={insight.icon}
                    alt={`${insight.title} Icon`}
                    className="size-10"
                  />
                  <div className="pl-3 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">
                      {insight.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {insight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Section */}
            <div className="">
              <h2 className="text-2xl text-gray-900">
                {selectedInsight.contentTitle}
              </h2>
              <p className="mt-3 mb-6 text-sm text-gray-600">
                {selectedInsight.contentText}
              </p>
              <Image src={selectedInsight.contentImage} alt="Content Image" width={460} height={300} />

            </div>
          </div>
        </div>
      </section>

      <section className='lg:hidden my-12'>
        <div className='max-w-5xl mx-auto px-4'>
          <h2 className='text-xl font-medium text-[#202124]'>
            Frequently asked questions
          </h2>
          <div className='mt-4 flex flex-col gap-3'>
            {insights.map((faq, faqIndex) => (
              <div key={faq.id} className='bg-blue-50 rounded-md p-5'>
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => handleToggle(faqIndex)}
                >
                  <div className="flex items-start">
                    <Image
                      src={faq.icon}
                      alt={`${faq.title} Icon`}
                      className="size-7 md:size-10"
                    />
                    <div className="ml-2">
                      <h3 className='text-base leading-5 font-medium'>
                        {faq.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">{faq.description}</p>
                    </div>
                  </div>

                  <div className='size-11 rounded-full transition hover:bg-gray-200 flex flex-none items-center justify-center'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      focusable='false'
                      className={twMerge(
                        "transition duration-200",
                        selectedIndex === faqIndex && "rotate-180"
                      )}
                    >
                      <path d='M12 16.41l-6.71-6.7 1.42-1.42 5.29 5.3 5.29-5.3 1.42 1.42z'></path>
                    </svg>
                  </div>
                </div>
                <AnimatePresence>
                  {selectedIndex === faqIndex && (
                    <motion.div
                      initial={{ height: 0, marginTop: 0 }}
                      animate={{ height: "auto", marginTop: 16 }}
                      exit={{
                        height: 0,
                        marginTop: 0,
                      }}
                      className={twMerge("mt-4 pt-2 px-8 overflow-hidden")}
                    >
                      <h2 className="text-base md:text-2xl text-gray-900">
                        {selectedInsight.contentTitle}
                      </h2>
                      <p className="mt-3 mb-6 text-sm text-gray-600">
                        {selectedInsight.contentText}
                      </p>
                      <Image src={selectedInsight.contentImage} alt="Content Image" width={460} height={300} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
