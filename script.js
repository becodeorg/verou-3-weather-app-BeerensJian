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

        // variable with the weather of right now
        const forecastlist = data['list']
        console.log(forecastlist[0])

        // Make card and display the weather of right now
        const todayCard = document.createElement("div");
        todayCard.className = "card";
        const nameOfDay = document.createElement("p");
        nameOfDay.className = "day";
        const weatherImage = document.createElement("img");
        const description = document.createElement("p");
        description.className = "description";
        const temp = document.createElement("p");
        temp.className = "temp"

        // Get the date convert it into the day
        const daydate = forecastlist[0]["dt_txt"];
        nameOfDay.innerText = getDayName(daydate);
        todayCard.appendChild(nameOfDay); // Add it to the created card

        // Get the description of the weather and add it to our p element called description
        description.innerText = forecastlist[0]["weather"][0].description;
        todayCard.appendChild(description)
        // add image
        const weatherIcon = forecastlist[0]["weather"][0].icon;
        weatherImage.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png" )
        todayCard.appendChild(weatherImage)

        // Get the temperature and add it to the p element temp and add it to our card
        temp.innerText = "Current Temperature : " + forecastlist[0]["main"]["temp"] + "°C"
        todayCard.appendChild(temp)










        // Append the new card to the body
        cardcontainer.appendChild(todayCard);

    })

    .catch(err => alert("Wrong city name!"))

})

// Function to get the name of the day
const getDayName = (datestring) => {
    const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateonly = datestring.split(" ")
    const d = dateonly[0].split("-")
    const newDate = new Date(d[0],d[1] -1, d[2]).getDay()
    return names[newDate];
} // Function to get the name of the day

