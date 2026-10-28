'use client'
import React, { useState, useEffect, useRef } from "react";
import BTN from "./BTN";
import EventDetails from "./EventDetails";
import Timer from "./Timer";

const DEFAULT_MEMBER = {
    name: "",
    attendance: "DELIGHTED TO ACCEPT",
    meal: "VEGETARIAN",
};

const ContentCont = () => {
    const [showForm, setShowForm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [memberCount, setMemberCount] = useState(1);
    const [membersData, setMembersData] = useState([{ ...DEFAULT_MEMBER }]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const scrollRef = useRef(null);

    // Make sure wheel / trackpad / touch scrolling reaches this container
    // even if a parent element or library tries to block it.
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const stopBubble = (e) => e.stopPropagation(); // do NOT preventDefault

        el.addEventListener("wheel", stopBubble, { passive: true });
        el.addEventListener("touchmove", stopBubble, { passive: true });

        return () => {
            el.removeEventListener("wheel", stopBubble);
            el.removeEventListener("touchmove", stopBubble);
        };
    }, [showForm]);

    // Scroll back to top whenever the form is opened
    useEffect(() => {
        if (showForm && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [showForm]);

    const handleMemberCountChange = (value) => {
        let count = parseInt(value);
        if (isNaN(count) || count < 1) count = 1;
        if (count > 20) count = 20;
        setMemberCount(count);

        setMembersData((prev) => {
            if (count > prev.length) {
                const extra = Array.from({ length: count - prev.length }, () => ({
                    ...DEFAULT_MEMBER,
                }));
                return [...prev, ...extra];
            }
            return prev.slice(0, count);
        });
    };

    const handleMemberDataChange = (index, field, value) => {
        setMembersData((prev) =>
            prev.map((member, i) =>
                i === index ? { ...member, [field]: value } : member
            )
        );
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ membersData }),
            });

            if (res.ok) {
                alert("Thank you for your RSVP!");
                setShowForm(false);
                setMemberCount(1);
                setMembersData([{ ...DEFAULT_MEMBER }]);
            } else {
                const data = await res.json();
                alert(`Something went wrong: ${data.error || "Please try again."}`);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Error submitting the form.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className={`content-wrapper max-sm:w-[80%] w-[90%] md:w-[75%] h-[90%]  md:h-[75%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 ${showForm ? "justify-start" : "justify-center"
                }`}
        >
            {!showForm ? (
                <>
                    <div className="w-full flex flex-col justify-center items-center gap-2" >

                        {/* LOGO-INFO */}
                        <div className="w-[40px] md:w-[50px] h-fit relative overflow-hidden">
                            <img src="/images/FIRE.svg" alt="Holy Fire Symbol" className="w-full object-cover object-center" />
                        </div>

                        {/* TEXT-INFO */}
                        <div className="flex items-center justify-center gap-3 max-sm:mt-8 text-[#567a99] w-[90%] text-[1.6rem] tracking-0 md:max-w-[60%] my-2 md:my-4 mb-2  md:text-2xl FONT_PN font-semibold capitalize text-center sm:tracking-tight leading-7 md:leading-8">
                            <h1 className="text-inherit font-inherit m-0 p-0 max-sm:text-[1.1rem]">
                                NAVJOTE CEREMONY OF
                            </h1>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="w-[95%] sm:w-[60%] md:w-[40%] h-fit flex relative">
                        <img src="/images/MainText.png" alt="NAVJOTE Ceremony Title" className="w-full object-cover object-center" />
                    </div>

                    <div className="w-full flex flex-col justify-center items-center my-2 gap-3 md:gap-2">

                        <EventDetails />
                        <Timer />
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                            <BTN label="RSVP" onClick={() => setShowForm(true)} />
                            <BTN label="Know More" onClick={() => setShowInfo((prev) => !prev)} />
                        </div>

                        {showInfo && (
                            <p className="text-[#567a99] text-sm md:text-base FONT_PN font-semibold text-center mt-2">
                                For Further Information and Queries:{" "} <br className="sm:hidden" />
                                <a
                                    href="mailto:masaninavjote@gmail.com"
                                    className="underline hover:text-[#C59B4E] transition-colors break-all"
                                >
                                    masaninavjote@gmail.com
                                </a>
                            </p>
                        )}
                    </div>
                </>
            ) : (
                /* ===== SCROLLABLE RSVP FORM ===== */
                <div
                    ref={scrollRef}
                    data-lenis-prevent
                    className="
                        w-full h-full min-h-0
                        overflow-y-auto overflow-x-hidden
                        overscroll-contain touch-pan-y
                        p-4 pb-24
                        [scrollbar-width:none] [-ms-overflow-style:none]
                        [&::-webkit-scrollbar]:hidden
                    "
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <div className="w-full flex flex-col items-center gap-6">
                        {/* LOGO-INFO */}
                        <div className="w-[40px] md:w-[50px] h-fit relative overflow-hidden mb-2 shrink-0">
                            <img src="/images/FIRE.svg" alt="Holy Fire Symbol" className="w-full object-cover object-center" />
                        </div>

                        <h2 className="text-[#567a99] text-xl md:text-2xl font-serif shrink-0">RSVP</h2>

                        {/* MEMBER COUNT */}
                        <div className="flex flex-col items-center gap-3 w-full max-w-md shrink-0">
                            <label className="text-[#567a99] text-base md:text-lg FONT_PN font-semibold text-center">
                                Number of Attending Members:
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleMemberCountChange(memberCount - 1)}
                                    className="w-8 h-8 flex items-center justify-center border border-[#C59B4E] text-[#567a99] rounded-full hover:bg-[#C59B4E] hover:text-white transition-colors pb-0.5"
                                >
                                    -
                                </button>
                                <span className="text-[#567a99] font-serif text-xl w-8 text-center">
                                    {memberCount}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleMemberCountChange(memberCount + 1)}
                                    className="w-8 h-8 flex items-center justify-center border border-[#C59B4E] text-[#567a99] rounded-full hover:bg-[#C59B4E] hover:text-white transition-colors pb-0.5"
                                >
                                    +
                                </button>
                            </div>

                            {/* SCROLL INDICATOR */}
                            {memberCount > 1 && (
                                <div className="flex flex-col items-center gap-1 mt-2 opacity-80">
                                    <span className="text-[#567a99] text-[0.7rem] FONT_PN font-bold uppercase tracking-widest">Scroll for more details</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C59B4E] animate-bounce">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <polyline points="19 12 12 19 5 12"></polyline>
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* MEMBER CARDS */}
                        <div className="w-full max-w-2xl flex flex-col gap-6 items-center shrink-0">
                            {membersData.map((member, index) => (
                                <div
                                    key={index}
                                    className="w-full border border-[#C59B4E]/30 p-4 flex flex-col gap-4"
                                >
                                    <h3 className="text-[#C59B4E] FONT_PN font-semibold text-base md:text-lg text-center border-b border-[#C59B4E]/20 pb-2">
                                        Person {index + 1}
                                    </h3>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-[#567a99] FONT_PN font-semibold text-sm">Name:</label>
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) =>
                                                handleMemberDataChange(index, "name", e.target.value)
                                            }
                                            className="border-b border-[#567a99]/50 bg-transparent text-[#567a99] p-1 outline-none FONT_PN font-semibold w-full focus:border-[#C59B4E] transition-colors"
                                            placeholder="Enter full name"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6 justify-between mt-2">
                                        {/* Attendance */}
                                        <div className="flex flex-col gap-3">
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${index}`}
                                                    checked={member.attendance === "DELIGHTED TO ACCEPT"}
                                                    onChange={() =>
                                                        handleMemberDataChange(index, "attendance", "DELIGHTED TO ACCEPT")
                                                    }
                                                    className="accent-[#C59B4E] w-4 h-4 cursor-pointer"
                                                />
                                                <span className="text-[#567a99] FONT_PN font-semibold text-sm group-hover:text-[#C59B4E] transition-colors">
                                                    DELIGHTED TO ACCEPT
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${index}`}
                                                    checked={member.attendance === "REGRETFULLY UNABLE TO ATTEND"}
                                                    onChange={() =>
                                                        handleMemberDataChange(index, "attendance", "REGRETFULLY UNABLE TO ATTEND")
                                                    }
                                                    className="accent-[#C59B4E] w-4 h-4 cursor-pointer"
                                                />
                                                <span className="text-[#567a99] FONT_PN font-semibold text-sm group-hover:text-[#C59B4E] transition-colors">
                                                    REGRETFULLY UNABLE TO ATTEND
                                                </span>
                                            </label>
                                        </div>

                                        {/* Meal */}
                                        <div className={`flex flex-col gap-3 transition-opacity duration-300 ${member.attendance !== "DELIGHTED TO ACCEPT" ? "opacity-40 pointer-events-none" : ""}`}>
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name={`meal-${index}`}
                                                    checked={member.meal === "VEGETARIAN"}
                                                    onChange={() =>
                                                        handleMemberDataChange(index, "meal", "VEGETARIAN")
                                                    }
                                                    disabled={member.attendance !== "DELIGHTED TO ACCEPT"}
                                                    className="accent-[#C59B4E] w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                                                />
                                                <span className="text-[#567a99] FONT_PN font-semibold text-sm group-hover:text-[#C59B4E] transition-colors">
                                                    VEGETARIAN
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name={`meal-${index}`}
                                                    checked={member.meal === "NON-VEGETARIAN"}
                                                    onChange={() =>
                                                        handleMemberDataChange(index, "meal", "NON-VEGETARIAN")
                                                    }
                                                    disabled={member.attendance !== "DELIGHTED TO ACCEPT"}
                                                    className="accent-[#C59B4E] w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                                                />
                                                <span className="text-[#567a99] FONT_PN font-semibold text-sm group-hover:text-[#C59B4E] transition-colors">
                                                    NON-VEGETARIAN
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col items-center gap-2 mt-4 shrink-0">
                            <BTN label={isSubmitting ? "SUBMITTING..." : "SUBMIT"} onClick={handleSubmit} />
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                disabled={isSubmitting}
                                className="text-[#567a99] text-sm FONT_PN font-semibold underline hover:text-[#C59B4E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentCont;