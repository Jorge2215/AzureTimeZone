import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
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
      <div className="relative w-full" style={{ paddingBottom: '50%', minHeight: '500px' }}>
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-180,-85,180,85&layer=mapnik"
            className="absolute inset-0 w-full h-full border-0"
            title="World Map"
            style={{ pointerEvents: 'auto' }}
          />
        </div>

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
                className="absolute z-10"
                style={{
                  left: `${(pos.x / dimensions.width) * 100}%`,
                  top: `${(pos.y / dimensions.height) * 100}%`,
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
                <div className="relative">
                  <div 
                    className={`
                      absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full
                      ${isDaytime ? 'bg-[oklch(0.85_0.18_85)]' : 'bg-accent'}
                      border-2 border-white shadow-lg cursor-pointer z-20
                      transition-transform duration-200
                      ${isHovered ? 'scale-150' : 'scale-100'}
                    `}
                    onMouseEnter={() => setHoveredMarker(marker.id)}
                    onMouseLeave={() => setHoveredMarker(null)}
                  />
                  
                  <div 
                    className={`
                      mb-2 px-3 py-2 rounded-lg shadow-lg border backdrop-blur-sm
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
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      
      <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-background/80 px-2 py-1 rounded">
        Map © <a 
          href="https://www.openstreetmap.org/copyright" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          OpenStreetMap
        </a>
      </div>
    </Card>
  )
}
