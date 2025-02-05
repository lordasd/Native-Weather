export interface WeatherResponse {
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        feels_like: number;
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

export interface WeatherData {
    tempCelsius: number;
    tempFahrenheit: number;
    feelsLike: number;
    minTemp: number;
    maxTemp: number;
    humidity: number;
    windSpeed: number;
    locationName: string;
    sunrise: Date;
    sunset: Date;
    weather: {
        icon: string;
        description: string;
    };
    hourlyForecast: Array<{
        time: Date;
        temp: number;
        icon: string;
        description: string;
    }>;
}