import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import formatTime from '../utils/dateFormat';
import { WeatherChartProps } from '@/src/types/weather';

const WeatherWeekly = ({ hourlyForecast }: WeatherChartProps) => {
    const daysOrder: string[] = [];
    const daysData: { [key: string]: { noon?: any; midnight?: any } } = {};

    // Group forecast data by day and time
    hourlyForecast.forEach(entry => {
        const dayName = entry.time.toLocaleDateString('en-US', { weekday: 'long' });
        if (!daysData[dayName]) {
            daysData[dayName] = {};
            daysOrder.push(dayName);
        }

        if (entry.hour === '12:00') {
            daysData[dayName].noon = entry;
        } else if (entry.hour === '00:00') {
            daysData[dayName].midnight = entry;
        }
    });

    return (
        <ScrollView style={styles.container}>
            {daysOrder.map(day => {
                const noonEntry = daysData[day].noon;
                const midnightEntry = daysData[day].midnight;

                return (
                    <View key={day}>
                        <View style={styles.dayRow}>
                            <Text style={styles.dayText}>{day}</Text>
                            <Text style={styles.humidityText}>{noonEntry?.icon || '--'}</Text>
                            <Text style={styles.humidityText}>{midnightEntry?.icon || '--'}</Text>
                            <Text style={styles.tempText}>
                                {noonEntry ? `${Math.round(noonEntry.temp)}°` : '--'}
                            </Text>
                            <Text style={styles.tempText}>
                                {midnightEntry ? `${Math.round(midnightEntry.temp)}°` : '--'}
                            </Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                );
            })}
        </ScrollView>
    );
};

// Styles remain the same as provided
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    dayText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    humidityText: {
        fontSize: 16,
        color: '#666',
        width: 80,
        textAlign: 'center',
    },
    tempText: {
        fontSize: 16,
        color: '#333',
        width: 100,
        textAlign: 'right',
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginLeft: 16,
    },
});

export default WeatherWeekly;