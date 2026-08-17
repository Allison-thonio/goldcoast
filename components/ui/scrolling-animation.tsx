"use client"

import { useEffect, useState } from "react"

export function ScrollingAnimation() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const animationProgress = Math.min(scrollY / 500, 1)
  const expandRadius = animationProgress * 300

  return (
    <div className="min-h-[200vh] bg-paper">
      <div className="h-screen flex items-center justify-center p-8 sticky top-0 overflow-hidden">
        <div className="relative">
          <div
            className={`w-[600px] h-[600px] rounded-full flex items-center justify-center transition-all duration-500 ${
              scrollY > 300 ? "border-2 border-sand-deep/40" : ""
            }`}
          >
            <div
              className={`w-[500px] h-[500px] rounded-full flex items-center justify-center relative transition-all duration-500 ${
                scrollY > 100 ? "border-2 border-sand-deep/60" : ""
              }`}
            >
              <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-teal via-clay to-teal-ink p-0.5 flex items-center justify-center relative">
                <div className="w-full h-full rounded-full bg-paper flex items-center justify-center relative">
                  {/* Image 1: Founder Suit */}
                  <div
                    className="absolute w-28 h-28 rounded-2xl overflow-hidden border-4 border-paper shadow-xl transition-transform duration-300 ease-out z-10"
                    style={{
                      transform: `translate(${expandRadius * Math.cos(0)}px, ${expandRadius * Math.sin(0)}px)`,
                    }}
                  >
                    <img
                      src="/founder-suit.jpg"
                      alt="Moses Oruaze Dickson"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute w-24 h-24 rounded-2xl overflow-hidden border-4 border-paper shadow-lg transition-transform duration-300 ease-out z-0"
                    style={{
                      transform: `translate(${expandRadius * Math.cos(Math.PI / 4)}px, ${expandRadius * Math.sin(Math.PI / 4)}px)`,
                    }}
                  >
                    <img
                      src="/community-health.jpg"
                      alt="Community Health Outreach"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute w-24 h-24 rounded-2xl overflow-hidden border-4 border-paper shadow-lg transition-transform duration-300 ease-out z-0"
                    style={{
                      transform: `translate(${expandRadius * Math.cos(Math.PI / 2)}px, ${expandRadius * Math.sin(Math.PI / 2)}px)`,
                    }}
                  >
                    <img
                      src="/community-education.jpg"
                      alt="Community Education Initiative"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute w-24 h-24 rounded-2xl overflow-hidden border-4 border-paper shadow-lg transition-transform duration-300 ease-out z-0"
                    style={{
                      transform: `translate(${expandRadius * Math.cos((3 * Math.PI) / 4)}px, ${expandRadius * Math.sin((3 * Math.PI) / 4)}px)`,
                    }}
                  >
                    <img
                      src="/community-youth.jpg"
                      alt="Youth Skills Workshop"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute w-24 h-24 rounded-2xl overflow-hidden border-4 border-paper shadow-lg transition-transform duration-300 ease-out z-0"
                    style={{
                      transform: `translate(${expandRadius * Math.cos(Math.PI)}px, ${expandRadius * Math.sin(Math.PI)}px)`,
                    }}
                  >
                    <img
                      src="/founder-speech.jpg"
                      alt="Founder Speaking Event"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute w-24 h-24 rounded-2xl overflow-hidden border-4 border-paper shadow-lg transition-transform duration-300 ease-out z-0"
                    style={{
                      transform: `translate(${expandRadius * Math.cos((5 * Math.PI) / 4)}px, ${expandRadius * Math.sin((5 * Math.PI) / 4)}px)`,
                    }}
                  >
                    <img
                      src="/hero-bg.jpg"
                      alt="Mrs. Goldcoast Dickson Legacy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute w-24 h-24 rounded-2xl overflow-hidden border-4 border-paper shadow-lg transition-transform duration-300 ease-out z-0"
                    style={{
                      transform: `translate(${expandRadius * Math.cos((3 * Math.PI) / 2)}px, ${expandRadius * Math.sin((3 * Math.PI) / 2)}px)`,
                    }}
                  >
                    <img
                      src="/community-health.jpg"
                      alt="Health Outreach Bayelsa"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute w-24 h-24 rounded-2xl overflow-hidden border-4 border-paper shadow-lg transition-transform duration-300 ease-out z-0"
                    style={{
                      transform: `translate(${expandRadius * Math.cos((7 * Math.PI) / 4)}px, ${expandRadius * Math.sin((7 * Math.PI) / 4)}px)`,
                    }}
                  >
                    <img
                      src="/community-education.jpg"
                      alt="Education Program Bayelsa"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Center text that fades in on scroll */}
                  <div
                    className={`flex flex-col items-center justify-center relative z-20 transition-opacity duration-500 bg-paper/80 backdrop-blur-sm p-8 rounded-full h-[95%] w-[95%] ${
                      scrollY > 250 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="eyebrow text-mangrove bg-mangrove/10 mb-4 inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase">
                      Est. 2012 · Bayelsa, Nigeria
                    </span>
                    <h1 className="font-serif text-3xl font-bold text-ink text-center mb-2">About Goldcoast</h1>
                    <h1 className="font-serif text-3xl font-bold text-ink text-center mb-4">Foundation</h1>

                    <p className="text-mangrove text-center max-w-xs text-sm leading-relaxed">
                      Dedicated to serving vulnerable communities in the Niger Delta through health, education, and youth development initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
