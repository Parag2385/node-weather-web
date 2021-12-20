const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Parag"
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About me App",
        name: "Parag"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Parag",
        msg: "My name is parag and this is the message."
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return  res.send({
            error: "Please enter a place to check weather info"
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error){
            return  res.send({
                error
            })
        }
    
    
        forecast(data, (body) => {
            if(body.error) {
                return  res.send({
                    error: body.error
                })
            }
            return res.send({
                forecast: `It is ${body.current.weather_descriptions[0]}. And currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} out.`,
                location: data.name,
                address: req.query.address
            })
        })
        
    })

   
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("404",{
        title: "404",
        name: "Parag",
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render("404",{
        title: "404",
        name: "Parag",
        error: 'My 404 page'
    })
})

app.listen(3000, () => {
    console.log('Server is up on 3000')
})