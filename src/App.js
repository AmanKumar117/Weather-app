import { useState } from "react";
import Forecast from "./components/next";
import Search from "./components/search";
import Weather from "./components/weather";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState({});
  const [temperatureUnit, setTemperatureUnit] = useState("celsius"); // Add temperatureUnit state

  const searchCity = () => {
    if (search !== "") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4446285a81cc82feaf2982a9afacbd05`)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => {
          alert(err);
        });

      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=4446285a81cc82feaf2982a9afacbd05`)
        .then((res) => res.json())
        .then((data) => {
          setForecast(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="main-container">
      <div>
        <Search setSearch={setSearch} searchCity={searchCity} search={search} />
      </div>
      <div>
        <div className="data">
          <Weather weatherdata={weather} temperatureUnit={temperatureUnit} setTemperatureUnit={setTemperatureUnit} />
        </div>
        <div>
          <h2 className="head2">Forecast</h2>
        </div>
        <div>
          <Forecast forecastData={forecast} temperatureUnit={temperatureUnit} /> {/* Pass temperatureUnit to Forecast */}
        </div>
      </div>
    </div>
  );
}

export default App;
