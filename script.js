const button = document.querySelector("input[type='submit']")
const cityInput = document.querySelector("#cityInput")

const displayDiv = document.querySelector("displayData")


button.addEventListener("click", (e) => {
    e.preventDefault()
    fetch("https://api.openweathermap.org/data/2.5/weather?q=new%20york&appid=75ca701220c90ca023b334a8eaafed66")
    .then(response => response.json())
    .then(data => console.log(data))

    .catch(err => alert("Wrong city name!"))

})
