import { useEffect } from "react";
import "./weather.css";

const Weather = ({ weatherdata, temperatureUnit, setTemperatureUnit }) => {
  useEffect(() => {
    const savedUnit = localStorage.getItem("temperatureUnit");
    if (savedUnit) {
      setTemperatureUnit(savedUnit);
    }
  }, [setTemperatureUnit]);

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === "celsius" ? "fahrenheit" : "celsius";
    setTemperatureUnit(newUnit);
    localStorage.setItem("temperatureUnit", newUnit);
  };

  const getTemperatureInUnit = (temperature) => {
    if (temperatureUnit === "celsius") {
      return Math.floor(temperature - 273) + "°C";
    } else {
      const fahrenheit = (temperature - 273) * (9 / 5) + 32;
      return Math.floor(fahrenheit) + "°F";
    }
  };

  return (
    <div className="weather-cont">
      <div className="cont-ainer">
        {weatherdata.name !== undefined ? (
          <div className="cont">
            <div className="subcont1">
              <div className="sub-subcont1">
                <h2>{weatherdata.name}</h2>
              </div>
              <div className="sub-subcont2">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`}
                  alt="weather"
                />
              </div>
            </div>
            <div className="subcont2">
              <div className="weath">
                <p>
                  Temperature:{" "}
                  <span>{getTemperatureInUnit(weatherdata.main.temp)}</span>
                </p>
                <p>
                  Weather Type: <span>{weatherdata.weather[0].main}</span>
                </p>
                <p>
                  Pressure: <span>{weatherdata.main.pressure}</span> hPa
                </p>
                <p>
                  Humidity: <span>{weatherdata.main.humidity}</span> %
                </p>
                <p>
                  Wind Speed: <span>{weatherdata.wind.speed}</span> m/s
                </p>
                <p>
                  Visibility: <span>{weatherdata.visibility}</span> m
                </p>
                <p>
                  Sunrise: <span>{weatherdata.sys.sunrise}</span> UTC
                </p>
                <p>
                  Sunset: <span>{weatherdata.sys.sunset}</span> UTC
                </p>
              </div>
              <div className="button-container">
                <button className="switch-btn" onClick={toggleTemperatureUnit}>
                  {temperatureUnit === "celsius" ? "°C" : "°F"}
                </button>
                <div className="tooltip">Click to toggle between Celsius and Fahrenheit</div>
              </div>
            </div>
          </div>
        ) : (
          <h3>Please Enter City Name</h3>
        )}
      </div>
    </div>
  );
};

export default Weather;
