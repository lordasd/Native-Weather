import React from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';
import formatTime from '../utils/dateFormat';
import { WeatherChartProps } from "@/src/types/weather";


const WeatherChart = ({ hourlyForecast }: WeatherChartProps) => {
    return (
        <View style={styles.box}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
            >
                {hourlyForecast.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            styles.section,
                            index === hourlyForecast.length - 1 ? { borderRightWidth: 0 } : {}
                        ]}
                    >
                        <Text style={styles.timeText}>
                            {formatTime(item.time)}
                        </Text>
                        <Image
                            source={item.icon ? { uri: `http://openweathermap.org/img/w/${item.icon}.png` } : require('@/src/assets/images/favicon.png')}
                            style={styles.weatherIcon}
                        />
                        <Text style={styles.tempText}>
                            {Math.round(item.temp)}°C
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
        marginBottom: 10,
    },
    section: {
        width: 70, // Fixed width instead of percentage
        padding: 10,
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    timeText: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 4,
    },
    tempText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    weatherIcon: {
        width: 50,
        height: 50,
    },
});

export default WeatherChart;