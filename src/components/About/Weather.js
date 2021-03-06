import Carousel from "react-bootstrap/Carousel";
import "./Weather.scss";
import axios from "../../customize/axios";
import { useState, useEffect } from "react";
import moment from "moment";
const Weather = props => {
    const { cityState } = props;
    const [dataWeather, setDataWeather] = useState([]);

    const getWeatherByLocation = async locationId => {
        // 1236594 . woeid
        let res = await axios.post(
            `${process.env.REACT_APP_SERVICE_BACKEND}/get-data-by-url`,
            {
                url: `api/location/${locationId}`,
            }
        );
        if (res && res.title) {
            console.log("check weather res", res);
            setDataWeather(res.consolidated_weather);
        }
    };

    const allWeatherState = {
        Snow: "sn",
        Sleet: "sl",
        Hail: "h",
        Thunderstorm: "t",
        "Heavy Rain": "hr",
        "Light Rain": "lr",
        Showers: "s",
        "Heavy Cloud": "hc",
        "Light Cloud": "lc",
        Clear: "c",
    };

    const getImageUrl = Weather => {
        const fetchState = allWeatherState[Weather];
        return `${process.env.REACT_APP_SERVICE_BACKEND}/static/img/weather/${fetchState}.svg`;
    };

    useEffect(() => {
        getWeatherByLocation(cityState ? cityState : "1236594");
    }, [cityState]);

    return (
        <div className="weather-container">
            {dataWeather && dataWeather.length > 0 && (
                <Carousel variant="dark">
                    {dataWeather.map((item, index) => {
                        return (
                            <Carousel.Item key={`item-${index}`}>
                                <img
                                    className="d-block w-100"
                                    src={getImageUrl(item.weather_state_name)}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>
                                        {item.weather_state_name}-
                                        {moment(item.applicable_date).format(
                                            "dddd"
                                        )}
                                    </h3>
                                    <p>
                                        {item.max_temp}&#8451; -{" "}
                                        <span style={{ color: "#70757a" }}>
                                            {item.min_temp}&#8451;
                                        </span>
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            )}
        </div>
    );
};

export default Weather;
