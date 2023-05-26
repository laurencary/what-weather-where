export * as weatherAPI from './openMateoClient'

export async function getCoordinates(zipCode) {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${zipCode}&count=1&language=en&format=json`)
    if (response.ok) {
        const json = await response.json();
        return json.results[0]
    } else {
        throw response;
    }
};

export async function getWeatherData(options, coordinates) {
    const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?timezone=auto&latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&start_date=${options.startDate}&end_date=${options.endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,rain_sum,sunrise,sunset`)
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        throw response.json();
    }
}