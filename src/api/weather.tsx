import { API_KEY } from "../constants/keys";
import { WeatherResponse } from "@/src/types/weather";

export default async function getWeather(lat: number, lon: number) {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok || !forecastRes.ok)
            throw new Error(`Weather API error: ${currentRes.status || forecastRes.status}`);
        
        const currentData: WeatherResponse = await currentRes.json();
        const forecastData = await forecastRes.json();
        
        const tempCelsius = currentData.main?.temp;
        const tempFahrenheit = tempCelsius * 9/5 + 32;

        return { 
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
            hourlyForecast: forecastData.list.slice(0, 8).map((item: any) => ({
                time: new Date(item.dt * 1000),
                temp: item.main.temp,
                icon: item.weather[0].icon,
                description: item.weather[0].description
            }))
        };
    } catch (err) {
        console.error('Weather fetch error:', err);
        throw err;
    }
}