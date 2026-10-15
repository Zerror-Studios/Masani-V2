'use client'
import { useState, useEffect } from 'react';

const EVENT_DATE = new Date(2026, 11, 30); // 30 December 2026 (local midnight)

// Whole calendar days from today until the event
const calculateDaysLeft = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.round((EVENT_DATE - today) / (1000 * 60 * 60 * 24));
    return Math.max(days, 0);
};

const Timer = () => {
    const [daysLeft, setDaysLeft] = useState(null);

    useEffect(() => {
        setDaysLeft(calculateDaysLeft());
        // Re-check every minute so the count rolls over at midnight
        const timer = setInterval(() => setDaysLeft(calculateDaysLeft()), 60 * 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center max-sm:mt-4">
            <span className="text-4xl md:text-5xl font-serif text-[#C29756]">
                {daysLeft ?? " "}
            </span>
            <span className="text-xs md:text-[0.8rem] text-[#567a99] mt-2 uppercase FONT_PN font-semibold">
                {daysLeft === 1 ? "Day to go" : "Days to go"}
            </span>
        </div>
    )
}

export default Timer;
