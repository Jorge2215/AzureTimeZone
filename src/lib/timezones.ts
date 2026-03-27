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
  { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires (UTC-3)", city: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816 },
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

export interface SunTimes {
  sunrise: Date
  sunset: Date
}

export interface DaylightInfo {
  totalHours: number
  remainingHours: number
  percentComplete: number
  isDay: boolean
}

export function calculateSunTimes(lat: number, lon: number, date: Date, timezone: string): SunTimes {
  const jDate = getJulianDate(date)
  const century = (jDate - 2451545.0) / 36525.0
  
  const meanLongSun = (280.46646 + century * (36000.76983 + century * 0.0003032)) % 360
  const meanAnomalySun = 357.52911 + century * (35999.05029 - 0.0001537 * century)
  const eccentEarthOrbit = 0.016708634 - century * (0.000042037 + 0.0000001267 * century)
  
  const sunEqOfCenter = Math.sin(toRadians(meanAnomalySun)) * (1.914602 - century * (0.004817 + 0.000014 * century)) +
                        Math.sin(toRadians(2 * meanAnomalySun)) * (0.019993 - 0.000101 * century) +
                        Math.sin(toRadians(3 * meanAnomalySun)) * 0.000289
  
  const sunTrueLong = meanLongSun + sunEqOfCenter
  const sunAppLong = sunTrueLong - 0.00569 - 0.00478 * Math.sin(toRadians(125.04 - 1934.136 * century))
  
  const meanObliqEcliptic = 23 + (26 + ((21.448 - century * (46.815 + century * (0.00059 - century * 0.001813)))) / 60) / 60
  const obliqCorr = meanObliqEcliptic + 0.00256 * Math.cos(toRadians(125.04 - 1934.136 * century))
  
  const sunDeclin = toDegrees(Math.asin(Math.sin(toRadians(obliqCorr)) * Math.sin(toRadians(sunAppLong))))
  
  const varY = Math.tan(toRadians(obliqCorr / 2)) * Math.tan(toRadians(obliqCorr / 2))
  
  const eqOfTime = 4 * toDegrees(varY * Math.sin(2 * toRadians(meanLongSun)) -
                                 2 * eccentEarthOrbit * Math.sin(toRadians(meanAnomalySun)) +
                                 4 * eccentEarthOrbit * varY * Math.sin(toRadians(meanAnomalySun)) * Math.cos(2 * toRadians(meanLongSun)) -
                                 0.5 * varY * varY * Math.sin(4 * toRadians(meanLongSun)) -
                                 1.25 * eccentEarthOrbit * eccentEarthOrbit * Math.sin(2 * toRadians(meanAnomalySun)))
  
  const haSunrise = toDegrees(Math.acos(Math.cos(toRadians(90.833)) / (Math.cos(toRadians(lat)) * Math.cos(toRadians(sunDeclin))) -
                              Math.tan(toRadians(lat)) * Math.tan(toRadians(sunDeclin))))
  
  const solarNoon = (720 - 4 * lon - eqOfTime) / 1440
  const sunriseTime = solarNoon - haSunrise * 4 / 1440
  const sunsetTime = solarNoon + haSunrise * 4 / 1440
  
  const createTimeInTimezone = (fractionalDay: number) => {
    const hours = Math.floor(fractionalDay * 24)
    const minutes = Math.floor((fractionalDay * 24 - hours) * 60)
    
    const baseDate = new Date(date)
    baseDate.setHours(0, 0, 0, 0)
    
    const utcTime = new Date(Date.UTC(
      baseDate.getUTCFullYear(),
      baseDate.getUTCMonth(),
      baseDate.getUTCDate(),
      hours,
      minutes,
      0
    ))
    
    const localString = utcTime.toLocaleString('en-US', { timeZone: timezone })
    return new Date(localString)
  }
  
  return {
    sunrise: createTimeInTimezone(sunriseTime),
    sunset: createTimeInTimezone(sunsetTime)
  }
}

function getJulianDate(date: Date): number {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  let a = Math.floor((14 - month) / 12)
  let y = year + 4800 - a
  let m = month + 12 * a - 3
  
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
}

function toRadians(degrees: number): number {
  return degrees * Math.PI / 180
}

function toDegrees(radians: number): number {
  return radians * 180 / Math.PI
}

export function calculateDaylightInfo(sunrise: Date, sunset: Date, currentTime: Date): DaylightInfo {
  const sunriseMs = sunrise.getTime()
  const sunsetMs = sunset.getTime()
  const currentMs = currentTime.getTime()
  
  const totalDaylight = sunsetMs - sunriseMs
  const totalHours = totalDaylight / (1000 * 60 * 60)
  
  const isDay = currentMs >= sunriseMs && currentMs <= sunsetMs
  
  let remainingHours = 0
  let percentComplete = 0
  
  if (isDay) {
    const remaining = sunsetMs - currentMs
    remainingHours = remaining / (1000 * 60 * 60)
    const elapsed = currentMs - sunriseMs
    percentComplete = (elapsed / totalDaylight) * 100
  } else if (currentMs < sunriseMs) {
    const remaining = sunsetMs - sunriseMs
    remainingHours = remaining / (1000 * 60 * 60)
    percentComplete = 0
  } else {
    remainingHours = 0
    percentComplete = 100
  }
  
  return {
    totalHours,
    remainingHours,
    percentComplete,
    isDay
  }
}
