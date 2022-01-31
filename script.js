import Data from "./config.js";
const button = document.querySelector("input[type='submit']")
const cityInput = document.querySelector("#cityInput")

const displayDiv = document.querySelector(".displayData")
const cardcontainer = displayDiv.children[1]



const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: "",
        datasets: [{
            label: 'Temperature in °C',
            data: "",
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const fetchData = (lat, lon, lables, graphdata) => {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=metric&appid=" + Data.key)
    .then(response => response.json())
    .then(data => {
        const weekdata = data.daily;
        console.log(weekdata)

        for (let i = 0; i < weekdata.length; i++) {
            addCard(weekdata, i, lables, graphdata);
        }
        

        document.querySelector(".chart").style.display = "block"
        updateConfigByMutating(myChart, lables, graphdata);
        loadImgs()
    })
}

function updateConfigByMutating(chart, lables, graphdata) {
    chart.data.labels = lables;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = graphdata;
    });
    chart.update();
}

button.addEventListener("click", (e) => {
    e.preventDefault()
    cardcontainer.innerHTML = "";
    displayDiv.children[0].innerHTML = "";
    // variables for graphJS
    let lables = new Array();
    let graphdata = new Array();
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&units=metric&appid=" + Data.key)
        .then(response => response.json())
        .then(data => {
            // display the city name
            console.log(data)
            var nameValue = data['city']['name']
            const titleElement = displayDiv.children[0];
            titleElement.innerHTML = nameValue;

            // get the lat and lon of the location
            const lat = data["city"]["coord"].lat;
            const lon = data["city"]["coord"].lon;
            console.log(lat, lon)

            fetchData(lat, lon, lables, graphdata)
            
        })

        .catch(err => alert("Wrong city name!"))

})

function getNameDay(datee) {
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return names[datee.getDay()]
}

function getNameMonth(datee) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[datee.getMonth()]
}

function addCard(weekdata, i, lables, graphdata) {
    const newCard = document.createElement("div");
    newCard.className = "card";
    const dayHeader = document.createElement("div")
    dayHeader.className = "dateinfo"
    const cardTitle = document.createElement("p")
    cardTitle.className = "day"
    const dayInMonth = document.createElement("p")
    dayInMonth.className = "dayinmonth"
    const month = document.createElement("p")
    month.className = "month"

    const unixtime = weekdata[i].dt;
    const daydate = new Date(unixtime * 1000); // converts the unix time to miliseconds unix time so it can work with Date()

    // adding values to variables for GraphJS
    lables.push(getNameDay(daydate))
    graphdata.push(Math.round(weekdata[i].temp.day))

    cardTitle.innerText = getNameDay(daydate);
    dayInMonth.innerText = daydate.getDate();
    month.innerText = getNameMonth(daydate);
    dayHeader.append(cardTitle, dayInMonth, month);
    newCard.appendChild(dayHeader);
    
    // Rest of card information v
    const descpara = document.createElement("p")
    descpara.className = "description"
    const descimg = document.createElement("img");
    descimg.setAttribute("width", "100px");
    const iconid = weekdata[i].weather[0].icon;
    const iconurl = "http://openweathermap.org/img/wn/" + iconid + "@2x.png";
    const desc = weekdata[i].weather[0].description;
    descimg.setAttribute("src", iconurl);

    descpara.innerText = desc;
    newCard.append(descpara, descimg);

    const tempEl = document.createElement("p");
    tempEl.className = "temp";
    tempEl.innerText = Math.round(weekdata[i].temp.day) + "°C";
    newCard.appendChild(tempEl);

    cardcontainer.appendChild(newCard);
}

function loadImgs() {
    const imgcontainer = document.querySelector(".pictures")

    const key = "U-X2th9ZLuaaQOCfH-Ygn1F_WooQcKjcXUjzlWX5FoA"
    const url = "https://api.unsplash.com/search/photos?query=" + cityInput.value + "&client_id=" + key;

    fetch(url)

    .then (response => response.json())
    .then (data => {
        console.log(data.results);
        const imgList = data.results;

        for (let i = 0; i< imgList.length ; i++) {

        
        const img = document.createElement("img")
        img.className = "img"
        img.setAttribute("src", imgList[i].urls.regular)
        imgcontainer.appendChild(img)
        }
    })
}
