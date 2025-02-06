import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { WeatherData } from '@/src/types/weather';
import WeatherChart from '@/src/components/WeatherChart';
import WeatherMetrics from '@/src/components/WeatherMetrics';
import WeatherWeekly from "@/src/components/WeatherWeekly";
import LottieView from 'lottie-react-native';
import getWeatherAnimation from '@/src/utils/weatherAnimation';
import CurrentWeather from './CurrentWeather';
import getLocation from '../utils/location';
import getWeather from '../api/weather';

const HomeScreen = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const animation = useRef<LottieView>(null);

    const fetchLocationAndWeather = async () => {
        setError(null); // Reset errors
        setIsRefreshing(true); // Start loading

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
        }
    };

    useEffect(() => {
        void fetchLocationAndWeather();
        // Auto-play animation on mount
        animation.current?.play();
    }, []);

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {weather ? (
                <>
                    {/* Background Animation */}
                    <LottieView
                        autoPlay
                        loop
                        ref={animation}
                        style={styles.backgroundAnimation} // Ensures it's in the background
                        source={getWeatherAnimation(weather.weather.description)}
                    />
                    {/* Content Layer */}
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.weatherContainer}>
                            <CurrentWeather 
                                weather={weather} 
                                isRefreshing={isRefreshing} 
                                fetchLocationAndWeather={fetchLocationAndWeather} 
                            />
                            <WeatherChart hourlyForecast={weather.hourlyForecast} />
                            <WeatherMetrics weather={weather} />
                            <WeatherWeekly hourlyForecast={weather.hourlyForecast} />
                        </View>
                    </ScrollView>
                </>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loading weather...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundAnimation: {
        position: 'absolute',
        width: '100%',
        height: '50%',
        top: 0,
        left: 0,
        zIndex: 0, // Ensures animation stays behind the rest of the UI
    },
    weatherContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20, 
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
    scrollViewContainer: {
        flexGrow: 1, 
        paddingBottom: 20,
    },
});

export default HomeScreen;
