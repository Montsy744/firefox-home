import { Apod } from "../../Types/nasa/apod";

const APOD_API_URL = "https://science.nasa.gov/wp-json/wp/v2/apod-basic/"

const get_picture_of_the_day = async (): Promise<Apod[]> => {
    const APOD_API_KEY = import.meta.env.VITE_NASA_API_KEY;

    const response = await fetch(`${APOD_API_URL}?per_page=1&api_key=${APOD_API_KEY}`)
    return response.json();
}

export {
    get_picture_of_the_day
}