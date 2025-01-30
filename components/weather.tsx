import { API_KEY } from "../constants/keys";

interface WeatherResponse {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  name: string;
  sys: {
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

export default async function getWeather(lat: number, lon: number) {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error(`Weather API error: ${currentRes.status || forecastRes.status}`);
        }
        
        const currentData: WeatherResponse = await currentRes.json();
        const forecastData = await forecastRes.json();
        
        const tempKelvin = currentData.main?.temp;
        const tempMinK = currentData.main?.temp_min;
        const tempMaxK = currentData.main?.temp_max;
        
        if (typeof tempKelvin !== 'number') {
            throw new Error('Invalid temperature data received');
        }
        
        const tempCelsius = tempKelvin - 273.15;
        const tempFahrenheit = tempCelsius * 9/5 + 32;
        const minTempC = tempMinK - 273.15;
        const maxTempC = tempMaxK - 273.15;

        return { 
            tempCelsius,
            tempFahrenheit,
            minTemp: minTempC,
            maxTemp: maxTempC,
            humidity: currentData.main.humidity,
            windSpeed: currentData.wind.speed,
            locationName: currentData.name,
            sunrise: new Date(currentData.sys.sunrise * 1000),
            sunset: new Date(currentData.sys.sunset * 1000),
            weather: currentData.weather[0],
            hourlyForecast: forecastData.list.slice(0, 8).map((item: any) => ({
                time: new Date(item.dt * 1000),
                temp: item.main.temp - 273.15,
                icon: item.weather[0].icon,
                description: item.weather[0].description
            }))
        };
    } catch (err) {
        console.error('Weather fetch error:', err);
        throw err;
    }
}