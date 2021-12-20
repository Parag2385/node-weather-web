const request = require('postman-request')

const forecast = ({location} = {}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c1627af7bf8a78c20ebfca96b2766154&query=${location[1], location[0]}`
    request({url, json: true }, (error, {body}) => {
        if(error) {
            console.log("Unable to connect to weather service.")
        } else if (body.error){
            console.log("Unable to find location.")
            callback(body)
        } else {
            const current = body.current
            console.log(`It is ${current.weather_descriptions[0]}. And currently ${current.temperature} degrees out. It feels like ${current.feelslike} out.`)
            callback(body)
        }
    })
}

module.exports = forecast