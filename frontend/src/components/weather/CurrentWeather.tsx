import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { WeatherData } from "@/src/types/weather";
import AnimatedRefreshIcon from '@/src/components/AnimatedRefreshIcon';


type Props = {
    weather: WeatherData;
    isRefreshing: boolean;
    fetchLocationAndWeather: () => void;
};

const CurrentWeather = ({ weather, isRefreshing, fetchLocationAndWeather }: Props) => {
    return (
        <>
            <Text style={styles.location}>{weather.locationName}</Text>
            <AnimatedRefreshIcon
                onPress={fetchLocationAndWeather}
                isSpinning={isRefreshing}
                source={require('@/src/assets/images/refresh-icon.png')}
                style={styles.refreshIcon}
            />
            <View style={styles.mainTemp}>
                <Image
                    source={{ uri: `https://openweathermap.org/img/w/${weather.weather.icon}.png` }}
                    style={styles.weatherIcon}
                />
                <Text style={styles.temperature}>
                    {Math.round(weather.tempCelsius)}°C
                </Text>
                <Text>
                    Feels like {Math.round(weather.feelsLike)}°C
                </Text>
                <Text style={styles.description}>
                    {weather.weather.description}
                </Text>
            </View>

            <View style={styles.minMax}>
                <Text>
                    {Math.round(weather.maxTemp)}°C/{Math.round(weather.minTemp)}°C
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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

export default CurrentWeather;