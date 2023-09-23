const Forecast = ({ forecastData, temperatureUnit }) => {
  const getTemperatureInUnit = (temperature) => {
    if (temperatureUnit === "celsius") {
      return Math.floor(temperature - 273) + "°C";
    } else {
      const fahrenheit = (temperature - 273) * (9 / 5) + 32;
      return Math.floor(fahrenheit) + "°F";
    }
  };

  return (
    <div className="forecast">
      {forecastData &&
        forecastData.list &&
        forecastData.list.slice(0, 10).map((data, index) => {
          if (!data.dt) {
            return null;
          }
          return (
            <div className="fore-cast" key={index}>
              <p>
                Date:{" "}
                <span>
                  {new Date(
                    (data.dt + index * 86400) * 1000
                  ).toLocaleDateString()}
                </span>
              </p>
              <p>
                Temperature: <span>{getTemperatureInUnit(data.main.temp)}</span>
              </p>
              <p>
                Weather Type: <span>{data.weather[0].main}</span>
              </p>
              <p>
                Humidity: <span>{data.main.humidity}</span> %
              </p>
              <p>
                Wind Speed: <span>{data.wind.speed}</span> m/s
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather"
              />
            </div>
          );
        })}
    </div>
  );
};

export default Forecast;

