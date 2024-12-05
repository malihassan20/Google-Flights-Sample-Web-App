'use client'
import React, { useState } from 'react'
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "motion/react";

interface FAQ {
    question: string;
    answer: string;
}
const faqs: FAQ[] = [
    {
        question: "How can I find last-minute flight deals?",
        answer:
            "Some popular flight destinations from Lahore are London, Islamabad, Karachi, Jeddah, Dubai and İstanbul. To find more cheap flights to other destinations, use the Explore tool by interacting with the map above.",
    },
    {
        question: "How can I find last-minute flight deals from Lahore?",
        answer:
            "Finding last-minute flights from Lahore is easy on Google Flights Select a destination in the form on the top of the page, and use the calendar to pick travel dates and find the lowest fares available.",
    },
    {
        question: "What is the best airport to fly out of Lahore?",
        answer:
            "Lahore is served by only one major airport: Allama Iqbal International Airport, 4 km away from the city center.",
    },
    {
        question: "How can I find last-minute flights deals?",
        answer:
            "Some popular flight destinations from Lahore are London, Islamabad, Karachi, Jeddah, Dubai and İstanbul. To find more cheap flights to other destinations, use the Explore tool by interacting with the map above.",
    },
];

function FAQs() {

    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

    const handleToggle = (faqIndex: number) => {
        // Toggle the selected index; if clicked again, close the accordion
        setSelectedIndex((prevIndex) => (prevIndex === faqIndex ? null : faqIndex));
    };
    return (
        <section className='my-12'>
            <div className='max-w-5xl mx-auto px-4'>
                <h2 className='text-xl font-medium text-[#202124]'>
                    Frequently asked questions
                </h2>
                <div className='mt-4 flex flex-col gap-1'>
                    {faqs.map((faq, faqIndex) => (
                        <div key={faq.question} className='border-b border-black/10 p-3'>
                            <div
                                className='flex justify-between items-center cursor-pointer'
                                onClick={() => handleToggle(faqIndex)}
                            >
                                <h3 className='text-base leading-5 font-medium'>
                                    {faq.question}
                                </h3>
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
                                        className={twMerge("mt-4 overflow-hidden")}
                                    >
                                        <p className='text-gray-600'>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQs
