const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   
});

app.post("/", function(req, res){
    const query = req.body.cityname;
    const apiKey = "8fe3e835aad6185f2ef211dce8405b8b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + ""

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const weatherDescription = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/" + icon+ "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + " </p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src= " + imageUrl + " >");
            res.send()
        }) 
    }) 
   
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
});