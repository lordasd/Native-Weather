const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const API_KEY = '31263794da519c295fe1f46195fe0bc6';
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        // Fetch both API responses in parallel
        const [currentRes, forecastRes] = await Promise.all([
            axios.get(currentUrl),
            axios.get(forecastUrl),
        ]);

        // Extract data
        const currentData = currentRes.data;
        const forecastData = forecastRes.data;

        const tempCelsius = currentData.main?.temp;
        const tempFahrenheit = tempCelsius * 9/5 + 32;

        // Send the response in the same format as your frontend expects
        res.json({
            tempCelsius,
            tempFahrenheit,
            feelsLike: currentData.main.feels_like,
            minTemp: currentData.main.temp_min,
            maxTemp: currentData.main.temp_max,
            humidity: currentData.main.humidity,
            windSpeed: currentData.wind.speed,
            locationName: currentData.name,
            sunrise: new Date(currentData.sys.sunrise * 1000),
            sunset: new Date(currentData.sys.sunset * 1000),
            weather: currentData.weather[0],
            hourlyForecast: forecastData.list.map((item) => ({
                time: new Date(item.dt * 1000),
                temp: item.main.temp,
                icon: item.weather[0].icon,
                description: item.weather[0].description,
                timestamp: item.dt_txt,
            })),
        });
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

module.exports = router;