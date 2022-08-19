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
        .catch((err) => console.log(err)); //captura errores en la peticion
    }
  }, [lat, long]);

  console.log(weather);

  const handleClick = () => setIsCelsius(!isCelsius);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <article className="card-weather">
        <h1>Wheather App</h1>
        <p className="card-weather--description">{`${weather?.name}, ${weather?.sys.country}`}</p>
        <div className="card-weather__body">
          <img
            src={
              weather &&
              `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
            }
            alt=""
          />
          <div className="card-weather__body--right">
            <h1>{weather?.weather[0].description}</h1>
            <ul>
              <li>
                <span>Wind Speed:</span>
                {weather?.wind.speed}
              </li>
              <li>
                <span>Clouds:</span>
                {weather?.clouds.all}%
              </li>
              <li>
                <span>Pressure:</span>
                {weather?.main.pressure}hpa
              </li>
            </ul>
          </div>
        </div>
        <div className="divConverter">
          <h3>{isCelsius ? temp?.celsius : temp?.farenheit}Convrtir</h3>
        </div>
        <div className="divBoton">
          <button className="btn btn-card" onClick={handleClick}>
            {isCelsius ? "change to F" : "change to C"}
          </button>
        </div>
      </article>
    );
  }
}

export default CardWeather;
