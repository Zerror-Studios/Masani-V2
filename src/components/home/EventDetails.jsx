const EventDetails = () => {


    return (
        <>

            <div className="flex flex-col  lg:flex-row items-center justify-center max-sm:mt-5 gap-1 lg:gap-4 text-[#567a99] font-serif text-lg tracking-wide ">

                {/* Date */}
                <div className="flex items-center gap-3 FONT_PN font-bold">
                    <svg className="text-[#C59B4E]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>30 December 2026</span>
                </div>

                <span className="hidden lg:block text-[#567a99] text-2xl font-light">|</span>

                {/* Time */}
                <div className="flex items-center gap-3  FONT_PN font-bold">
                    <svg className="text-[#C59B4E]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>5 o'clock in the evening</span>
                </div>

                <span className="hidden lg:block text-[#567a99] text-2xl font-light">|</span>

                {/* Location */}
                <div className="flex items-center gap-3 FONT_PN font-bold">
                    <svg className="text-[#C59B4E]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Mumbai, India</span>
                </div>

            </div>
        </>
    )
}
export default EventDetails