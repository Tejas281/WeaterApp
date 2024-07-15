import { useState } from "react";
import Search from "./Search";
import axios from "axios";
import weatherImageListing from "../utils/WeatherImageListing";
import toast from "react-hot-toast";
import Loader from "../utils/Loader";
const Home = () => {
  const WeatherImages = weatherImageListing;
  const weatherApiKey = process.env.REACT_APP_API_KEY;
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterDataWeather, setFilterDataWeather] = useState([]);
  const handleSubmit = async () => {
    setLoader(true);

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${
          weatherApiKey || "3bd34a7ced09706b5a2dea0ea8a15058"
        }`
      )
      .then((res) => {
        setWeatherData(res.data.list[0]);
        setFilterDataWeather(res.data.list);
        setLoader(false);
      })
      .catch((error) => {
        toast.error("invalid city names");
      });
  };
  const weaterTimeChange = (e) => {
    setLoader(true);

    const filterTime = e.target.value;
    const foundValue = filterDataWeather.find((item) => {
      return item.dt_txt === filterTime;
    });
    setWeatherData(foundValue);
    setLoader(false);
  };
  return (
    <div>
      <Search
        cityName={cityName}
        setCityName={setCityName}
        handleSubmit={handleSubmit}
      />
      {filterDataWeather.length !== 0 && (
        <>
          <label for="Time Or Data">Please Select Time or Date</label>
          <select
            id="Time Or Data"
            className="search"
            onChange={weaterTimeChange}
          >
            {filterDataWeather.map((item) => (
              <option value={item.dt_txt}>{item.dt_txt}</option>
            ))}
          </select>
        </>
      )}
      {loader === true ? <Loader /> : ""}

      {weatherData?.length !== 0 ? (
        <div className="weather">
          {weatherData.weather.length !== 0 &&
            WeatherImages?.map((item) =>
              weatherData?.weather[0]?.main === item?.name ? (
                <img
                  className="weather-icon"
                  src={item?.path}
                  alt={item?.name}
                />
              ) : (
                ""
              )
            )}
          <h1 className="temp">{weatherData.main.temp}°C </h1>
          <h2 className="city">{weatherData.name}</h2>
          <div className="details">
            <div style={{ display: "flex" }} className="col-3">
              <img
                className="humi"
                src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png"
                alt="images"
              />
              <div className="info">
                <p className="humidity">{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img
                src="https://cdn-icons-png.flaticon.com/512/136/136712.png"
                alt="sss"
              />
              <div className="info">
                <p className="wind">{weatherData.wind.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Home;
