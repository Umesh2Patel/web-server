const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1beaf03a5e6a4fe7e54fa2931cae0497&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!')
        }else if (body.error){
            callback('Unable to find location!')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' +
            body.current.temperature + ' degrees out. It feels like '+ body.current.feelslike + ' degrees. There is a ' + body.current.precip + '% chance of rain. Humidity is ' + body.current.humidity)
        }
    })
}

module.exports = forecast