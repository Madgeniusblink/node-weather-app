const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/c2371e2107a17b336b649e810871dc74/${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const today = body.daily.data[0]
            const y = body.currently
            callback(undefined, `${today.summary} It is currently ${y.temperature} degress out. There is a ${y.precipProbability} chance of rain. Todays high temperature is ${today.temperatureHigh} and low of ${today.temperatureLow}`)
        }
    })
}

module.exports = forecast