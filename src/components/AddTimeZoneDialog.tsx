import { useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TIMEZONES, type TimeZone } from '@/lib/timezones'

interface AddTimeZoneDialogProps {
  onAddTimeZone: (timezone: TimeZone) => void
  existingTimezones: string[]
}

export function AddTimeZoneDialog({ onAddTimeZone, existingTimezones }: AddTimeZoneDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTimezones = TIMEZONES.filter((tz) => {
    const query = searchQuery.toLowerCase()
    return (
      tz.city.toLowerCase().includes(query) ||
      tz.country.toLowerCase().includes(query) ||
      tz.label.toLowerCase().includes(query)
    )
  })

  const handleSelectTimeZone = (timezone: TimeZone) => {
    onAddTimeZone(timezone)
    setOpen(false)
    setSearchQuery('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="text-base font-medium">
          Add Time Zone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Time Zone</DialogTitle>
          <DialogDescription>
            Search and select a time zone to add to your world clock.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          <MagnifyingGlass 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
            size={20}
          />
          <Input
            placeholder="Search cities or countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <ScrollArea className="h-[400px] pr-4">
          {filteredTimezones.length > 0 ? (
            <div className="space-y-2">
              {filteredTimezones.map((tz) => {
                const isAdded = existingTimezones.includes(tz.value)
                return (
                  <button
                    key={tz.value}
                    onClick={() => !isAdded && handleSelectTimeZone(tz)}
                    disabled={isAdded}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      isAdded
                        ? 'bg-muted/50 cursor-not-allowed opacity-50'
                        : 'hover:bg-accent/50 hover:border-accent cursor-pointer'
                    }`}
                  >
                    <div className="font-medium text-foreground">{tz.city}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {tz.country} • {tz.label}
                    </div>
                    {isAdded && (
                      <div className="text-xs text-muted-foreground mt-1">Already added</div>
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No time zones found matching "{searchQuery}"
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
