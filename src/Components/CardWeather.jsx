import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

function CardWeather({ lat, long }) {
  //estado para guardar info
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true)
  //peticion en el useefect
  useEffect(() => {
    if (lat && long) {
      const APIKey = `8085e3d6186630918661f9832655daa6`;
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const temp = {
            farenheit: `${res.data.main.temp - 273.15} ºF`,
            celsius: `${((res.data.main.temp - 273.15) * 9) / 5 + 32} ªC`,
          };
          setTemp(temp);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [lat, long]);

  console.log(weather);

  const handleClick = () => setIsCelsius(!isCelsius);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <article>
        <h1>Wheather App</h1>
        <h2>{`${weather?.name}, ${weather?.sys.country} }`}</h2>
        <div>
          <img
            src={
              weather &&
              `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
            }
            alt=""
          />
          <div>
            <h3>{weather?.weather[0].description}</h3>
            <ul>
              <li>
                <span>Wind Speed</span>
                {weather?.wind.speed}
              </li>
              <li>
                <span>Clouds</span>
                {weather?.clouds.all}%
              </li>
              <li>
                <span>Pressure</span>
                {weather?.main.pressure}hpa
              </li>
            </ul>
          </div>
        </div>
        <h2>{isCelsius ? temp?.celsius : temp?.farenheit}Convrtir</h2>
        <button onClick={handleClick}>
          {isCelsius ? "change to F" : "change to C"}
        </button>
      </article>
    );
  }
}

export default CardWeather;
