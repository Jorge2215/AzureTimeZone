export interface WeatherData {
  temperature: number
  weatherCode: number
  weatherDescription: string
  windSpeed: number
  humidity: number
}

const WEATHER_CODES: Record<number, string> = {
  0: 'Clear',
  1: 'Mostly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Light Drizzle',
  53: 'Drizzle',
  55: 'Heavy Drizzle',
  61: 'Light Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  71: 'Light Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Light Showers',
  81: 'Showers',
  82: 'Heavy Showers',
  85: 'Light Snow Showers',
  86: 'Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with Hail',
  99: 'Thunderstorm with Hail'
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&temperature_unit=celsius&wind_speed_unit=kmh`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Weather fetch failed')
    }
    
    const data = await response.json()
    
    const weatherCode = data.current.weather_code
    const weatherDescription = WEATHER_CODES[weatherCode] || 'Unknown'
    
    return {
      temperature: Math.round(data.current.temperature_2m),
      weatherCode,
      weatherDescription,
      windSpeed: Math.round(data.current.wind_speed_10m),
      humidity: data.current.relative_humidity_2m
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
    return null
  }
}

export function getWeatherIcon(weatherCode: number): string {
  if (weatherCode === 0 || weatherCode === 1) return '☀️'
  if (weatherCode === 2) return '⛅'
  if (weatherCode === 3) return '☁️'
  if (weatherCode === 45 || weatherCode === 48) return '🌫️'
  if (weatherCode >= 51 && weatherCode <= 55) return '🌦️'
  if (weatherCode >= 61 && weatherCode <= 65) return '🌧️'
  if (weatherCode >= 71 && weatherCode <= 77) return '❄️'
  if (weatherCode >= 80 && weatherCode <= 82) return '🌧️'
  if (weatherCode >= 85 && weatherCode <= 86) return '🌨️'
  if (weatherCode >= 95) return '⛈️'
  return '🌡️'
}
