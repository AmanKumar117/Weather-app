import { useEffect } from "react";
import "./weather.css";
import React from 'react';

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

  // Define a mapping of weather types to background images
  const weatherBackgrounds = {
    Clear: "url('https://img.freepik.com/free-photo/cloud-blue-sky_1232-3108.jpg?size=626&ext=jpg')",
    Clouds: "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')",
    Rain: "url('https://img.freepik.com/free-vector/realistic-clouds-with-falling-rain_1017-33597.jpg?size=626&ext=jpg')",
    Haze: "url('https://img.freepik.com/premium-photo/amazon-misty_915478-2978.jpg?size=626&ext=jpg')",
    Mist: "url('https://img.freepik.com/premium-photo/fog-mist_915478-3165.jpg?size=626&ext=jpg')",
    Fog: "url('https://img.freepik.com/premium-photo/pattern-background_811396-10729.jpg?size=626&ext=jpg')",
    Snow: "url('https://img.freepik.com/free-photo/tree-covered-with-snow-winter-storm-day-forest-mountains_1232-4309.jpg?size=626&ext=jpg')",
    // Add more mappings for other weather types as needed
  };

  const getBackgroundImage = (weatherType) => {
    // Use the weather type to look up the background image
    return weatherBackgrounds[weatherType] || "url('/images/default.jpg')"; // Replace with a default image
  };
  
  const sunriseDatetime = weatherdata.sys?.sunrise ? new Date(weatherdata.sys.sunrise * 1000) : null;
  const sunsetDatetime = weatherdata.sys?.sunset ? new Date(weatherdata.sys.sunset * 1000) : null;

  // Check if weatherdata is available, if not, display default values
  if (!weatherdata.name) {
    return (
      <div className="weather-cont">
        <div className="cont-ainer">
          <div className="cont" style={{ backgroundImage: getBackgroundImage("Clear") }}>
            <div className="subcont1">
              <div className="sub-subcont1">
                <h2>Enter a City Name</h2>
              </div>
              <div className="sub-subcont2">
                <img
                  src="/images/default1.jpg"
                  alt="default-weather"
                />
              </div>
            </div>
            <div className="subcont2">
              <div className="weath">  {/*when landing on app this will appear*/}
                <p>
                  Temperature: <span>- -</span>
                </p>
                <p>
                  Weather Type: <span>- -</span>
                </p>
                <p>
                  Pressure: <span>- -</span> hPa
                </p>
                <p>
                  Humidity: <span>- -</span> %
                </p>
                <p>
                  Wind Speed: <span>- -</span> m/s
                </p>
                <p>
                  Visibility: <span>- -</span> Km
                </p>
                <p>
                  Sunrise: <span>- -</span> UTC
                </p>
                <p>
                  Sunset: <span>- -</span> UTC
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
        </div>
      </div>
    );
  }

  // Display weather data when available
  return (
    <div className="weather-cont">
      <div className="cont-ainer">
        <div className="cont" style={{ backgroundImage: getBackgroundImage(weatherdata.weather[0].main) }}>
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
                Visibility: <span>{weatherdata.visibility/1000}</span> Km
              </p>
              <p>
                Sunrise: <span>{sunriseDatetime ? sunriseDatetime.toISOString().substr(11, 8) : 'N/A'}</span> UTC
              </p>
              <p>
                Sunset: <span>{sunsetDatetime ? sunsetDatetime.toISOString().substr(11, 8) : 'N/A'}</span> UTC
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
      </div>
    </div>
  );
};

export default Weather;
