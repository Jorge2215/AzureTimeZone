export interface TimeZone {
  value: string
  label: string
  city: string
  country: string
  lat?: number
  lon?: number
}

export const TIMEZONES: TimeZone[] = [
  { value: "Pacific/Midway", label: "Midway (UTC-11)", city: "Midway", country: "USA", lat: 28.2072, lon: -177.3735 },
  { value: "Pacific/Honolulu", label: "Honolulu (UTC-10)", city: "Honolulu", country: "USA", lat: 21.3099, lon: -157.8581 },
  { value: "America/Anchorage", label: "Anchorage (UTC-9)", city: "Anchorage", country: "USA", lat: 61.2181, lon: -149.9003 },
  { value: "America/Los_Angeles", label: "Los Angeles (UTC-8)", city: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437 },
  { value: "America/Denver", label: "Denver (UTC-7)", city: "Denver", country: "USA", lat: 39.7392, lon: -104.9903 },
  { value: "America/Chicago", label: "Chicago (UTC-6)", city: "Chicago", country: "USA", lat: 41.8781, lon: -87.6298 },
  { value: "America/New_York", label: "New York (UTC-5)", city: "New York", country: "USA", lat: 40.7128, lon: -74.0060 },
  { value: "America/Caracas", label: "Caracas (UTC-4)", city: "Caracas", country: "Venezuela", lat: 10.4806, lon: -66.9036 },
  { value: "America/Sao_Paulo", label: "São Paulo (UTC-3)", city: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333 },
  { value: "Atlantic/South_Georgia", label: "South Georgia (UTC-2)", city: "South Georgia", country: "UK", lat: -54.2806, lon: -36.5089 },
  { value: "Atlantic/Azores", label: "Azores (UTC-1)", city: "Azores", country: "Portugal", lat: 37.7412, lon: -25.6756 },
  { value: "Europe/London", label: "London (UTC+0)", city: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
  { value: "Europe/Paris", label: "Paris (UTC+1)", city: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { value: "Europe/Berlin", label: "Berlin (UTC+1)", city: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050 },
  { value: "Europe/Athens", label: "Athens (UTC+2)", city: "Athens", country: "Greece", lat: 37.9838, lon: 23.7275 },
  { value: "Africa/Cairo", label: "Cairo (UTC+2)", city: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357 },
  { value: "Europe/Moscow", label: "Moscow (UTC+3)", city: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173 },
  { value: "Asia/Dubai", label: "Dubai (UTC+4)", city: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708 },
  { value: "Asia/Karachi", label: "Karachi (UTC+5)", city: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011 },
  { value: "Asia/Kolkata", label: "Mumbai (UTC+5:30)", city: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777 },
  { value: "Asia/Dhaka", label: "Dhaka (UTC+6)", city: "Dhaka", country: "Bangladesh", lat: 23.8103, lon: 90.4125 },
  { value: "Asia/Bangkok", label: "Bangkok (UTC+7)", city: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018 },
  { value: "Asia/Singapore", label: "Singapore (UTC+8)", city: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
  { value: "Asia/Hong_Kong", label: "Hong Kong (UTC+8)", city: "Hong Kong", country: "China", lat: 22.3193, lon: 114.1694 },
  { value: "Asia/Shanghai", label: "Shanghai (UTC+8)", city: "Shanghai", country: "China", lat: 31.2304, lon: 121.4737 },
  { value: "Asia/Tokyo", label: "Tokyo (UTC+9)", city: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { value: "Asia/Seoul", label: "Seoul (UTC+9)", city: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.9780 },
  { value: "Australia/Sydney", label: "Sydney (UTC+10)", city: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
  { value: "Pacific/Noumea", label: "Nouméa (UTC+11)", city: "Nouméa", country: "New Caledonia", lat: -22.2758, lon: 166.4580 },
  { value: "Pacific/Auckland", label: "Auckland (UTC+12)", city: "Auckland", country: "New Zealand", lat: -36.8485, lon: 174.7633 },
]

export function getTimeInZone(timezone: string, date?: Date): Date {
  const targetDate = date || new Date()
  const localTime = targetDate.toLocaleString("en-US", { timeZone: timezone })
  return new Date(localTime)
}

export function getUTCOffset(timezone: string): string {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset"
  })
  
  const parts = formatter.formatToParts(now)
  const offsetPart = parts.find(part => part.type === "timeZoneName")
  
  return offsetPart?.value || "UTC"
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { 
    weekday: "short", 
    month: "short", 
    day: "numeric" 
  })
}
