import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import formatTime from '../utils/dateFormat';
import { WeatherChartProps } from '@/src/types/weather';


const WeatherWeekly = ({ hourlyForecast }: WeatherChartProps) => {


    return (
        // List of: day, 12:00 icon, 00:00 icon, 12:00 temp, 00:00 temp
        <ScrollView style={styles.container}>

        </ScrollView>
    );
};

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