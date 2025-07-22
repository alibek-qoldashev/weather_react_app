import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import Search from "../assets/search.png";
import Clear from "../assets/Clear.webp";
import Cloud from "../assets/Cloud.png";
import Drizzle from "../assets/Drizzle.png";
import Humidity from "../assets/Humidity.png";
import Rain from "../assets/Rain.png";
import Snow from "../assets/Snow.png";
import Wind from "../assets/Wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": Clear,
    "01n": Clear,
    "02d": Cloud,
    "02n": Cloud,
    "03d": Cloud,
    "03n": Cloud,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Rain,
    "09n": Rain,
    "10d": Rain,
    "10n": Rain,
    "13d": Snow,
    "13n": Snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Shahar nomini kiriting");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      if (!data || !data.weather || !data.weather[0]) return;

      const icon = allIcons[data.weather[0].icon] || Clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="search.." />
        <img
          onClick={() => search(inputRef.current.value)}
          src={Search}
          alt=""
        />
      </div>
      {weatherData ? (
        <>
          {" "}
          <img className="weather-icon" src={weatherData.icon} alt="" />
          <p className="temperature">{weatherData.temperature}ºc</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={Humidity} alt="" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={Wind} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {weatherData && <></>}
    </div>
  );
};

export default Weather;
