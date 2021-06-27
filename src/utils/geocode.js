const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidW1lc2hwYXRlbCIsImEiOiJja3E3ZnFvemYwNW11Mm9uNHpyYXp6MmF4In0.z5C-mSh2Z3rMvzFMdU4pLg'

    request({url: url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message || body.features.length === 0){
            callback('Unable to find location! Try another search !', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode