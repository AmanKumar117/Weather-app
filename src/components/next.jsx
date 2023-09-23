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
    <div className="weather-cont">
      <h2>Coming Week</h2>
      <div className="forecast-cont">
      <div className="forecast">
        {forecastData &&
          forecastData.list &&
          forecastData.list.slice(0, 8).map((data, index) => {
            if (!data.dt) {
              return null;
            }
            const date = new Date((data.dt + index * 86400) * 1000);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString(undefined, options);

            return (
              <div className="fore-cast" key={index}>
                <p>
                  <span>{formattedDate}</span>
                </p>
                <p>
                  <span>{getTemperatureInUnit(data.main.temp)}</span>
                </p>
                <p>
                  <span>{data.weather[0].main}</span>
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="weather"
                />
              </div>
            );
          })}
      </div>
      </div>
    </div>
  );
};

export default Forecast;
