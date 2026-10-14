'use client'
import ContentCont from "./ContentCont"
import CornerWhiteCut from "./CornerWhiteCut"
import WhiteBG from "./WhiteBG"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const Hero = () => {
  const container = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.fromTo('.anim-bg',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
    )

    tl.fromTo('.content-wrapper > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      "-=0.5"
    )
  }, { scope: container })

  return (
    <div ref={container} className='w-full h-svh relative bg-white p-2 sm:p-5'>

      <div className="anim-bg w-full h-full bg-[#99BBCF] p-2 sm:p-5  relative overflow-hidden">
        <CornerWhiteCut />
        <WhiteBG />
        <ContentCont />
      </div>

    </div>
  )
}

export default Hero