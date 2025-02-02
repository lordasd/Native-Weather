import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import getLocation from '../../../components/location';
import getWeather from '../../../components/weather';
import { WeatherData } from '@/types/weather';
import { WeatherChart } from '../../../components/WeatherChart';

export default function HomeScreen() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const spinValue = useRef(new Animated.Value(0)).current;

    // Spin animation configuration
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const startSpin = () => {
        spinValue.setValue(0);
        Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        })
        ).start();
    };

    const stopSpin = () => {
        spinValue.stopAnimation();
    };

    const fetchLocationAndWeather = async () => {
        setError(null); // Reset errors
        setIsRefreshing(true); // Start loading
        startSpin();

        try {
            const locationData = await getLocation();
            
            if (!locationData)
                throw new Error('Unable to get location');
            
            const weatherData = await getWeather(
                locationData.latitude,
                locationData.longitude
            );
            
            setWeather(weatherData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsRefreshing(false); // Stop loading
            stopSpin();
        }
    };

    useEffect(() => {
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
                    <TouchableOpacity 
                        onPress={fetchLocationAndWeather} 
                        disabled={isRefreshing}
                    >
                        <Animated.Image
                            style={[styles.refreshIcon, { transform: [{ rotate: spin }] }]}
                            source={require('../../../assets/images/refresh-icon.png')} // Use your own icon
                        />
                    </TouchableOpacity>
                    <View style={styles.mainTemp}>
                        <Image 
                            source={{ uri: `http://openweathermap.org/img/w/${weather.weather.icon}.png` }}
                            style={styles.weatherIcon}
                        />
                        <Text style={styles.temperature}>
                            {Math.round(weather.tempCelsius)}°
                        </Text>
                        <Text>
                            Feels like {Math.round(weather.feelsLike)}°
                        </Text>
                        <Text style={styles.description}>
                            {weather.weather.description}
                        </Text>
                    </View>

                    <View style={styles.minMax}>
                        <Text>
                            {Math.round(weather.maxTemp)}°/{Math.round(weather.minTemp)}°C
                        </Text>
                    </View>

                    <WeatherChart hourlyData={weather.hourlyForecast} />

                    <View style={styles.box}>
                        <View style={styles.section}>
                            <Text style={styles.label}>Humidity</Text>
                            <Text style={styles.value}>{weather.humidity}%</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>Wind Speed</Text>
                            <Text style={styles.value}>{Math.round(weather.windSpeed)} km/h</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>Sunrise</Text>
                            <Text style={styles.value}>{formatTime(weather.sunrise)}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>Sunset</Text>
                            <Text style={styles.value}>{formatTime(weather.sunset)}</Text>
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
    box: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    section: {
        width: '50%', // 2 sections per row
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#555',
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    refreshIcon: {
        padding: 10,
        width: 24,
        height: 24,
    },
});