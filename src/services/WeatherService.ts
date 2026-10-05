import { readCache, writeCache } from "../composables/useWeather"
import { Coords } from "../Types/Coord"
import { CITY_TTL } from "../utils/WeatherUtils"

async function fetchWeather({ latitude, longitude }: Coords) {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,is_day',
    daily: 'temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '1',
  }).toString()
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Open-Meteo ${res.status}`)
  return res.json()
}
 
async function fetchCity({ latitude, longitude }: Coords): Promise<string | null> {
  const key = `city:${latitude},${longitude}`
  const cached = readCache<string>(key, CITY_TTL)
  if (cached) return cached
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&accept-language=fr&lat=${latitude}&lon=${longitude}`,
    )
    if (!res.ok) return null
    const a = (await res.json()).address ?? {}
    const city: string | null = a.city ?? a.town ?? a.village ?? a.municipality ?? null
    if (city) writeCache(key, city)
    return city
  } catch {
    return null
  }
}

export {
    fetchCity,
    fetchWeather
}
