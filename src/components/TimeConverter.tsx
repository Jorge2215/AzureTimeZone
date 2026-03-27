import { useState } from 'react'
import { Calendar, Clock } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TimeConverterProps {
  timezones: Array<{ value: string; city: string }>
  onConvert: (date: Date, sourceTimezone: string) => void
}

export function TimeConverter({ timezones, onConvert }: TimeConverterProps) {
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0]?.value || '')
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  })
  const [selectedTime, setSelectedTime] = useState(() => {
    const now = new Date()
    return now.toTimeString().slice(0, 5)
  })

  const handleConvert = () => {
    if (!selectedTimezone || !selectedDate || !selectedTime) return

    const dateTimeString = `${selectedDate}T${selectedTime}:00`
    const sourceDate = new Date(dateTimeString)
    
    const localTimeInZone = new Date(
      sourceDate.toLocaleString('en-US', { timeZone: selectedTimezone })
    )
    
    const offset = sourceDate.getTime() - localTimeInZone.getTime()
    const adjustedDate = new Date(sourceDate.getTime() + offset)
    
    onConvert(adjustedDate, selectedTimezone)
  }

  const handleSetNow = () => {
    const now = new Date()
    setSelectedDate(now.toISOString().split('T')[0])
    setSelectedTime(now.toTimeString().slice(0, 5))
    handleConvert()
  }

  return (
    <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-accent/10 border-2 border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <Clock size={28} weight="duotone" className="text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Time Converter</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="timezone" className="text-sm font-medium">
            Source Time Zone
          </Label>
          <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium">
            Date
          </Label>
          <div className="relative">
            <Calendar 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
              size={18}
            />
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm font-medium">
            Time
          </Label>
          <div className="relative">
            <Clock 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
              size={18}
            />
            <Input
              id="time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="pl-10 font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium opacity-0">Actions</Label>
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              Convert
            </Button>
            <Button onClick={handleSetNow} variant="outline" className="flex-1">
              Now
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Set a specific time in any zone to see it converted across all your time zones
      </div>
    </Card>
  )
}
