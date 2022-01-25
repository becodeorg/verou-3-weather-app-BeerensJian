const button = document.querySelector("input[type='submit']")
const cityInput = document.querySelector("#cityInput")

const displayDiv = document.querySelector(".displayData")
const cardcontainer = displayDiv.children[1]

import Data from "./config.js";
  
button.addEventListener("click", (e) => {
    e.preventDefault()
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&units=metric&appid=" + Data.key)
    .then(response => response.json())
    .then(data => {
        // display the city name
        console.log(data)
        var nameValue = data['city']['name']
        const titleElement = displayDiv.children[0];
        titleElement.innerHTML = nameValue;
        // display the city name

        // get the lat and lon of the location
        const lat = data["city"]["coord"].lat;
        const lon = data["city"]["coord"].lon;
        console.log(lat, lon)

        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=metric&appid=" + Data.key)
        .then(response => response.json())
        .then(data => {
            const weekdata = data.daily;
            console.log(weekdata)
            /*
                For each day generate a card with elements gethered from the OpenWeather API.
                daydate.getDate() -> get the day of the month
                daydate.getDay() -> returns a value 0-6 corresponding to day in the week
                TODO: Append name of the weekday, number of day in the month, and month in dateinfo
            */
            for (let i = 0; i < weekdata.length ; i++) {
                const newCard = document.createElement("div");         
                newCard.className = "card";
                const dayHeader = document.createElement("div")
                dayHeader.className = "dateinfo"
                const cardTitle = document.createElement("p")
                cardTitle.className = "day"
                
                const unixtime = weekdata[i].dt;
                const daydate = new Date(unixtime * 1000); // converts the unix time to miliseconds unix time so it can work with Date()
                





            }
        })
    })

    .catch(err => alert("Wrong city name!"))

})

function getNameDay(dayNumber) {
    names = ["Sunday", "Monday", "Thuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return names[dayNumber.getDay()]
}