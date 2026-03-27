import { MapPin } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface CityMapDialogProps {
  city: string
  country: string
  lat: number
  lon: number
}

export function CityMapDialog({ city, country, lat, lon }: CityMapDialogProps) {
  const zoom = 12
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}&layer=mapnik&marker=${lat},${lon}`
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-accent/20 hover:text-accent transition-colors"
        >
          <MapPin size={16} weight="bold" />
          View Map
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <MapPin size={28} weight="duotone" className="text-accent" />
            {city}
          </DialogTitle>
          <DialogDescription>
            {country} • {lat.toFixed(4)}°, {lon.toFixed(4)}°
          </DialogDescription>
        </DialogHeader>
        
        <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={mapUrl}
            title={`Map of ${city}`}
            className="w-full h-full"
          />
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          Map data © <a 
            href="https://www.openstreetmap.org/copyright" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            OpenStreetMap contributors
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
