import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatTime, getUTCOffset } from '@/lib/timezones'

interface MapMarker {
  id: string
  city: string
  country: string
  timezone: string
  lat: number
  lon: number
}

interface WorldMapViewProps {
  markers: MapMarker[]
  convertMode?: boolean
  convertDate?: Date
}

function projectToMap(lat: number, lon: number, width: number, height: number) {
  const x = ((lon + 180) / 360) * width
  const latRad = (lat * Math.PI) / 180
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
  const y = height / 2 - (height * mercN) / (2 * Math.PI)
  return { x, y }
}

export function WorldMapView({ markers, convertMode = false, convertDate }: WorldMapViewProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (convertMode && convertDate) {
      setCurrentTime(convertDate)
      return
    }

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [convertMode, convertDate])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const getTimeForZone = (timezone: string) => {
    const time = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }))
    return formatTime(time)
  }

  const getHourAngle = (timezone: string) => {
    const time = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }))
    const hours = time.getHours()
    const isDaytime = hours >= 6 && hours < 18
    return isDaytime
  }

  return (
    <Card className="relative w-full overflow-hidden bg-card" ref={containerRef}>
      <div className="relative w-full" style={{ paddingBottom: '50%' }}>
        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 w-full h-full"
          style={{ background: 'linear-gradient(180deg, oklch(0.25 0.05 250) 0%, oklch(0.30 0.08 245) 100%)' }}
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="oklch(0.99 0 0 / 0.08)" />
            </pattern>
            
            <radialGradient id="dayGlow">
              <stop offset="0%" stopColor="oklch(0.85 0.15 85)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="oklch(0.75 0.15 75)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="oklch(0.75 0.15 75)" stopOpacity="0" />
            </radialGradient>
            
            <radialGradient id="nightGlow">
              <stop offset="0%" stopColor="oklch(0.45 0.15 250)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="oklch(0.35 0.12 255)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="oklch(0.35 0.12 255)" stopOpacity="0" />
            </radialGradient>

            <filter id="markerGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect width="1000" height="500" fill="url(#dots)" />

          {markers.map((marker) => {
            const pos = projectToMap(marker.lat, marker.lon, 1000, 500)
            const isDaytime = getHourAngle(marker.timezone)
            const isHovered = hoveredMarker === marker.id

            return (
              <g key={marker.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHovered ? 60 : 45}
                  fill={isDaytime ? 'url(#dayGlow)' : 'url(#nightGlow)'}
                  className="transition-all duration-300"
                />
                
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={8}
                  fill={isDaytime ? 'oklch(0.85 0.18 85)' : 'oklch(0.75 0.15 210)'}
                  stroke="oklch(0.99 0 0)"
                  strokeWidth={2}
                  filter="url(#markerGlow)"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1.4 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredMarker(marker.id)}
                  onMouseLeave={() => setHoveredMarker(null)}
                />

                <motion.line
                  x1={pos.x}
                  y1={pos.y}
                  x2={pos.x}
                  y2={pos.y - 30}
                  stroke="oklch(0.99 0 0 / 0.5)"
                  strokeWidth={1}
                  strokeDasharray="2,2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </g>
            )
          })}
        </svg>

        <AnimatePresence>
          {markers.map((marker) => {
            const pos = projectToMap(marker.lat, marker.lon, dimensions.width, dimensions.height)
            const timeStr = getTimeForZone(marker.timezone)
            const offset = getUTCOffset(marker.timezone)
            const isDaytime = getHourAngle(marker.timezone)
            const isHovered = hoveredMarker === marker.id

            return (
              <motion.div
                key={marker.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${(pos.x / 1000) * 100}%`,
                  top: `${(pos.y / 500) * 100}%`,
                  transform: 'translate(-50%, -100%)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: isHovered ? -10 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div 
                  className={`
                    px-3 py-2 rounded-lg shadow-lg border backdrop-blur-sm
                    transition-all duration-200
                    ${isHovered 
                      ? 'bg-card/95 border-accent shadow-xl' 
                      : 'bg-card/80 border-border/50'
                    }
                  `}
                  onMouseEnter={() => setHoveredMarker(marker.id)}
                  onMouseLeave={() => setHoveredMarker(null)}
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className={`w-2 h-2 rounded-full ${
                        isDaytime ? 'bg-[oklch(0.85_0.18_85)]' : 'bg-accent'
                      }`}
                    />
                    <div className="font-medium text-sm text-foreground whitespace-nowrap">
                      {marker.city}
                    </div>
                  </div>
                  <div className="font-mono text-lg font-bold text-foreground tabular-nums">
                    {timeStr}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {offset}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </Card>
  )
}
