export * as DATA from "./data";

export async function getCoordinates(zipCode) {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${zipCode}&count=1&language=en&format=json`)
    if (response.ok) {
        const json =  await response.json();
        return json.results[0]
    } else {
        throw response;
    }
};

export async function getWeatherData(options, coordinates) {    
    // const response = await fetch(`https://archive-api.open-meteo.com/v1/archive?timezone=auto&latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&start_date=${options.startDate}&end_date=${options.endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset`)
    // if (response.ok) {
    //     const json = await response.json();
    //     return json;
    // } else {
    //     throw response.json();
    // }    
}

export async function getWeatherMetrics(options) {
    // const coordinates = await getCoordinates(options.zipCode);
    // const weather = await getWeatherData(options, coordinates);
    // const data = { "meta": coordinates, "weather": weather }

    const data = { "meta": coordinates, "weather": sampleResponse}

    data["weather"]["daily"]["sunrise"] = data["weather"]["daily"]["sunrise"].map(ts => extractHourFromTimestamp(ts))
    data["weather"]["daily"]["sunset"] = data["weather"]["daily"]["sunset"].map(ts => extractHourFromTimestamp(ts))
    data["weather"]["daily"]["daylight"] = []
    for (let i = 0; i < data["weather"]["daily"]["sunrise"].length; i++) {
        data["weather"]["daily"]["daylight"].push(data["weather"]["daily"]["sunset"][i] - data["weather"]["daily"]["sunrise"][i]);
    }

    return data;
}


const extractHourFromTimestamp = (ts) => {
    return Number(ts.slice(11, 13)) + Number(ts.slice(14, 16)) / 60
}


const coordinates = {
    "id": 5380748,
    "name": "Palo Alto",
    "latitude": 37.44188,
    "longitude": -122.14302,
    "elevation": 9,
    "feature_code": "PPL",
    "country_code": "US",
    "admin1_id": 5332921,
    "admin2_id": 5393021,
    "timezone": "America/Los_Angeles",
    "population": 66853,
    "postcodes": [
        "94301",
        "94302",
        "94304",
        "94306",
        "94309"
    ],
    "country_id": 6252001,
    "country": "United States",
    "admin1": "California",
    "admin2": "Santa Clara"
}


const sampleResponse = {
    "latitude": 37.4,
    "longitude": -122.1,
    "generationtime_ms": 0.822901725769043,
    "utc_offset_seconds": -25200,
    "timezone": "America/Los_Angeles",
    "timezone_abbreviation": "PDT",
    "elevation": 20,
    "daily_units": {
        "time": "iso8601",
        "temperature_2m_max": "°C",
        "temperature_2m_min": "°C",
        "precipitation_sum": "mm",
        "sunrise": "iso8601",
        "sunset": "iso8601"
    },
    "daily": {
        "time": [
            "2023-05-06",
            "2023-05-07",
            "2023-05-08",
            "2023-05-09",
            "2023-05-10",
            "2023-05-11",
            "2023-05-12",
            "2023-05-13",
            "2023-05-14",
            "2023-05-15",
            "2023-05-16",
            "2023-05-17",
            "2023-05-18",
            "2023-05-19",
            "2023-05-20"
        ],
        "temperature_2m_max": [
            15.8,
            17.3,
            16.8,
            16.8,
            15.6,
            17.4,
            22.1,
            27.8,
            22.5,
            23.2,
            25.2,
            24.3,
            20.9,
            19.6,
            null
        ],
        "temperature_2m_min": [
            10.3,
            9.9,
            8.2,
            9,
            8.2,
            9,
            9.7,
            12,
            13.3,
            11.1,
            12.1,
            12.4,
            11.5,
            11,
            null
        ],
        "precipitation_sum": [
            3,
            0,
            0.7,
            0.3,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            null,
            null,
            null
        ],
        "sunrise": [
            "2023-05-06T06:06",
            "2023-05-07T06:05",
            "2023-05-08T06:04",
            "2023-05-09T06:03",
            "2023-05-10T06:02",
            "2023-05-11T06:01",
            "2023-05-12T06:00",
            "2023-05-13T05:59",
            "2023-05-14T05:58",
            "2023-05-15T05:57",
            "2023-05-16T05:57",
            "2023-05-17T05:56",
            "2023-05-18T05:55",
            "2023-05-19T05:54",
            "2023-05-20T05:54"
        ],
        "sunset": [
            "2023-05-06T20:03",
            "2023-05-07T20:04",
            "2023-05-08T20:05",
            "2023-05-09T20:06",
            "2023-05-10T20:07",
            "2023-05-11T20:08",
            "2023-05-12T20:09",
            "2023-05-13T20:10",
            "2023-05-14T20:11",
            "2023-05-15T20:11",
            "2023-05-16T20:12",
            "2023-05-17T20:13",
            "2023-05-18T20:14",
            "2023-05-19T20:15",
            "2023-05-20T20:16"
        ]
    }
}