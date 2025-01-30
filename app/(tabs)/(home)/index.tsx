// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import getLocation from '../../../components/location';
import getWeather from '../../../components/weather';
import { WeatherChart } from '../../../components/WeatherChart';

interface WeatherData {
    tempCelsius: number;
    tempFahrenheit: number;
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

export default function HomeScreen() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocationAndWeather = async () => {
            try {
                const locationData = await getLocation();
                
                if (!locationData) {
                    throw new Error('Unable to get location');
                }
                
                const weatherData = await getWeather(
                    locationData.latitude,
                    locationData.longitude
                );
                
                setWeather(weatherData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
        };
        
        fetchLocationAndWeather();
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {weather ? (
                <View style={styles.weatherContainer}>
                    <Text style={styles.location}>{weather.locationName}</Text>
                    
                    <View style={styles.mainTemp}>
                        <Image 
                            source={{ uri: `http://openweathermap.org/img/w/${weather.weather.icon}.png` }}
                            style={styles.weatherIcon}
                        />
                        <Text style={styles.temperature}>
                            {Math.round(weather.tempCelsius)}°C
                        </Text>
                        <Text style={styles.description}>
                            {weather.weather.description}
                        </Text>
                    </View>

                    <View style={styles.minMax}>
                        <Text>
                            H: {Math.round(weather.maxTemp)}°C  L: {Math.round(weather.minTemp)}°C
                        </Text>
                    </View>

                    <WeatherChart hourlyData={weather.hourlyForecast} />

                    <View style={styles.details}>
                        <View style={styles.detailRow}>
                            <Text>Humidity: {weather.humidity}%</Text>
                            <Text>Wind: {Math.round(weather.windSpeed)} m/s</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text>Sunrise: {formatTime(weather.sunrise)}</Text>
                            <Text>Sunset: {formatTime(weather.sunset)}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loading weather...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    weatherContainer: {
        flex: 1,
        alignItems: 'center',
    },
    location: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    mainTemp: {
        alignItems: 'center',
        marginVertical: 20,
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 18,
        color: '#666',
    },
    minMax: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    details: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    weatherIcon: {
        width: 50,
        height: 50,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});