// src/api/weather.ts

import Constants from 'expo-constants';

const { API_BASE_URL } = Constants.expoConfig?.extra || {};

const getWeather = async (lat: number, lon: number) => {
    const backendUrl = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`;

    try {
        const response = await fetch(backendUrl);
        if (!response.ok) throw new Error(`Backend error: ${response.status}`);

        const weatherData = await response.json();

        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};


export default getWeather;