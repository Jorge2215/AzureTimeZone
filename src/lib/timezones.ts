export interface TimeZone {
  value: string
  label: string
  city: string
  country: string
}

export const TIMEZONES: TimeZone[] = [
  { value: "Pacific/Midway", label: "Midway (UTC-11)", city: "Midway", country: "USA" },
  { value: "Pacific/Honolulu", label: "Honolulu (UTC-10)", city: "Honolulu", country: "USA" },
  { value: "America/Anchorage", label: "Anchorage (UTC-9)", city: "Anchorage", country: "USA" },
  { value: "America/Los_Angeles", label: "Los Angeles (UTC-8)", city: "Los Angeles", country: "USA" },
  { value: "America/Denver", label: "Denver (UTC-7)", city: "Denver", country: "USA" },
  { value: "America/Chicago", label: "Chicago (UTC-6)", city: "Chicago", country: "USA" },
  { value: "America/New_York", label: "New York (UTC-5)", city: "New York", country: "USA" },
  { value: "America/Caracas", label: "Caracas (UTC-4)", city: "Caracas", country: "Venezuela" },
  { value: "America/Sao_Paulo", label: "São Paulo (UTC-3)", city: "São Paulo", country: "Brazil" },
  { value: "Atlantic/South_Georgia", label: "South Georgia (UTC-2)", city: "South Georgia", country: "UK" },
  { value: "Atlantic/Azores", label: "Azores (UTC-1)", city: "Azores", country: "Portugal" },
  { value: "Europe/London", label: "London (UTC+0)", city: "London", country: "UK" },
  { value: "Europe/Paris", label: "Paris (UTC+1)", city: "Paris", country: "France" },
  { value: "Europe/Berlin", label: "Berlin (UTC+1)", city: "Berlin", country: "Germany" },
  { value: "Europe/Athens", label: "Athens (UTC+2)", city: "Athens", country: "Greece" },
  { value: "Africa/Cairo", label: "Cairo (UTC+2)", city: "Cairo", country: "Egypt" },
  { value: "Europe/Moscow", label: "Moscow (UTC+3)", city: "Moscow", country: "Russia" },
  { value: "Asia/Dubai", label: "Dubai (UTC+4)", city: "Dubai", country: "UAE" },
  { value: "Asia/Karachi", label: "Karachi (UTC+5)", city: "Karachi", country: "Pakistan" },
  { value: "Asia/Kolkata", label: "Mumbai (UTC+5:30)", city: "Mumbai", country: "India" },
  { value: "Asia/Dhaka", label: "Dhaka (UTC+6)", city: "Dhaka", country: "Bangladesh" },
  { value: "Asia/Bangkok", label: "Bangkok (UTC+7)", city: "Bangkok", country: "Thailand" },
  { value: "Asia/Singapore", label: "Singapore (UTC+8)", city: "Singapore", country: "Singapore" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (UTC+8)", city: "Hong Kong", country: "China" },
  { value: "Asia/Shanghai", label: "Shanghai (UTC+8)", city: "Shanghai", country: "China" },
  { value: "Asia/Tokyo", label: "Tokyo (UTC+9)", city: "Tokyo", country: "Japan" },
  { value: "Asia/Seoul", label: "Seoul (UTC+9)", city: "Seoul", country: "South Korea" },
  { value: "Australia/Sydney", label: "Sydney (UTC+10)", city: "Sydney", country: "Australia" },
  { value: "Pacific/Noumea", label: "Nouméa (UTC+11)", city: "Nouméa", country: "New Caledonia" },
  { value: "Pacific/Auckland", label: "Auckland (UTC+12)", city: "Auckland", country: "New Zealand" },
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
