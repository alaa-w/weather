const apiKey = "d8d0b11c53a04d61b33144534252404";
const baseUrl = "http://api.weatherapi.com/v1";
const forecastContainer = document.getElementById("forecast");
const input = document.querySelector(".search-bar input");
const button = document.querySelector(".search-bar button");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function fetchWeather(query) {
  try {
    const response = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${query}&days=3`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    displayForecast(data);
  } catch (err) {
    forecastContainer.innerHTML = `<div class="text-white text-center w-100">Error: ${err.message}</div>`;
  } 
}

function displayForecast(data) {
  const location = data.location;
  const current = data.current;
  const forecast = data.forecast.forecastday;

  forecastContainer.innerHTML = "";

  const todayDate = new Date(current.last_updated.replace(" ", "T"));
  forecastContainer.innerHTML += `
    <div class="">
      <div class="forecast d-flex overflow-hidden flex-column align-items-center text-center text-white" style="background-color: #1e202b; border-bottom-left-radius: 25px; border-top-left-radius: 25px;">
        <div class="forecast-header p-2 w-100 text-center" style="background-color: #42444e; border-top-left-radius: 25px;">
  ${days[todayDate.getDay()]} ${todayDate.getDate()} ${months[todayDate.getMonth()]}
</div>
        <div class="forecast-content p-5">
          <div class="location">${location.name}</div>
          <div class="degree">
            <div class="num">${current.temp_c}<sup>o</sup>C</div>
            <div class="forecast-icon">
              <img src="https:${current.condition.icon}" width="90" />
            </div>
          </div>
          <div class="custom d-flex">${current.condition.text}</div>
          <span class="smallicon"><img src="images/icon-umberella@2x.png" alt="Rain" />20%</span>
          <span class="smallicon"><img src="images/icon-wind@2x.png" alt="Wind" />${current.wind_kph}km/h</span>
          <span class="smallicon"><img src="images/icon-compass@2x.png" alt="Direction" />${current.wind_dir}</span>
        </div>
      </div>
    </div>`;

  for (let i = 1; i <= 2; i++) {
    const dayData = forecast[i];
    const date = new Date(dayData.date);
    forecastContainer.innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="forecast d-flex flex-column align-items-center text-center text-white" style="background-color: ${i === 1 ? '#212436' : '#1e202b'}; ${i === 2 ? 'border-bottom-right-radius: 25px; border-top-right-radius: 25px;' : ''}">
          <div class="forecast-header  p-2  w-100" style="background-color: #2c2d36; ${i === 2 ? 'border-top-right-radius: 25px;' : ''}">
            ${days[date.getDay()]}
          </div>
          <div class="forecast-content">
            <div class="forecast-icon">
              <img src="https:${dayData.day.condition.icon}" width="48" />
            </div>
            <div class="degree">${dayData.day.avgtemp_c}<sup>o</sup>C</div>
            <div class="custom">${dayData.day.condition.text}</div>
          </div>
        </div>
      </div>`;
  }
}

input.addEventListener("keyup", e => {
  if (e.key === "Enter") fetchWeather(input.value.trim());
});

button.addEventListener("click", () => {
  fetchWeather(input.value.trim());
});

fetchWeather("Cairo");