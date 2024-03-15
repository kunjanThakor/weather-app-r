import React, { useEffect, useState } from "react";
import "./css/style.css";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons for sun and moon

const First = () => {
    const [city, setCity] = useState('Anand');
    const [weather, setWeather] = useState('Anand');
    const [search, setSearch] = useState('Anand');
    const [time, setTime] = useState(new Date());
    const [isActive, setIsActive] = useState(false);
    const [dark, setDark] = useState(false);

    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=ec19cb7701a917d19d7e8f700f3429d7

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ec19cb7701a917d19d7e8f700f3429d7`;
            const response = await fetch(url);
            const resjson = await response.json();

            setCity(resjson.main);
            if (resjson.weather && resjson.weather.length > 0) {
                setWeather(resjson.weather[0]);
            } else {
                setWeather(null);
            }
        }

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        fetchApi();

        return () => clearInterval(interval);
    }, [search]);

    const padWithZero = (num) => {
        return num < 10 ? "0" + num : num;
    };

    function toggle() {
        setIsActive(!isActive);
        setDark(!dark);
    }

    return (
        <>
            <motion.div className="box"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 0.5 }
                }}
            >

                <div className={`card ${dark ? 'dark' : ''}`}>
                    <div className={`toggle ${isActive ? 'active' : ''}`} onClick={toggle}>
                        <FontAwesomeIcon icon={dark ? faMoon : faSun} className="toggle-icon" />
                    </div>
                    <div className="search">
                        <input type="search" className="inputField" value={search} onChange={(event) => {
                            setSearch(event.target.value)
                        }} />
                    </div>

                    {!city ? (<p>No data found</p>) : (
                        <div className="info">
                            <div className="icon">
                                {weather && weather.main && (
                                    <img src={`https://murphyslaw.github.io/hosted-assets/weather/${weather.main.toLowerCase()}.png`} alt="Weather Icon" />
                                )}
                            </div>
                            <h2 className="location">
                                <span>{search}</span>
                            </h2>
                            <h1 className="temp">{city.temp} °C</h1>
                            <h2 className="weatherData">
                                Weather: {weather.main} | Humidity: {city.humidity}%
                            </h2>
                            <h1 className="tempmin_max">
                                Min: {city.temp_min} °C | Max: {city.temp_max} °C
                                <br />
                                {padWithZero(time.getDate())} / {padWithZero(time.getMonth() + 1)} / {time.getFullYear()}
                                <p className="made-by">Made By Kunjan Thakor</p>
                            </h1>
                        </div>
                    )}
                </div>
            </motion.div >
        </>
    )
}

export default First;
