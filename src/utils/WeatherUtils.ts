import { Coords } from "../Types/Coord"

interface Weather {
  temp: number
  min: number
  max: number
  wind: number
  humidity: number
  label: string
  icon: string
  isDay: boolean
  city: string | null
  located: boolean // false = position par défaut (géolocalisation refusée ou indisponible)
}

const DEFAULT_COORDS: Coords = { latitude: 48.85, longitude: 2.35 }
const WEATHER_TTL = 15 * 60 * 1000
const COORDS_TTL = 60 * 60 * 1000
const CITY_TTL = 30 * 24 * 60 * 60 * 1000

export {
    Weather,
    DEFAULT_COORDS,
    WEATHER_TTL,
    COORDS_TTL,
    CITY_TTL
}