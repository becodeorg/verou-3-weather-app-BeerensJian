const button = document.querySelector("input[type='submit']")
const cityInput = document.querySelector("#cityInput")

const displayDiv = document.querySelector(".displayData")


button.addEventListener("click", (e) => {
    e.preventDefault()
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&units=metric&appid=75ca701220c90ca023b334a8eaafed66")
    .then(response => response.json())
    .then(data => {
        // display the city name
        console.log(data)
        var nameValue = data['city']['name']
        const titleElement = displayDiv.children[0];
        titleElement.innerHTML = nameValue;
        // display the city name

        // 
        const forecastlist = data['list']
        console.log(forecastlist[0])

        // Make card and display the weather of right now
        const todayCard = document.createElement("div");
        todayCard.className = "card";
        const nameOfDay = document.createElement("p");
        nameOfDay.className = "day";
        const description = document.createElement("p");
        description.className = "description";
        const temp = document.createElement("p");
        temp.className = "temp"

        // Get the date convert it into the day
        const daydate = forecastlist[0]["dt_txt"];
        
        nameOfDay.innerText = getDay(daydate);
        todayCard.appendChild(nameOfDay);

        // Append the new card to the body
        displayDiv.appendChild(todayCard);

    })

    .catch(err => alert("Wrong city name!"))

})


const date = "2022-01-24 21:00:00"
const getDay = (datestring) => {
    const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateonly = datestring.split(" ")
    const d = dateonly[0].split("-")
    const newDate = new Date(d[2],d[1] -1,[0]).getDay()
    return names[newDate];
}
getDay(date);