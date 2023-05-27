import { weatherAPI } from './openMateoClient'

export * as DATA from "./dataManipulation";


export async function getAllWeatherMetrics(options, zipCodeArr) {
    // const locArr = [];
    // for (const zipCode of zipCodeArr) {
    //     const locMetrics = await getLocationMetrics(options, zipCode);
    //     locArr.push(locMetrics);
    // }
    const locArr = sampleArray;
    return locArr;
}


export async function getLocationMetrics(options, zipCode) {
    const coordinates = await weatherAPI.getCoordinates(zipCode);
    const weather = await weatherAPI.getWeatherData(options, coordinates);
    const data = { "meta": coordinates, "weather": weather["daily"] };
    delete weather["daily"];
    data["meta"] = { ...coordinates, ...weather};

    for (const field of ["sunrise", "sunset"]) {
        data["weather"][field] = data["weather"][field].map(ts => extractHourFromTimestamp(ts));
    }
    data["weather"]["daylight"] = calcDaylight(data["weather"]["sunrise"],data["weather"]["sunset"])
    data["weather"]["snowfall_sum"] = data["weather"]["snowfall_sum"].map(x => 100 * x)
    
    if (options.imperialInd) {
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
    weatherObj["rain_sum"] = weatherObj["rain_sum"].map(x => convertMmToInches(x));
    weatherObj["snowfall_sum"] = weatherObj["snowfall_sum"].map(x => convertMmToInches(x));
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


export const createTempChartData = (locArr) => {
    let datasets = [];
    for (const loc of locArr) {
        datasets = datasets.concat([
            {
                label: "false",
                // backgroundColor: "#4787b5",
                showLine: false,
                pointStyle: false,
                data: loc["weather"]["temperature_2m_min"]
            },
            {
                label: loc["meta"]["name"],
                fill: '-1',
                showLine: false,
                pointStyle: false,
                data: loc["weather"]["temperature_2m_max"]
            }
        ])
    }
    return datasets;
}

export const createPrecipChartData = (locArr) => {
    let datasets = [];
    for (const loc of locArr) {
        datasets = datasets.concat([
            {
                label: `${loc["meta"]["name"]} rain`,
                data: loc["weather"]["rain_sum"],
                stack: loc["meta"]["name"]
            },
            {
                label: `${loc["meta"]["name"]} rain`,
                data: loc["weather"]["snowfall_sum"],
                stack: loc["meta"]["name"]
            }
        ])
    }
    return datasets;
}

export const createSunChartData = (locArr) => {
    let datasets = [];
    for (const loc of locArr) {
        datasets = datasets.concat([
            {
                label: `${loc["meta"]["name"]} sunrise`,
                data: loc["weather"]["sunrise"]
            },
            {
                label: `${loc["meta"]["name"]} sunset`,
                data: loc["weather"]["sunset"]
            }
        ])
    }
    return datasets;
}


export const createDaylightChartData = (locArr) => {
    let datasets = [];
    for (const loc of locArr) {
        datasets = datasets.concat([
            {
                label: `${loc["meta"]["name"]}`,
                data: loc["weather"]["daylight"]
            }
        ])
    }
    return datasets;
}

const sampleArray = [
    {
        "meta": {
            "id": 5380748,
            "name": "Palo Alto",
            "latitude": 37.4,
            "longitude": -122.1,
            "elevation": 11,
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
            "admin2": "Santa Clara",
            "generationtime_ms": 0.9530782699584961,
            "utc_offset_seconds": -25200,
            "timezone_abbreviation": "PDT",
            "daily_units": {
                "time": "iso8601",
                "temperature_2m_max": "°C",
                "temperature_2m_min": "°C",
                "precipitation_sum": "mm",
                "snowfall_sum": "cm",
                "rain_sum": "mm",
                "sunrise": "iso8601",
                "sunset": "iso8601"
            }
        },
        "weather": {
            "time": [
                "2023-05-01",
                "2023-05-02",
                "2023-05-03",
                "2023-05-04",
                "2023-05-05",
                "2023-05-06",
                "2023-05-07"
            ],
            "temperature_2m_max": [
                55.58,
                57.56,
                58.28,
                58.459999999999994,
                61.16,
                60.440000000000005,
                63.14
            ],
            "temperature_2m_min": [
                48.379999999999995,
                46.76,
                48.56,
                49.28,
                48.379999999999995,
                50.54,
                49.82
            ],
            "precipitation_sum": [
                0.1574804,
                0.31889780999999995,
                0.40157501999999995,
                0.03149608,
                0.023622059999999997,
                0.1181103,
                0
            ],
            "snowfall_sum": [
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "rain_sum": [
                0.1574804,
                0.31889780999999995,
                0.40157501999999995,
                0.03149608,
                0.023622059999999997,
                0.1181103,
                0
            ],
            "sunrise": [
                6.183333333333334,
                6.166666666666667,
                6.15,
                6.133333333333334,
                6.116666666666666,
                6.1,
                6.083333333333333
            ],
            "sunset": [
                19.983333333333334,
                20,
                20.016666666666666,
                20.033333333333335,
                20.05,
                20.05,
                20.066666666666666
            ],
            "daylight": [
                13.8,
                13.833333333333332,
                13.866666666666665,
                13.900000000000002,
                13.933333333333334,
                13.950000000000001,
                13.983333333333334
            ]
        }
    },
    {
        "meta": {
            "id": 5261457,
            "name": "Madison",
            "latitude": 43.100006,
            "longitude": -89.4,
            "elevation": 272,
            "feature_code": "PPLA",
            "country_code": "US",
            "admin1_id": 5279468,
            "admin2_id": 5250074,
            "admin3_id": 5261482,
            "timezone": "America/Chicago",
            "population": 248951,
            "postcodes": [
                "53701",
                "53702",
                "53703",
                "53704",
                "53705",
                "53706",
                "53707",
                "53708",
                "53711",
                "53713",
                "53714",
                "53715",
                "53716",
                "53717",
                "53718",
                "53719",
                "53725",
                "53726",
                "53744",
                "53777",
                "53778",
                "53779",
                "53782",
                "53783",
                "53784",
                "53785",
                "53786",
                "53788",
                "53789",
                "53790",
                "53791",
                "53792",
                "53793",
                "53794"
            ],
            "country_id": 6252001,
            "country": "United States",
            "admin1": "Wisconsin",
            "admin2": "Dane",
            "admin3": "City of Madison",
            "generationtime_ms": 2.194046974182129,
            "utc_offset_seconds": -18000,
            "timezone_abbreviation": "CDT",
            "daily_units": {
                "time": "iso8601",
                "temperature_2m_max": "°C",
                "temperature_2m_min": "°C",
                "precipitation_sum": "mm",
                "snowfall_sum": "cm",
                "rain_sum": "mm",
                "sunrise": "iso8601",
                "sunset": "iso8601"
            }
        },
        "weather": {
            "time": [
                "2023-05-01",
                "2023-05-02",
                "2023-05-03",
                "2023-05-04",
                "2023-05-05",
                "2023-05-06",
                "2023-05-07"
            ],
            "temperature_2m_max": [
                48.92,
                51.08,
                58.64,
                70.34,
                72.14,
                69.25999999999999,
                78.62
            ],
            "temperature_2m_min": [
                37.04,
                39.2,
                33.26,
                38.48,
                53.42,
                53.78,
                59.36
            ],
            "precipitation_sum": [
                0.09842524999999999,
                0,
                0,
                0,
                0.055118139999999996,
                0.9015752899999999,
                0.28346472
            ],
            "snowfall_sum": [
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "rain_sum": [
                0.09842524999999999,
                0,
                0,
                0,
                0.055118139999999996,
                0.9015752899999999,
                0.28346472
            ],
            "sunrise": [
                5.816666666666666,
                5.8,
                5.766666666666667,
                5.75,
                5.733333333333333,
                5.7,
                5.683333333333334
            ],
            "sunset": [
                19.983333333333334,
                20,
                20.033333333333335,
                20.05,
                20.066666666666666,
                20.083333333333332,
                20.1
            ],
            "daylight": [
                14.166666666666668,
                14.2,
                14.26666666666667,
                14.3,
                14.333333333333332,
                14.383333333333333,
                14.416666666666668
            ]
        }
    }
]