import { useEffect } from "react";
import { WeatherApi } from "../api/weather/weather";

const Card = () => {
  const weather = new WeatherApi();

  const fetchApi = async () => {
    const response = await weather.fetchWeatherData("/users", {
      page: 1,
      size: 20,
    });
    console.log(response, "response");
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return <div>Card</div>;
};

export default Card;
