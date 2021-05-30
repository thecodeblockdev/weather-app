const express = require('express')
const https = require('https')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) =>{
    res.render('weather')
})
app.post('/', (req, res)=>{
    const query = req.body.location
    const appId = "68e3907402f1657ecd74abc4a220de89"
    const units = "metric"
    
    const urlPath = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units="+ units +"&appid="+appId

    https.get(urlPath, (response)=>{
        
    response.on('data', (data)=>{
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        const image = "<img src="+ imageURL +">"

        res.render('data', { query, temperature, weatherDescription, imageURL})

        // res.send(`The temp in ${query} is ${temperature} weather description is ${weatherDescription} image is ${image}`)
        // console.log(weatherData)
    })
    })
})
app.get('/calc', (req, res) =>{
    res.render('calc')
})

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})

