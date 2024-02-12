import React, { useEffect, useState } from "react";
import "./css/style.css";
const First = () => {
    const [city, setcity] = useState('Anand');
    const [weather, setweather] = useState('Anand')
    const [search, setsearch] = useState('Anand');
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
            setweather(resjson.weather[0]);
        }

        fetchApi();
    }, [search]);
    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input type="search" className="inputField" value={search} onChange={(event) => {
                        setsearch(event.target.value)
                    }} />
                </div>


                {!city ? (<p>No data found</p>) : (
                    <div>
                        <div className="info">
                            <i className="fa-regular fa-sun"></i>

                            <h2 className="location">
                                <br></br>
                                <span>
                                    {search}
                                    <br />
                                    {weather.main}
                                </span>

                            </h2>
                            <h1 className="temp">
                                {city.temp} °C
                            </h1>
                            <h1 className="tempmin_max">
                                min: {city.temp_min} °C | max: {city.temp_max} °C
                            </h1>
                        </div>
                    </div>
                )}

            </div>

        </>
    )
}

export default First;