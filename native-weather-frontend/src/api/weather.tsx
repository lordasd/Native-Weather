const getWeather = async (lat: number, lon: number) => {
    const backendUrl = `http://192.168.32.191:5000/api/weather?lat=${lat}&lon=${lon}`;

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