import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import getLocation from '../utils/location';
import getWeather from '../api/weather';
import { WeatherData } from '@/types/weather';
import { WeatherChart } from '../components/WeatherChart';
import WeatherMetrics from './WeatherMetrics';

const HomeScreen = () => {
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

    if (error) {
        return (
            <View>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {weather ? (
                <ScrollView>
                    <View style={styles.weatherContainer}>
                        <Text style={styles.location}>{weather.locationName}</Text>
                        <TouchableOpacity 
                            onPress={fetchLocationAndWeather} 
                            disabled={isRefreshing}
                        >
                            <Animated.Image
                                style={[styles.refreshIcon, { transform: [{ rotate: spin }] }]}
                                source={ require('@/src/assets/images/refresh-icon.png') }
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
                        <WeatherMetrics weather={weather} />
                    </View>
                </ScrollView>
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

export default HomeScreen;