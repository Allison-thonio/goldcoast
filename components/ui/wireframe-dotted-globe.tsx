"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

// Built-in lightweight fallback land coordinates (main continents) to guarantee zero-fail offline rendering
const FALLBACK_LAND_COORDINATES: [number, number][][] = [
  // North America outline (approx)
  [[-130, 50], [-120, 60], [-80, 65], [-60, 45], [-80, 25], [-105, 20], [-120, 35], [-130, 50]],
  // South America outline (approx)
  [[-80, 10], [-50, -5], [-40, -20], [-60, -55], [-75, -40], [-80, -10], [-80, 10]],
  // Europe & Asia outline (approx)
  [[-10, 36], [30, 40], [60, 60], [140, 65], [140, 35], [100, 10], [50, 15], [30, 30], [-10, 36]],
  // Africa outline (approx)
  [[-15, 35], [35, 30], [50, 10], [40, -35], [15, -35], [0, 5], [-15, 15], [-15, 35]],
  // Australia outline (approx)
  [[115, -15], [150, -15], [150, -38], [115, -38], [115, -15]]
]

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    let animationTimer: d3.Timer | null = null
    let autoRotate = true
    const rotation: [number, number] = [0, -15]
    const rotationSpeed = 0.4

    // Responsive size calculation
    const rect = containerRef.current.getBoundingClientRect()
    const containerWidth = Math.max(300, Math.min(width, rect.width || width))
    const containerHeight = Math.max(300, Math.min(height, containerWidth * 0.75))
    const radius = Math.min(containerWidth, containerHeight) / 2.6

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
    canvas.width = Math.floor(containerWidth * dpr)
    canvas.height = Math.floor(containerHeight * dpr)
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // D3 Projection setup
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    interface DotData {
      lng: number
      lat: number
    }

    let allDots: DotData[] = []
    let landGeoJson: any = null

    // Generate fallback dots immediately so sphere is never empty
    FALLBACK_LAND_COORDINATES.forEach((polygon) => {
      let minLng = 180, maxLng = -180, minLat = 90, maxLat = -90
      polygon.forEach(([lng, lat]) => {
        if (lng < minLng) minLng = lng
        if (lng > maxLng) maxLng = lng
        if (lat < minLat) minLat = lat
        if (lat > maxLat) maxLat = lat
      })
      for (let lng = minLng; lng <= maxLng; lng += 4) {
        for (let lat = minLat; lat <= maxLat; lat += 4) {
          allDots.push({ lng, lat })
        }
      }
    })

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius
      const cx = containerWidth / 2
      const cy = containerHeight / 2

      // Outer atmosphere radial glow
      const grad = context.createRadialGradient(cx, cy, currentScale * 0.85, cx, cy, currentScale * 1.15)
      grad.addColorStop(0, "rgba(212, 175, 55, 0.15)")
      grad.addColorStop(0.8, "rgba(15, 44, 89, 0.3)")
      grad.addColorStop(1, "rgba(10, 25, 47, 0)")
      context.fillStyle = grad
      context.beginPath()
      context.arc(cx, cy, currentScale * 1.15, 0, 2 * Math.PI)
      context.fill()

      // Globe ocean sphere background
      context.beginPath()
      context.arc(cx, cy, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "#0A192F" // Deep teal-ink
      context.fill()
      context.strokeStyle = "rgba(212, 175, 55, 0.6)" // Gold rim
      context.lineWidth = 1.5 * scaleFactor
      context.stroke()

      // Draw latitude / longitude graticule wireframe grid
      const graticule = d3.geoGraticule().step([15, 15])
      context.beginPath()
      path(graticule())
      context.strokeStyle = "rgba(255, 255, 255, 0.15)"
      context.lineWidth = 0.8 * scaleFactor
      context.stroke()

      // Draw land outlines if GeoJSON loaded
      if (landGeoJson) {
        context.beginPath()
        path(landGeoJson)
        context.strokeStyle = "rgba(212, 175, 55, 0.45)"
        context.lineWidth = 1 * scaleFactor
        context.stroke()
      }

      // Draw halftone land dots
      context.fillStyle = "#D4AF37" // Ocher Gold dots
      allDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat])
        if (
          projected &&
          projected[0] >= 0 &&
          projected[0] <= containerWidth &&
          projected[1] >= 0 &&
          projected[1] <= containerHeight
        ) {
          context.beginPath()
          context.arc(projected[0], projected[1], 1.25 * scaleFactor, 0, 2 * Math.PI)
          context.fill()
        }
      })
    }

    // Render initial state right away
    render()

    // Start auto-rotation timer immediately
    animationTimer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
        render()
      }
    })

    // Load rich GeoJSON asynchronously from CDN with fallbacks
    const loadWorldData = async () => {
      const urls = [
        "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json",
        "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
      ]

      for (const url of urls) {
        try {
          const res = await fetch(url)
          if (!res.ok) continue
          const data = await res.json()
          if (data) {
            landGeoJson = data
            // Generate denser dot grid for high detail land features
            const newDots: DotData[] = []
            if (data.features) {
              data.features.forEach((feature: any) => {
                const bounds = d3.geoBounds(feature)
                const [[minLng, minLat], [maxLng, maxLat]] = bounds
                for (let lng = Math.floor(minLng); lng <= Math.ceil(maxLng); lng += 3.5) {
                  for (let lat = Math.floor(minLat); lat <= Math.ceil(maxLat); lat += 3.5) {
                    if (d3.geoContains(feature, [lng, lat])) {
                      newDots.push({ lng, lat })
                    }
                  }
                }
              })
            }
            if (newDots.length > 0) {
              allDots = newDots
            }
            render()
            setIsLoading(false)
            return
          }
        } catch {
          // Continue to next fallback URL
        }
      }

      setIsLoading(false)
    }

    loadWorldData()

    // Interactive mouse / touch drag rotation & scroll zoom
    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation] as [number, number]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.4
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = Math.max(-85, Math.min(85, startRotation[1] - dy * sensitivity))

        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => {
          autoRotate = true
        }, 1200)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleFac = event.deltaY > 0 ? 0.92 : 1.08
      const newScale = Math.max(radius * 0.6, Math.min(radius * 2.5, projection.scale() * scaleFac))
      projection.scale(newScale)
      render()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      if (animationTimer) animationTimer.stop()
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("wheel", handleWheel)
    }
  }, [width, height])

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-3xl cursor-grab active:cursor-grabbing select-none"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      {isLoading && (
        <div className="absolute top-4 right-4 text-[11px] font-mono text-sand/80 bg-teal-ink/80 px-2.5 py-1 rounded-full border border-sand/20 backdrop-blur-sm animate-pulse">
          Syncing map points...
        </div>
      )}
      <div className="absolute bottom-4 left-4 text-[11px] font-mono text-paper/70 px-3 py-1.5 rounded-full bg-teal-ink/85 border border-sand/15 backdrop-blur-md shadow-lg pointer-events-none">
        <span className="text-clay">● Drag</span> to rotate · <span className="text-clay">Scroll</span> to zoom
      </div>
    </div>
  )
}
