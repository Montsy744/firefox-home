import { onMounted, ref } from "vue"
import { fetchCity, fetchWeather } from "../services/WeatherService"
import { Coords } from "../Types/Coord"
import { COORDS_TTL, DEFAULT_COORDS, Weather, WEATHER_TTL } from "../utils/WeatherUtils"

export function readCache<T>(key: string, ttl: number): T | null {
  try {
    const raw = JSON.parse(localStorage.getItem(key) ?? 'null')
    return raw && Date.now() - raw.at < ttl ? (raw.data as T) : null
  } catch {
    return null
  }
}
 
export function writeCache(key: string, data: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify({ at: Date.now(), data }))
  } catch {}
}

const round = (n: number) => Math.round(n * 100) / 100

async function getCoords(): Promise<{ coords: Coords; located: boolean }> {
  const cached = readCache<Coords>('coords', COORDS_TTL)
  if (cached) return { coords: cached, located: true }
 
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) {
      return resolve({ coords: DEFAULT_COORDS, located: false })
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const coords = { latitude: round(p.coords.latitude), longitude: round(p.coords.longitude) }
        writeCache('coords', coords)
        resolve({ coords, located: true })
      },
      () => resolve({ coords: DEFAULT_COORDS, located: false }),
      { timeout: 5000, maximumAge: COORDS_TTL },
    )
  })
}

function describe(code: number, isDay: boolean): { label: string; icon: string } {
  if (code === 0) return { label: 'Ciel dégagé', icon: isDay ? 'ti-sun' : 'ti-moon' }
  if (code <= 2) return { label: 'Peu nuageux', icon: isDay ? 'ti-sun' : 'ti-moon' }
  if (code === 3) return { label: 'Couvert', icon: 'ti-cloud' }
  if (code <= 48) return { label: 'Brouillard', icon: 'ti-mist' }
  if (code <= 57) return { label: 'Bruine', icon: 'ti-cloud-rain' }
  if (code <= 67) return { label: 'Pluie', icon: 'ti-cloud-rain' }
  if (code <= 77) return { label: 'Neige', icon: 'ti-snowflake' }
  if (code <= 82) return { label: 'Averses', icon: 'ti-cloud-rain' }
  if (code <= 86) return { label: 'Averses de neige', icon: 'ti-snowflake' }
  return { label: 'Orage', icon: 'ti-cloud-storm' }
}
 
export function useWeather() {
  const weather = ref<Weather | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(true)
 
  async function load() {
    loading.value = true
    error.value = null
    try {
      const cached = readCache<Weather>('weather', WEATHER_TTL)
      if (cached) {
        weather.value = cached
        return
      }
 
      const { coords, located } = await getCoords()
      const [raw, city] = await Promise.all([
        fetchWeather(coords),
        located ? fetchCity(coords) : Promise.resolve(null),
      ])
 
      const { current, daily } = raw
      const isDay = current.is_day === 1
      const data: Weather = {
        temp: Math.round(current.temperature_2m),
        min: Math.round(daily.temperature_2m_min[0]),
        max: Math.round(daily.temperature_2m_max[0]),
        wind: Math.round(current.wind_speed_10m),
        humidity: current.relative_humidity_2m,
        isDay,
        city,
        located,
        ...describe(current.weather_code, isDay),
      }
      weather.value = data
      writeCache('weather', data)
    } catch {
      error.value = 'Météo indisponible. Vérifie ta connexion.'
    } finally {
      loading.value = false
    }
  }
 
  function refresh() {
    localStorage.removeItem('weather')
    return load()
  }
 
  onMounted(load)
  return { weather, error, loading, refresh }
}


