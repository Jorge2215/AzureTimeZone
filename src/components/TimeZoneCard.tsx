import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash, DotsSixVertical, SunHorizon, MoonStars } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatTime, formatDate, getUTCOffset, calculateSunTimes } from '@/lib/timezones'
import { CityMapDialog } from '@/components/CityMapDialog'

interface TimeZoneCardProps {
  timezone: string
  city: string
  country: string
  lat?: number
  lon?: number
  onRemove: () => void
  convertMode?: boolean
  convertDate?: Date
}

export function TimeZoneCard({ 
  timezone, 
  city,
  country,
  lat,
  lon,
  onRemove, 
  convertMode = false,
  convertDate
}: TimeZoneCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isHovered, setIsHovered] = useState(false)

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

  const getLocalTime = () => {
    return new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }))
  }

  const localTime = getLocalTime()
  const timeString = formatTime(localTime)
  const dateString = formatDate(localTime)
  const offset = getUTCOffset(timezone)

  const sunTimes = lat !== undefined && lon !== undefined 
    ? calculateSunTimes(lat, lon, localTime, timezone)
    : null

  const formatSunTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative p-6 transition-all duration-200 hover:shadow-lg hover:border-accent group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="text-muted-foreground hover:text-foreground transition-colors cursor-grab active:cursor-grabbing">
              <DotsSixVertical size={20} weight="bold" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">{city}</h3>
              <Badge variant="secondary" className="mt-1 text-xs">
                {offset}
              </Badge>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className="flex gap-2"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash size={18} weight="bold" />
            </Button>
          </motion.div>
        </div>

        <div className="font-mono text-5xl font-bold text-foreground tabular-nums">
          {timeString}
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          {dateString}
        </div>

        {sunTimes && (
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <SunHorizon size={18} weight="duotone" className="text-primary" />
              <div className="text-sm">
                <span className="text-muted-foreground">Sunrise </span>
                <span className="font-mono font-medium text-foreground">{formatSunTime(sunTimes.sunrise)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MoonStars size={18} weight="duotone" className="text-accent" />
              <div className="text-sm">
                <span className="text-muted-foreground">Sunset </span>
                <span className="font-mono font-medium text-foreground">{formatSunTime(sunTimes.sunset)}</span>
              </div>
            </div>
          </div>
        )}

        {lat !== undefined && lon !== undefined && (
          <div className="mt-4">
            <CityMapDialog 
              city={city}
              country={country}
              lat={lat}
              lon={lon}
            />
          </div>
        )}
      </Card>
    </motion.div>
  )
}
