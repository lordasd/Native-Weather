// Determine the animation based on weather description
const getWeatherAnimation = (description: string) => {
    switch (description.toLowerCase()) {
        case 'clear sky':
            return require('@/src/assets/animations/sunny-animation.json');
        case 'few clouds':
        case 'scattered clouds':
            return require('@/src/assets/animations/partly-cloudy-animation.json');
        case 'broken clouds':
        case 'overcast clouds':
            return require('@/src/assets/animations/cloudy-animation.json');
        case 'shower rain':
            return require('@/src/assets/animations/storm-animation.json');
        case 'moderate rain':
            return require('@/src/assets/animations/storm-animation.json');
        case 'rain':
            return require('@/src/assets/animations/sunny-rain-animation.json');
        case 'thunderstorm':
            return require('@/src/assets/animations/storm-animation.json');
        case 'snow':
            return require('@/src/assets/animations/snow-animation.json');
        case 'night':
            return require('@/src/assets/animations/night-animation.json');
        default:
            return require('@/src/assets/animations/cloudy-night-animation.json');
    }
};

export default getWeatherAnimation;