import React, { useEffect, useState } from "react";
import "./css/style.css";
const First = () => {
    const [city, setcity] = useState('Anand');
    const [weather, setweather] = useState('Anand')
    const [search, setsearch] = useState('Anand');
    const [time, setTime] = useState(new Date());
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=ec19cb7701a917d19d7e8f700f3429d7

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ec19cb7701a917d19d7e8f700f3429d7`;
            const response = await fetch(url);
            const resjson = await response.json();

            //console.log(resjson);

            setcity(resjson.main);
            // setcity2(resjson.weather);
            // console.log(resjson.weather);
            if (resjson.weather && resjson.weather.length > 0) {
                setweather(resjson.weather[0]);
            } else {
                setweather(null);
            }
        }

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // () => clearInterval(interval);
        fetchApi();
    }, [search]);
    const padWithZero = (num) => {
        return num < 10 ? "0" + num : num;
    };
    return (
        <>
            <div className="box">
                <div class="card">
                    <div class="search">
                        <input type="search" className="inputField" value={search} onChange={(event) => {
                            setsearch(event.target.value)
                        }} />
                    </div>


                    {!city ? (<p>No data found</p>) : (
                        <div>
                            <div className="info">
                                <div className="icon">
                                    {/* /* <i className="fa-regular fa-sun"></i>
                                    */ }

                                    {weather && weather.main && (
                                        <img src={`https://murphyslaw.github.io/hosted-assets/weather/${weather.main.toLowerCase()}.png`} alt="Weather Icon" />
                                    )}
                                    {/* <img src={`https://murphyslaw.github.io/hosted-assets/weather/${weather.main.toLowerCase()}.png`} alt="icon" /> */}

                                </div>
                                <h2 className="location">
                                    <br></br>
                                    <span>
                                        {search}
                                        <br />
                                    </span>
                                </h2>
                                <h1 className="temp">
                                    {city.temp} °C
                                </h1>
                                <h2 className="weatherData">

                                    Weather : {weather.main} | Humidity : {city.humidity}%


                                </h2>
                                <h1 className="tempmin_max">
                                    min: {city.temp_min} °C | max: {city.temp_max} °C
                                    <br />
                                    <br />
                                    {padWithZero(time.getDate())} / {padWithZero(time.getMonth() + 1)} / {time.getFullYear()}

                                </h1>
                            </div>
                        </div>

                    )}
                </div>
            </div >

        </>
    )
}

export default First;