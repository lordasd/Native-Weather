import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import formatTime from '../utils/dateFormat';
import { WeatherChartProps } from "@/src/types/weather";


export const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyData }) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={true}
                >
                    {hourlyData.map((item, index) => (
                        <View 
                            key={index} 
                            style={[
                                styles.section,
                                index === hourlyData.length - 1 ? { borderRightWidth: 0 } : {}
                            ]}
                        >
                            <Text style={styles.timeText}>
                                {formatTime(item.time)}
                            </Text>
                            <Text style={styles.tempText}>
                                {Math.round(item.temp)}°C
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
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
});