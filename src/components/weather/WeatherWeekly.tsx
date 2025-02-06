import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WeatherChartProps } from '@/src/types/weather';


interface DayWeather {
    day: string;
    iconMax: string;
    iconMin: string;
    tempMax: number;
    tempMin: number;
}

const WeatherWeekly = ({ hourlyForecast }: WeatherChartProps) => {
    // Get next 5 days starting from today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight
    const days = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        return date;
    });

    const weatherPerDay: DayWeather[] = days.map((day) => {
        // Filter hourly forecast for the specific day
        const dayForecast = hourlyForecast.filter(item => {
            const itemDate = new Date(item.timestamp);  // Parse timestamp
            return itemDate.getDate() === day.getDate() &&
                itemDate.getMonth() === day.getMonth() &&
                itemDate.getFullYear() === day.getFullYear();
        });

        // If no data for this day, return a fallback entry
        if (dayForecast.length === 0) {
            console.warn(`No forecast data for ${day.toLocaleDateString('en-US')}`);
            return {
                day: day.toLocaleDateString('en-US', { weekday: 'short' }),
                iconMax: '01d',  // Default icon
                iconMin: '01d',
                tempMax: 0,
                tempMin: 0
            };
        }

        // Find the minimum and maximum temperatures of the day
        const minTempEntry = dayForecast.reduce((min, item) => item.temp < min.temp ? item : min, dayForecast[0]);
        const maxTempEntry = dayForecast.reduce((max, item) => item.temp > max.temp ? item : max, dayForecast[0]);

        // Return weather data for the day
        return {
            day: day.toLocaleDateString('en-US', { weekday: 'short' }),
            iconMax: maxTempEntry.icon || '01d',  // Fallback if icon is missing
            iconMin: minTempEntry.icon || '01d',  // Fallback if icon is missing
            tempMax: Math.round(maxTempEntry.temp) || 0,     // Fallback if temp is missing
            tempMin: Math.round(minTempEntry.temp) || 0      // Fallback if temp is missing
        }; 
    });

    return (
        <View style={styles.container}>
            {weatherPerDay.map((dayData) => (
                <View key={dayData.day} style={styles.dayRow}>
                    <Text style={styles.dayText}>{dayData.day}</Text>
                    <View style={styles.iconContainer}>
                        <Image source={{ uri: `https://openweathermap.org/img/wn/${dayData.iconMin}.png` }} style={styles.icon} />
                        <Text style={styles.tempText}>{dayData.tempMin}°C</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Image source={{ uri: `https://openweathermap.org/img/wn/${dayData.iconMax}.png` }} style={styles.icon} />
                        <Text style={styles.tempText}>{dayData.tempMax}°C</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '80%',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 15,  // Round the corners of the main container
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,  // Adds shadow for Android
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,  // Round the corners of each day's row
        backgroundColor: '#f1f1f1', // Optional, background color for each day's row
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,  // Round the corners of the icon container
        padding: 8,
        backgroundColor: '#eaeaea',  // Light background color for icons
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 8,
    },
    tempText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default WeatherWeekly;
