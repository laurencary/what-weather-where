import { weatherAPI } from './openMateoClient'

export * as DATA from "./dataManipulation";

export async function getWeatherMetrics(options) {
    // const coordinates = await weatherAPI.getCoordinates(options.zipCode);
    // const weather = await weatherAPI.getWeatherData(options, coordinates);
    // const data = { "meta": coordinates, "weather": weather["daily"] };
    // delete weather["daily"];
    // data["meta"] = { ...coordinates, ...weather};

    const data = {"weather": sampleResponse["daily"]};
    delete sampleResponse["daily"];
    data["meta"] = { ...coordinates, ...sampleResponse};

    for (const field of ["sunrise", "sunset"]) {
        data["weather"][field] = data["weather"][field].map(ts => extractHourFromTimestamp(ts));
    }

    data["weather"]["daylight"] = calcDaylight(data["weather"]["sunrise"],data["weather"]["sunset"])

    if (options.imperial) {
        data["weather"] = convertToImperial(data["weather"]);
    }

    return data;
}

const calcDaylight = (sunriseArr, sunsetArr) => {
    const daylightArr = [];
    for (let i = 0; i < sunriseArr.length; i++) {
        daylightArr.push(sunsetArr[i] - sunriseArr[i]);
    }
    return daylightArr;
}

const convertToImperial = (weatherObj) => {
    const toFrnArr = ["temperature_2m_max", "temperature_2m_min"]
    for (const field of toFrnArr) {
        weatherObj[field] = weatherObj[field].map(ts => convertCelsiusToFahrenheit(ts));
    }
    weatherObj["precipitation_sum"] = weatherObj["precipitation_sum"].map(x => convertMmToInches(x));
    return weatherObj;
}

const extractHourFromTimestamp = (ts) => {
    return Number(ts.slice(11, 13)) + Number(ts.slice(14, 16)) / 60
}

const convertCelsiusToFahrenheit = (temp) => {
    return temp * 9/5 + 32;
}

const convertMmToInches = (distance) => {
    return distance * 0.0393701;
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
            "2023-05-19"
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