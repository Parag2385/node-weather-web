const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGFyYWdwYXdhciIsImEiOiJja3hhOXhkbTMweTRmMm9xY3phemJ5cjllIn0.ZG12IS-MWe5QakFyP3633g&limit=1`
    request({url, json: true }, (error, {body}) => {
        if(error) {
            console.log("Unable to connect to weather service.")
            callback(error, undefined)
        } else if (body.features.length === 0){
            console.log("Did not find the place you entered, please try with different search term")
            callback("Did not find the place you entered, please try with different search term", undefined)
        }
        else {
            const {center: location, place_name: name} = body.features[0]
            callback(undefined, {
                name,
                location
            })
        }
        
    })
}

module.exports = geocode