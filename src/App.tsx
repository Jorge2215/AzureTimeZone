import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Globe, Clock, Eye } from '@phosphor-icons/react'
import { Toaster, toast } from 'sonner'
import { TimeZoneCard } from '@/components/TimeZoneCard'
import { AddTimeZoneDialog } from '@/components/AddTimeZoneDialog'
import { TimeConverter } from '@/components/TimeConverter'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import type { TimeZone } from '@/lib/timezones'

interface SavedTimeZone extends TimeZone {
  id: string
}

const DEFAULT_TIMEZONES: SavedTimeZone[] = [
  {
    id: '1',
    value: 'America/New_York',
    label: 'New York (UTC-5)',
    city: 'New York',
    country: 'USA',
    lat: 40.7128,
    lon: -74.0060
  },
  {
    id: '2',
    value: 'Europe/London',
    label: 'London (UTC+0)',
    city: 'London',
    country: 'UK',
    lat: 51.5074,
    lon: -0.1278
  },
  {
    id: '3',
    value: 'Asia/Tokyo',
    label: 'Tokyo (UTC+9)',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lon: 139.6503
  }
]

function App() {
  const [savedTimezones, setSavedTimezones] = useKV<SavedTimeZone[]>('saved-timezones', DEFAULT_TIMEZONES)
  const [convertMode, setConvertMode] = useState(false)
  const [convertDate, setConvertDate] = useState<Date | undefined>(undefined)
  const [sourceTimezone, setSourceTimezone] = useState<string>('')

  const timezones = savedTimezones || DEFAULT_TIMEZONES

  const handleAddTimeZone = (timezone: TimeZone) => {
    if (timezones.length >= 10) {
      toast.error('Maximum of 10 time zones reached')
      return
    }

    const newTimeZone: SavedTimeZone = {
      ...timezone,
      id: Date.now().toString()
    }

    setSavedTimezones((current) => [...(current || []), newTimeZone])
    toast.success(`Added ${timezone.city}`)
  }

  const handleRemoveTimeZone = (id: string) => {
    setSavedTimezones((current) => {
      const currentList = current || []
      const removed = currentList.find(tz => tz.id === id)
      if (removed) {
        toast.success(`Removed ${removed.city}`)
      }
      return currentList.filter((tz) => tz.id !== id)
    })
  }

  const handleConvert = (date: Date, timezone: string) => {
    setConvertDate(date)
    setSourceTimezone(timezone)
    setConvertMode(true)
    toast.success('Time converted across all zones')
  }

  const handleToggleLiveMode = () => {
    setConvertMode(false)
    setConvertDate(undefined)
    setSourceTimezone('')
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Globe size={40} weight="duotone" className="text-primary" />
                <h1 className="text-4xl font-bold text-foreground">World Clock</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                {convertMode ? 'Viewing converted time across zones' : 'Track time across multiple time zones'}
              </p>
            </div>
            {convertMode && (
              <Button
                onClick={handleToggleLiveMode}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Eye size={20} weight="bold" />
                Show Live Time
              </Button>
            )}
          </div>
        </header>

        {timezones.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Globe size={80} weight="duotone" className="text-muted-foreground mb-6" />
            <h2 className="text-2xl font-medium text-foreground mb-2">No Time Zones Added</h2>
            <p className="text-muted-foreground mb-8">Add your first time zone to get started</p>
            <AddTimeZoneDialog
              onAddTimeZone={handleAddTimeZone}
              existingTimezones={timezones.map((tz) => tz.value)}
            />
          </div>
        ) : (
          <>
            {!convertMode && (
              <TimeConverter
                timezones={timezones.map((tz) => ({ value: tz.value, city: tz.city }))}
                onConvert={handleConvert}
              />
            )}

            {convertMode && convertDate && (
              <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock size={20} weight="bold" className="text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    Showing {convertDate.toLocaleString('en-US', { 
                      timeZone: sourceTimezone,
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })} from {timezones.find(tz => tz.value === sourceTimezone)?.city || 'selected zone'}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                {timezones.length} {timezones.length === 1 ? 'zone' : 'zones'} active
              </div>
              <AddTimeZoneDialog
                onAddTimeZone={handleAddTimeZone}
                existingTimezones={timezones.map((tz) => tz.value)}
              />
            </div>

            <Separator className="mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timezones.map((tz) => (
                <TimeZoneCard
                  key={tz.id}
                  timezone={tz.value}
                  city={tz.city}
                  country={tz.country}
                  lat={tz.lat}
                  lon={tz.lon}
                  onRemove={() => handleRemoveTimeZone(tz.id)}
                  convertMode={convertMode}
                  convertDate={convertDate}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App