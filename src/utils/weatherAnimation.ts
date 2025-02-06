// Determine the animation based on weather description
const getWeatherAnimation = (description: string) => {
    switch (description.toLowerCase()) {
        // Group 2xx: Thunderstorm
        case 'thunderstorm with light rain':
        case 'thunderstorm with rain':
        case 'thunderstorm with heavy rain':
        case 'light thunderstorm':
        case 'thunderstorm':
        case 'heavy thunderstorm':
        case 'ragged thunderstorm':
        case 'thunderstorm with light drizzle':
        case 'thunderstorm with drizzle':
        case 'thunderstorm with heavy drizzle':
            return require('@/src/assets/animations/storm-animation.json');

        // Group 3xx: Drizzle
        case 'light intensity drizzle':
        case 'drizzle':
        case 'heavy intensity drizzle':
        case 'light intensity drizzle rain':
        case 'drizzle rain':
        case 'heavy intensity drizzle rain':
        case 'shower rain and drizzle':
        case 'heavy shower rain and drizzle':
        case 'shower drizzle':
            return require('@/src/assets/animations/light-rain-day-animation.json');

        // Group 5xx: Rain
        case 'light rain':
            return require('@/src/assets/animations/light-rain-day-animation.json');
        case 'moderate rain':
        case 'heavy intensity rain':
        case 'very heavy rain':
        case 'extreme rain':
        case 'freezing rain':
        case 'light intensity shower rain':
        case 'shower rain':
        case 'heavy intensity shower rain':
        case 'ragged shower rain':
            return require('@/src/assets/animations/storm-animation.json');

        // Group 6xx: Snow
        case 'light snow':
        case 'snow':
        case 'heavy snow':
        case 'sleet':
        case 'light shower sleet':
        case 'shower sleet':
        case 'light rain and snow':
        case 'rain and snow':
        case 'light shower snow':
        case 'shower snow':
        case 'heavy shower snow':
            return require('@/src/assets/animations/snow-animation.json');

        // Group 7xx: Atmosphere
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'sand/dust whirls':
        case 'fog':
        case 'sand':
        case 'dust':
        case 'volcanic ash':
        case 'squalls':
        case 'tornado':
            return require('@/src/assets/animations/fog-animation.json');

        // Group 800: Clear
        case 'clear sky':
            return require('@/src/assets/animations/sunny-animation.json');

        // Group 80x: Clouds
        case 'few clouds': // 11-25%
        case 'scattered clouds': // 25-50%
            return require('@/src/assets/animations/partly-cloudy-animation.json');
        case 'broken clouds': // 51-84%
        case 'overcast clouds': // 85-100%
            return require('@/src/assets/animations/cloudy-animation.json');

        // Default case for any unspecified descriptions
        default:
            return require('@/src/assets/animations/sunny-animation.json');
    }
};

export default getWeatherAnimation;
