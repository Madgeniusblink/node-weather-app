const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Cristian Romero'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Cristian Romero',
        bio: 'Self thought Digital Marketing, Business, and full stack developer',
        rating: 100
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help?',
        msg: 'Need to hire a full Stack Web Developer? MadGeniusBlink@gmail.com',
        name: 'Cristian Romero'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a adress'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecast,
                location,
                address: req.query.address
            })
        })
    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article not found',
        name: 'Cristian Romero',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        name: 'Cristian Romero',
        title: '404'
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
